using feed_service.Interfaces;
using feed_service.Models;
using Microsoft.AspNetCore.Mvc;

namespace feed_service.Controllers;

[ApiController]
[Route("[controller]")]
public class QuestionController : ControllerBase
{

    private readonly IQuestionService _questionService;

    public QuestionController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [HttpGet(Name = "GetAllQuestions")]
    public async Task<IEnumerable<Question>> Get()
    {
        return await _questionService.GetAllAsync();
    }
}
