package com.blinddate.answer.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@Builder
public class Answer {
    private String id;
    private String content;
    private String questionId;
    private UserProfile userProfile;
    private String createdAt;
}
