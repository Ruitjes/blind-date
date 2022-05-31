using System.Text;
using System.Text.Json;
using question_service.Events;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace question_service.Messaging.Consumers
{
    public class AnswerCreateConsumer : BackgroundService
    {
        private readonly IModel _channel;

        public AnswerCreateConsumer(RabbitMqConnection connection)
        {
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
                exchange: "awnsers",
                routingKey: ""
            );
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (sender, args) =>
            {
                if (args.BasicProperties.Headers.TryGetValue("MessageType", out var messageType))
                {
                    if ((string)messageType == nameof(CreateAnswerEvent))
                    {
                        var content = Encoding.UTF8.GetString(args.Body.ToArray());
                        var message = JsonSerializer.Deserialize<CreateAnswerEvent>(content);
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
