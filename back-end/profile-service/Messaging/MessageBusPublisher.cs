using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
namespace profile_service.Messaging
{
    public class MessageBusPublisher : IMessageBusPublisher
    {

        private readonly RabbitMqConnection _connection;

        public MessageBusPublisher(RabbitMqConnection connection)
        {
            _connection = connection;
            // create channel
            var channel = _connection.CreateChannel();
            // declare exchange in our channel
            channel.ExchangeDeclare(exchange: "semester-6", type: ExchangeType.Fanout);
        }

        public void PublishMessage<T>(string messageType, T value)
        {
            using var channel = _connection.CreateChannel();
            var message = channel.CreateBasicProperties();
            message.ContentType = "application/json";
            message.DeliveryMode = 2;
            // Add a MessageType header, this part is crucial for our solution because it is our way of distinguishing messages
            message.Headers = new Dictionary<string, object> { ["MessageType"] = messageType };
            var body = JsonSerializer.SerializeToUtf8Bytes(value);

            // Publish this without a routing key to the rabbitmq broker
            channel.BasicPublish("semester-6", string.Empty, message, body);
        }
    }
}
