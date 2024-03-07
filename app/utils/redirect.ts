import { EventType } from "~/types/userEvent";

export const redirectBasedOnStatus = (status: EventType) => {
  switch (status) {
    case EventType.AGREED_TO_PARTICIPATE:
      return "/questionnaires/begin";
    case EventType.COMPLETED_BEGIN_QUESTIONNAIRE:
      return "/game";
    case EventType.GAME_ENDED:
      return "/questionnaires/end";
    case EventType.COMPLETED_END_QUESTIONNAIRE:
      return "/finish";
    default:
      return null;
  }
}