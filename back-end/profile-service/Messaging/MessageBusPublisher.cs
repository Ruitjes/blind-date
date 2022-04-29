using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
namespace profile_service.Messaging
{
    public class MessageBusPublisher : IMessageBusPublisher
    {

        private readonly IConnection? _connection;
        private readonly IModel? _channel;

        public MessageBusPublisher()
        {
            var factory = new ConnectionFactory
            {
                Uri = new Uri($"amqp://guest:guest@192.168.1.80:5672"), // Need to update when kubernetes are done
                AutomaticRecoveryEnabled = true // When the connection is lost, this will automatically reconnect us when it can get back up
            };

            try
            {
                // connect to message bus
                _connection = factory.CreateConnection();
                // create channel
                _channel = _connection.CreateModel();
                // declare exchange in our channel
                _channel.ExchangeDeclare(exchange: "semester-6", type: ExchangeType.Fanout);

            }
            catch (Exception ex)
            {
                Console.WriteLine($"--> Could not connect to the Message Bus: {ex.Message}");
            }
        }

        public void PublishMessage<T>(string messageType, T value)
        {
            if (_channel is not null)
            {
                var message = _channel.CreateBasicProperties();
                message.ContentType = "application/json";
                message.DeliveryMode = 2;
                // Add a MessageType header, this part is crucial for our solution because it is our way of distinguishing messages
                message.Headers = new Dictionary<string, object> { ["MessageType"] = messageType };
                var body = JsonSerializer.SerializeToUtf8Bytes(value);


                // check if connection is open
                if (_connection?.IsOpen ?? false)
                {
                    _channel.BasicPublish("semester-6", string.Empty, message, body);
                }
            }
            else
            {
                Console.WriteLine("--> RabbitMQ connection closed, not sending");
            }
        }


        // Clean up when our class dies
        public void Dispose()
        {
            if (_channel?.IsOpen ?? false)
            {
                _channel.Close();
                _connection.Close();
            }
        }
    }
}
