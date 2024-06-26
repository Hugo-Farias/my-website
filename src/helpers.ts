import { githubApiData, PinnedItem, projectItem } from "../typeDefinitions";
//import { techList } from "./data/sharedData.json";

export const convertGithubData = function (data: githubApiData): projectItem[] {
  return data?.user.pinnedItems.nodes.map((pinnedItem: PinnedItem) => {
    const topics = pinnedItem.repositoryTopics.nodes;

    let techArray = ["react", "html", "css"];

    if (topics.length > 0) {
      techArray = topics
        .map((v) => v.topic.name)        
    }

    return {
      id: pinnedItem.id,
      name: pinnedItem.name,
      description: pinnedItem.description,
      image: pinnedItem.openGraphImageUrl,
      tech: techArray,
      projectLink:
        pinnedItem.id === "R_kgDOJQNaqg" ? null : pinnedItem.homepageUrl,
      codeLink: pinnedItem.url,
    };
  });
};
