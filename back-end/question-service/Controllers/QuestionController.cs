using question_service.Interfaces;
using question_service.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace question_service.Controllers;

[ApiController]
[Route("[controller]")]
public class QuestionController : Controller
{

    private readonly IQuestionService _questionService;

    public QuestionController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [HttpGet("GetAllQuestions")]
    public async Task<IEnumerable<Question>> GetAllQuestions()
    {
        return await _questionService.GetAllAsync();
    }

    [HttpGet("GetQuestionById/{id}")]
    public async Task<Question> GetQuestionById(ObjectId id)
    {
        return await _questionService.GetByIdAsync(id);
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
}
