package com.blinddate.answer.service;

import com.blinddate.answer.model.Answer;
import com.blinddate.answer.model.AnswerCreatingRequest;
import com.blinddate.answer.model.AnswerUpdatingRequest;
import com.blinddate.answer.repository.AnswerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AnswerService {
    private AnswerRepository answerRepository;

    // Save answer
    public Answer saveAnswer(AnswerCreatingRequest request) {

        final var answer = Answer.builder()
                .userProfile(request.userProfile())
                .questionId(request.questionId())
                .content(request.content())
                .build();
        return answerRepository.save(answer);
    }

    // Fetch answer by id
    public Answer getAnswer(String id) {
        return answerRepository.findById(id).orElse(null);
    }


    // Update the answer
    public Answer updateAnswer(String id, AnswerUpdatingRequest requestBody) {
        final var answer = answerRepository.findById(id).orElse(null);
        if (answer == null) {
            return null;
        }
        answer.setContent(requestBody.content());
        answer.setUserProfile(requestBody.userProfile());
        return answerRepository.save(answer);
    }

    // Fetch answers by UserId
    public Iterable<Answer> getAnswersByUserId(String userId) {
        return answerRepository.findAllByUserProfileUserId(userId);
    }

    // Fetch answers by QuestionId
    public Iterable<Answer> getAnswersByQuestionId(String questionId) {
        return answerRepository.findAllByQuestionId(questionId);
    }

    // Delete answer by id
    public void deleteAnswer(String id) {
        answerRepository.deleteById(id);
    }

    // Delete answers belongs the question with id
    public void deleteAnswersByQuestionId(String questionId) {
        answerRepository.deleteAllByQuestionId(questionId);
    }
}
