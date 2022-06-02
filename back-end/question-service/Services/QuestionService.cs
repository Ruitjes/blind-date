using question_service.Configurations;
using question_service.Interfaces;
using question_service.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace question_service.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly IMongoCollection<Question> _questions;
        private readonly IExternalServices _externalServices;

        public QuestionService(IMongoDbSettings settings, IExternalServices externalServices)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _questions = database.GetCollection<Question>("Question");
            _externalServices = externalServices;
        }

        public async Task<List<Question>> GetAllAsync()
        {
            return await _questions.Find(s => true).ToListAsync();
        }

        public async Task<Question> GetByIdAsync(ObjectId id)
        {
            return await _questions.Find(s => s.Id == id).FirstOrDefaultAsync();
        }
      public async Task<Question> GetNextQuestionBasedOnUserBookmark(ObjectId? bookmark, string userIdentifier)
        {
            Profile? userProfile = await _externalServices.GetProfileWithUserIdentifierAsync(userIdentifier);
            List<string?> interests = userProfile?.Interests as List<string?> ?? new List<string?>();
            interests.Add(null); // Allow for questions with no linked interest to still show in people's feed.

            //Could make a shorthand operator inside the find to shorten the amount of lines. but that would make it unreadable.
            if (bookmark == null)
            {
                return await _questions.Find(s => s.UserIdentifier != userIdentifier && interests.Contains(s.LinkedInterest) && s.Language == userProfile.Language).FirstOrDefaultAsync();
            }
            else
            {
                return await _questions.Find(s => s.Id > bookmark && s.UserIdentifier != userIdentifier && interests.Contains(s.LinkedInterest) && s.Language == userProfile.Language).SortBy(s => s.Id).Limit(1).FirstOrDefaultAsync();
            }
        }

        public async Task<List<Question>> GetNextQuestionBatchBasedOnUserBookmark(ObjectId? bookmark, string userIdentifier)
        {
            Profile? userProfile = await _externalServices.GetProfileWithUserIdentifierAsync(userIdentifier);
            List<string?> interests = userProfile?.Interests as List<string?> ?? new List<string?>();
            interests.Add(null); // Allow for questions with no linked interest to still show in people's feed.


            if (bookmark == null)
            {
                return await _questions.Find(s => true && s.UserIdentifier != userIdentifier && interests.Contains(s.LinkedInterest) && s.Language == userProfile.Language).Limit(5).ToListAsync();
            }
            else
            {
                return await _questions.Find(s => s.Id > bookmark && s.UserIdentifier != userIdentifier && interests.Contains(s.LinkedInterest) && s.Language == userProfile.Language).Limit(5).ToListAsync();
            }
        }

        public async Task<Question> CreateAsync(Question question)
        {
            await _questions.InsertOneAsync(question);
            return question;
        }

        public async Task UpdateAsync(ObjectId id, Question question)
        {
            await _questions.ReplaceOneAsync(s => s.Id == id, question);
        }

        public async Task IncrementNumberOfQuestionsAsync(ObjectId id)
        {
            await _questions.UpdateOneAsync(
                Builders<Question>.Filter.Eq(s => s.Id, id),
                Builders<Question>.Update.Inc(s => s.NumberOfAnswers, 1)
            );
        }

        public async Task DecrementNumberOfQuestionsAsync(ObjectId id)
        {
            await _questions.UpdateOneAsync(
                Builders<Question>.Filter.Eq(s => s.Id, id),
                Builders<Question>.Update.Inc(s => s.NumberOfAnswers, - 1)
            );
        }

        public async Task<Question> DeleteAsync(ObjectId questionId)
        {
            var update = Builders<Question>.Update
                            .Set(q => q.FileName, "deleted")
                            .Set(q => q.Content, "deleted")
                            .Set(q => q.Deleted, true);

            return await _questions.FindOneAndUpdateAsync(s => s.Id == questionId, update);
        }

        public async Task<List<Question>> GetQuestionsByUser(string userId)
        {
            return await _questions.Find(s => s.UserIdentifier == userId).ToListAsync();
        }
    }
}



