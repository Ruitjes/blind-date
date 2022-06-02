using question_service.Configurations;
using RabbitMQ.Client;

namespace question_service.Messaging
{
    public class RabbitMqConnection : IDisposable
    {
        private readonly IConnectionFactory _factory;
        private IConnection? _connection;
        
        public RabbitMqConnection(IRabbitMqSettings settings)
        {
            if (settings.ConnectionString == null)
            {
                throw new Exception("RabbitMQ connection URL not set");
            }

            _factory = new ConnectionFactory
            {
                Uri = new Uri(settings.ConnectionString),
                AutomaticRecoveryEnabled = true // When the connection is lost, this will automatically reconnect us when it can get back up
            };

        }


        public IModel CreateChannel()
        {
            return GetConnection().CreateModel();
        }

        private IConnection GetConnection()
        {
            if (_connection == null)
            {
                _connection = _factory.CreateConnection();
            }

            return _connection;
        }

        public void Dispose()
        {
            if (_connection.IsOpen)
            {
                _connection.Dispose();
            }

            _connection = null;
        }
    }
}
