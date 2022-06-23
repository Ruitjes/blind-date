import { default as auth } from '../../auth_config.json';
import { default as authManagement } from '../../auth_management_config.json';

export const environment = {
  production: true,
  // Kubernetes
  apiUrlReports: "https://dateblind.me/report-service/reports",
  apiUrlUsers: "https://dateblind.me/profile-service",
  apiUrlQuestions: "https://dateblind.me/question-service/question",
  apiUrlAnswers: "https://dateblind.me/answer-service/answers",
  apiUrl: "https://dateblind.me",

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
