export enum EventType {
  AGREED_TO_PARTICIPATE = "AGREED_TO_PARTICIPATE",
  COMPLETED_BEGIN_QUESTIONNAIRE = "COMPLETED_BEGIN_QUESTIONNAIRE",
  GAME_STARTED = "GAME_STARTED",
  CLICKED_NEXT_DIALOGUE = "CLICKED_NEXT_DIALOGUE",
  CLICKED_NEXT_STORY_CHUNK = "CLICKED_NEXT_STORY_CHUNK",
  SELECTED_CHOICE = "SELECTED_CHOICE",
  GAME_ENDED = "GAME_ENDED",
  COMPLETED_END_QUESTIONNAIRE = "COMPLETED_END_QUESTIONNAIRE",
}

export type SelectChoiceData = {
  selectedChoice: number;
  currentStoryChunkId: string;
  nextStoryChunkId: string;
};

export type NextDialogueData = {
  currentDialogueId: number;
  nextDialogueId: number;
};

export type NextStoryChunkData = {
  currentStoryChunkId: string;
  nextStoryChunkId: string;
}

export type UserEvent = {
  userId: string;
  storyId: string;
  chunkId: string;
  eventType: EventType;
  eventTime: Date;
  data: SelectChoiceData | NextDialogueData | NextStoryChunkData | null;
};