// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { default as auth } from '../../auth_config.json';
import { default as authManagement } from '../../auth_management_config.json';

export const environment = {
  production: false,
  // Docker compose
  apiUrlReports: "https://localhost:7000/report-service/reports",
  apiUrlUsers: "https://localhost:7000/profile-service",
  apiUrlQuestions: "https://localhost:7000/question-service/question",
  apiUrlAnswers: "https://localhost:7000/answer-service/answers",
  apiUrl: "https://localhost:7000",

  // Auth0
  auth: {
    domain: auth.domain,
    clientId: auth.clientId,
    redirectUri: window.location.origin,
    audience: auth.audience,
  },
  authManagement: {
    domain: authManagement.domain,
    clientId: authManagement.clientId,
    audience: authManagement.audience,
    scope: authManagement.scope
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
