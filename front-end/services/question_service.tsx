import http from "./common_api";

const GetFeedBatchForUser = (userIdentifier: string) => {
    return http.httpdefault().get(`/question-service/Feed/GetFeedBatchForUser/${userIdentifier}`);
};

const GetQuestionForUser = (userIdentifier: string) => {
    return http.httpdefault().get(`/question-service/Feed/GetQuestionForUser/${userIdentifier}`);
};

const ProgressUserBookmark = (userIdentifier: string) => {
    return http.httpdefault().get(`/question-service/Feed/ProgressUserBookmark/${userIdentifier}`);
};

const AskQuestion = (questionText: string, userIdentifier: string) => {
    const data = {id: null, content: questionText, addedOn: null, userIdentifier: userIdentifier};
    return http.httpdefault().post(`/question-service/Question/AskQuestion`, data);
};


export default {
    GetQuestionForUser,
    GetFeedBatchForUser,
    ProgressUserBookmark,
    AskQuestion
};