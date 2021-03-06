package com.blinddate.answer.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class UserProfile {
    private String userId;
    private String userName;
    private String gender;
    private Integer age;
}
