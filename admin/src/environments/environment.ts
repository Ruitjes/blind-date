// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Docker compose
  apiUrlReports: "https://localhost:7000/report-service/reports",
  apiUrlUsers: "https://localhost:7000/profile-service",
  apiUrlQuestions: "https://localhost:7000/question-service/question",
  apiUrlAnswers: "https://localhost:7000/answer-service/answers"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
