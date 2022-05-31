using System.Text;
using System.Text.Json;
using question_service.Events;
using question_service.Interfaces;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace question_service.Messaging.Consumers
{
    public class AnswerDeleteConsumer : BackgroundService
    {
        private readonly IModel _channel;
        private readonly IQuestionService _service;

        public AnswerDeleteConsumer(RabbitMqConnection connection, IQuestionService service)
        {
            _service = service;
            _channel = connection.CreateChannel();

            _channel.ExchangeDeclare(
                exchange: "answers",
                type: "fanout"
            );

            _channel.QueueDeclare(
                queue: "questionservice-answer-events",
                exclusive: false,
                autoDelete: false);

            _channel.QueueBind(
                queue: "questionservice-answer-events",
                exchange: "answers",
                routingKey: ""
            );
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (sender, args) =>
            {
                if (args.BasicProperties.Headers.TryGetValue("MessageType", out var objValue) && objValue is byte[] valueAsBytes)
                {
                    var messageType = Encoding.UTF8.GetString(valueAsBytes);
                    if (messageType == nameof(DeleteAnswerEvent))
                    {
                        var content = Encoding.UTF8.GetString(args.Body.ToArray());
                        var message = JsonSerializer.Deserialize<CreateAnswerEvent>(content);

                        await _service.DecrementNumberOfQuestionsAsync(message.Id);
                        _channel.BasicAck(args.DeliveryTag, multiple: false);
                    }
                }
            };

            _channel.BasicConsume("questionservice-answer-events", autoAck: false, consumer);
            return Task.CompletedTask;
        }

        public override void Dispose()
        {
            if (_channel.IsOpen)
            {
                _channel.Dispose();
            }
        }
    }
}
