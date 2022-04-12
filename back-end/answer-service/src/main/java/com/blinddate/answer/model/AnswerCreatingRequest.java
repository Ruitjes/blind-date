package com.blinddate.answer.model;

public record AnswerCreatingRequest(UserProfile userProfile, String content, String questionId) {
}
