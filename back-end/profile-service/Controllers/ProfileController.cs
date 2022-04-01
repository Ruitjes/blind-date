using profile_service.Interfaces;
using profile_service.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace profile_service.Controllers;

[ApiController]
[Route("[controller]")]
public class ProfileController : Controller
{

    private readonly IQuestionService _questionService;

    public ProfileController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [HttpGet("GetAllQuestions")]
    public async Task<IEnumerable<Profile>> GetAllQuestions()
    {
        return await _questionService.GetAllAsync();
    }

    [HttpGet("GetQuestionById/{id}")]
    public async Task<Profile> GetQuestionById(ObjectId id)
    {
        return await _questionService.GetByIdAsync(id);
    }

    [HttpPost("AskQuestion")]
    public async Task<Profile> AskQuestion(Profile newQuestion)
    {
        newQuestion.Id = ObjectId.GenerateNewId();
       // newQuestion.AddedOn = DateTime.UtcNow;

        return await _questionService.CreateAsync(newQuestion);
    }
}
