namespace profile_service.Messaging
{
    public interface IMessageBusPublisher
    {
        void Dispose();
        void PublishMessage<T>(string messageType, T value);
    }
}