import { githubApiData, PinnedItem, projectItem } from "../typeDefinitions";
import { techList } from "./data/sharedData.json";

export const convertGithubData = function (data: githubApiData): projectItem[] {
  return data?.user.pinnedItems.nodes.map((pinnedItem: PinnedItem) => {
    const topics = pinnedItem.repositoryTopics.nodes;

    let techArray = ["react", "html", "css"];

    if (topics.length > 0) {
      techArray = topics
        .map((v) => v.topic.name)
        .filter((v) => techList.includes(v));
    }

    return {
      id: pinnedItem.id,
      name: pinnedItem.name.replaceAll("-", " "),
      description: pinnedItem.description,
      image: pinnedItem.openGraphImageUrl,
      tech: techArray,
      projectLink:
        pinnedItem.id === "R_kgDOJQNaqg" ? null : pinnedItem.homepageUrl,
      codeLink: pinnedItem.url,
    };
  });
};

// export const sendEmail = function (to: string, subject: string, body: string) {
//   gapi.client.gmail.users.messages
//     .send({
//       userId: "me",
//       resource: {
//         raw: window.btoa(
//           "To: " + to + "\r\n" + "Subject: " + subject + "\r\n\r\n" + body
//         ),
//       },
//     })
//     .execute(function (response: any) {
//       console.log(response);
//     });
// };
