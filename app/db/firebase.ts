import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

import { Survey } from '~/types/questionnaire'
import { UserEvent } from '~/types/userEvent';
import firebaseConfig from 'firebaseConfig';
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveEvent = async (event: UserEvent) => {
  const randomId = uuidv4()
  const docRef = doc(db, 'story_branching', event.userId, 'events', randomId)
  await setDoc(docRef, { id: randomId, ...event })
}

export type Statistics = {
  baseline: {
    count: number;
    storyIds: { id: string; count: number }[];
  };
  proposed: {
    count: number;
    storyIds: { id: string; count: number }[];
  };
};

export const getStatistics: () => Promise<Statistics> = async () => {
  const docRef = doc(db, 'story_branching', 'statistics')
  const result = await getDoc(docRef)

  if (result.exists()) {
    const data = result.data()
    return {
      'baseline': {
        'count': Number(data.baseline.count),
        'storyIds': data.baseline.storyIds.map((story: { id: string, count: number }) => ({
          'id': story.id,
          'count': story.count
        }))
      },
      'proposed': {
        'count': Number(data.proposed.count),
        'storyIds': data.proposed.storyIds.map((story: { id: string, count: number }) => ({
          'id': story.id,
          'count': story.count
        }))
      }
    }
  } else {
    return {
      'baseline': {
        'count': 0,
        'storyIds': []
      },
      'proposed': {
        'count': 0,
        'storyIds': []
      }
    }
  }
}

export const updateStatistics = async (storyId: string, approach: "baseline" | "proposed") => {
  const docRef = doc(db, 'story_branching', 'statistics')
  const result = await getDoc(docRef)

  if (result.exists()) {
    const data = result.data() as Statistics
    data[approach]['count'] += 1
    const existingStoryId = data[approach]['storyIds'].find((story) => story.id === storyId)
    if (existingStoryId) {
      existingStoryId.count += 1
    } else {
      data[approach]['storyIds'].push({
        'id': storyId,
        'count': 1
      })
    }
    await setDoc(docRef, data)
  } else {
    await setDoc(docRef, {
      [approach === 'baseline' ? 'proposed' : 'baseline']: {
        'count': 0,
        'storyIds': []
      },
      [approach]: {
        'count': 1,
        'storyIds': [{
          'id': storyId,
          'count': 1
        }]
      }
    } as Statistics)
  }
}

export const saveQuestionnaire = async (userId: string, stage: keyof Survey, questionnaire: Record<string, string>) => {
  if (!userId) {
    throw new Error('userId is required')
  }

  const docRef = doc(db, 'story_branching', userId, 'questionnaires', stage)

  await setDoc(docRef, questionnaire)
}