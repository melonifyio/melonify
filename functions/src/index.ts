import * as functions from "firebase-functions";
import cors from "cors";
// import {CloudBillingClient} from "@google-cloud/billing";
// import {ApiKeysClient} from "@google-cloud/apikeys";
import { ProjectsClient } from "@google-cloud/resource-manager";

// Instantiates a client
const resourcemanagerClient = new ProjectsClient();

const corsHandler = cors({ origin: true });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// Retrieve projects list
export const getProjectList = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    //   callListKeys();
    //   callListProjects();
    const request = {
      query: "",
    };

    const iterable = await resourcemanagerClient.searchProjectsAsync(request);

    const projects = [];

    for await (const response of iterable) {
      projects.push(response);
    }

    console.log(projects);

    res.status(200).send({ data: projects });
  });
});

// Create Project
// export const callCreateProject = functions.https.onRequest(async (req, res) => {
//   corsHandler(req, res, async () => {
//     // Construct request
//     const request = {
//       project: {
//         projectId: "melonify-test-project",
//       },
//     };

//     // Run request
//     const [operation] = await resourcemanagerClient.createProject(request);
//     const [response] = await operation.promise();
//     console.log(response);

//     res.status(200).send({ data: [] });
//   });
// });
