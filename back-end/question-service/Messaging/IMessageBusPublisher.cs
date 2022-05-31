namespace question_service.Messaging
{
    public interface IMessageBusPublisher
    {
        void PublishMessage<T>(string messageType, T value);
    }
}