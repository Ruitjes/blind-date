package com.blinddate.answer.repository;

import com.blinddate.answer.model.Answer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends MongoRepository<Answer, String> {

    Iterable<Answer> findAllByUserProfileUserId(String userId);
    Iterable<Answer> findAllByQuestionId(String questionId);
    void deleteAllByQuestionId(String questionId);
}
