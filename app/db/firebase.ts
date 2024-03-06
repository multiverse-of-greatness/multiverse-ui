import { doc, getFirestore, setDoc } from 'firebase/firestore'

import { Survey } from '~/types/questionnaire'
import { UserEvent } from '~/types/userEvent';
import firebaseConfig from 'firebaseConfig';
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveEvent = async (event: UserEvent) => {
  const randomId = uuidv4()
  await setDoc(doc(db, 'story_branching', event.userId, 'events', randomId), { id: randomId, ...event })
}

// export const updateStatistics = async (userId: string, approach: ) => {}

export const saveQuestionnaire = async (userId: string, stage: keyof Survey, questionnaire: Record<string, string>) => {
  if (!userId) {
    throw new Error('userId is required')
  }

  await setDoc(doc(db, 'story_branching', userId, 'questionnaires', stage), questionnaire)
}