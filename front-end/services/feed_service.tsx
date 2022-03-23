import http from "./common_api";

const GetFeedBatchForUser = (userIdentifier: string) => {
    return http.httpdefault().get(`/feed-service/Feed/GetFeedBatchForUser/${userIdentifier}`);
};

const GetQuestionForUser = (userIdentifier: string) => {
    return http.httpdefault().get(`/feed-service/Feed/GetQuestionForUser/${userIdentifier}`);
};

const ProgressUserBookmark = (userIdentifier: string) => {
    return http.httpdefault().get(`/feed-service/Feed/ProgressUserBookmark/${userIdentifier}`);
};


export default {
    GetQuestionForUser,
    GetFeedBatchForUser,
    ProgressUserBookmark
};