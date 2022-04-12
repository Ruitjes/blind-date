package com.blinddate.answer.conttroller;

import com.blinddate.answer.model.AnswerUpdatingRequest;
import com.blinddate.answer.service.AnswerService;
import com.blinddate.answer.model.Answer;
import com.blinddate.answer.model.AnswerCreatingRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/answers")
@AllArgsConstructor
@Slf4j
public class AnswerController {
    private final AnswerService answerService;

    @PostMapping
    public void saveAnswer(@RequestBody AnswerCreatingRequest request) {
        log.info("Adding answer: {}", request);
        answerService.saveAnswer(request);
    }

    @GetMapping("/{id}")
    public Answer getAnswer(@PathVariable String id) {
        log.info("Getting answer with id: {}", id);
        return answerService.getAnswer(id);
    }

    @GetMapping
    public Iterable<Answer> getAllAnswers() {
        log.info("Getting all answers");
        return answerService.getAllAnswers();
    }

    @PutMapping("/{id}")
    public void updateAnswer(@PathVariable String id, @RequestBody AnswerUpdatingRequest request) {
        log.info("Updating answer with id: {}", id);
        answerService.updateAnswer(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteAnswer(@PathVariable String id) {
        log.info("Deleting answer with id: {}", id);
        answerService.deleteAnswer(id);
    }

    @GetMapping("/user/{userId}")
    public Iterable<Answer> getAnswersByUserId(@PathVariable String userId) {
        log.info("Getting answers by user id: {}", userId);
        return answerService.getAnswersByUserId(userId);
    }

    @GetMapping("/question/{questionId}")
    public Iterable<Answer> getAnswersByQuestionId(@PathVariable String questionId) {
        log.info("Getting answers by question id: {}", questionId);
        return answerService.getAnswersByQuestionId(questionId);
    }
}
