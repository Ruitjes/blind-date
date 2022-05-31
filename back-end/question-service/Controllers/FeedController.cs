using question_service.Interfaces;
using question_service.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace question_service.Controllers;

[ApiController]
[Route("[controller]")]
public class FeedController : Controller
{

    private readonly IQuestionService _questionService;
    private readonly IBookmarkService _bookmarkService;

    public FeedController(IQuestionService questionService, IBookmarkService bookmarkService)
    {
        _questionService = questionService;
        _bookmarkService = bookmarkService;
    }

    [HttpGet("GetFeedBatchForUser/{userIdentifier}")]
    public async Task<IEnumerable<Question>> GetFeedBatchForUser(string userIdentifier)
    {
        Bookmark usersBookmark = await _bookmarkService.GetByUserIdentifier(userIdentifier);

        return await _questionService.GetNextQuestionBatchBasedOnUserBookmark(usersBookmark?.CurrentIndex, userIdentifier);
    }

    [HttpGet("GetQuestionForUser/{userIdentifier}")]
    public async Task<Question> GetQuestionForUser(string userIdentifier)
    {
        Bookmark usersBookmark = await _bookmarkService.GetByUserIdentifier(userIdentifier);

        return await _questionService.GetNextQuestionBasedOnUserBookmark(usersBookmark?.CurrentIndex, userIdentifier);
    }

    [HttpGet("ProgressUserBookmark/{userIdentifier}")]
    public async Task<string> ProgressUserBookmark(string userIdentifier)
    {
        Bookmark ub = await _bookmarkService.GetByUserIdentifier(userIdentifier);
        if (ub == null)
        {
            Question q = await _questionService.GetNextQuestionBasedOnUserBookmark(null, userIdentifier);
            await _bookmarkService.CreateAsync(new Bookmark { UserIdentifier = userIdentifier, CurrentIndex = q.Id });
            return "new bookmark entry created for user";
        }
        else
        {
            Question nextQuestion = await _questionService.GetNextQuestionBasedOnUserBookmark(ub?.CurrentIndex, userIdentifier);

            return await _bookmarkService.UpdateAsync(ub!.Id, new Bookmark { Id = ub!.Id, UserIdentifier = ub?.UserIdentifier!, CurrentIndex = nextQuestion.Id });
        }
    }
}
