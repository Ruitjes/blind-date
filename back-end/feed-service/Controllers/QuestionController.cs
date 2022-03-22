using feed_service.Interfaces;
using feed_service.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace feed_service.Controllers;

[ApiController]
[Route("[controller]")]
public class QuestionController : Controller
{

    private readonly IQuestionService _questionService;

    public QuestionController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [HttpGet]
    public async Task<IEnumerable<Question>> GetAllQuestions()
    {
        return await _questionService.GetAllAsync();
    }

    [HttpGet("GetQuestionById/{id}")]
    public async Task<Question> GetQuestionById(ObjectId id)
    {
        return await _questionService.GetByIdAsync(id);
    }
}
