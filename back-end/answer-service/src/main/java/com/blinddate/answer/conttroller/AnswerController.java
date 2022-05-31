package com.blinddate.answer.conttroller;

import com.blinddate.answer.model.AnswerUpdatingRequest;
import com.blinddate.answer.service.AnswerService;
import com.blinddate.answer.model.Answer;
import com.blinddate.answer.model.AnswerCreatingRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequestMapping("/answers")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
@Slf4j
public class AnswerController {
    private final AnswerService answerService;


    @Autowired
    private AmqpTemplate rabbitTemplate;

    @Value("answerqueue")
    private String queueName;
    @Value("answers")
    private String exchange;


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

    @PutMapping("/{id}")
    public void updateAnswer(@PathVariable String id, @RequestBody AnswerUpdatingRequest request) {
        log.info("Updating answer with id: {}", id);
        answerService.updateAnswer(id, request);
    }

    @GetMapping("/user/{userId}")
    public Iterable<Answer> getAnswersByUserId(@PathVariable String userId) {
        log.info("Getting answers by user id: {}", userId);
        rabbitTemplate.convertAndSend(exchange, "#", "hello");
        return answerService.getAnswersByUserId(userId);
    }

    @GetMapping("/question/{questionId}")
    public Iterable<Answer> getAnswersByQuestionId(@PathVariable String questionId) {
        log.info("Getting answers by question id: {}", questionId);
        return answerService.getAnswersByQuestionId(questionId);
    }
    
    @PutMapping("/deleteAnswer/{id}")
    public Answer deleteAnswer(@PathVariable String id) {
      return answerService.deleteAnswer(id);
    }
}
