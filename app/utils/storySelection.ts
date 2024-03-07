import { Statistics } from "~/db/firebase";

export const selectRandomStoryId = (baselineStories: { id: string; approach: string; }[], proposedStories: { id: string; approach: string; }[], statistics: Statistics) => {
  // Pick an approach with fewer stories or random if equal
  let selectedApproach: "baseline" | "proposed" | null = null
  if (statistics.baseline.count < statistics.proposed.count) {
    selectedApproach = "baseline";
  } else if (statistics.baseline.count > statistics.proposed.count) {
    selectedApproach = "proposed";
  } else {
    selectedApproach = Math.random() < 0.5 ? "baseline" : "proposed";
  }

  const selectedStories = selectedApproach === "baseline" ? baselineStories : proposedStories;
  const selectedStatistics = selectedApproach === "baseline" ? statistics.baseline : statistics.proposed;
  let randomStoryId = null;

  // Check if there are any stories that have not been played
  const unplayedStories = selectedStories.filter(
    (story) => !selectedStatistics.storyIds.find((s) => s.id === story.id)
  );
  if (unplayedStories.length > 0) {
    randomStoryId =
      unplayedStories[Math.floor(Math.random() * unplayedStories.length)].id;
  } else {
    // Pick a story with least amount of count
    const minCount = Math.min(
      ...selectedStatistics.storyIds.map((story) => story.count)
    );
    const minCountStories = selectedStatistics.storyIds.filter(
      (story) => story.count === minCount
    );
    randomStoryId =
      minCountStories[Math.floor(Math.random() * minCountStories.length)].id;
  }

  if (randomStoryId === null) {
    throw new Error("No story found");
  }
  return { randomStoryId, selectedApproach };
}