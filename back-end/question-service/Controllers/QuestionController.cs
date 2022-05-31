using question_service.Interfaces;
using question_service.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Microsoft.AspNetCore.Authorization;
using question_service.Messaging;

namespace question_service.Controllers;

[ApiController]
[Route("[controller]")]
public class QuestionController : Controller
{
    private readonly IQuestionService _questionService;
    private readonly IMessageBusPublisher _messageBusPublisher;

    public QuestionController(IQuestionService questionService, IMessageBusPublisher messageBusPublisher)
    {
        _questionService = questionService;
        _messageBusPublisher = messageBusPublisher;
    }

    [HttpGet("GetAllQuestions")]
    public async Task<IEnumerable<Question>> GetAllQuestions()
    {
        return await _questionService.GetAllAsync();
    }

    [HttpGet("GetQuestionById/{id}")]
    public async Task<Question> GetQuestionById(string id)
    {
        return await _questionService.GetByIdAsync(new ObjectId(id));
    }

    [HttpGet("GetQuestionsByUser/{userId}")]
    public async Task<List<Question>> GetQuestionsByUser(string userId)
    {
        return await _questionService.GetQuestionsByUser(userId);
    }

    [HttpPost("AskQuestion")]
    public async Task<Question> AskQuestion(Question newQuestion)
    {
        newQuestion.Id = ObjectId.GenerateNewId();
        newQuestion.AddedOn = DateTime.UtcNow;

        return await _questionService.CreateAsync(newQuestion);
    }

    [HttpDelete("DeleteQuestion")]
    public async Task<Question> DeleteQuestion(string id)
    {
        _messageBusPublisher.PublishMessage("DeleteQuestion", id);

        return await _questionService.DeleteAsync(new ObjectId(id));
    }
}
