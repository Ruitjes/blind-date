using RabbitMQ.Client;
using System;

namespace question_service.Messaging
{
    public class RabbitMqConnection : IDisposable
    {
        public string ConnectionString { get; set; } = null!;

        public RabbitMqConnection(string? connectionString)
        {
            if (connectionString == null)
            {
                throw new Exception("RabbitMQ connection URL not set");
            }
            else
            {
                ConnectionString = connectionString;
            }
        }

        private IConnection? _connection;
        public IModel CreateChannel()
        {
            var connection = GetConnection();
            return connection.CreateModel();
        }

        private IConnection GetConnection()
        {
            if(_connection == null)
            {
               
                var factory = new ConnectionFactory
                {
                    Uri = new Uri(ConnectionString),
                    AutomaticRecoveryEnabled = true // When the connection is lost, this will automatically reconnect us when it can get back up
                };
                _connection = factory.CreateConnection();
            }

            return _connection;
        }

        public void Dispose()
        {
            _connection?.Dispose();
        }
    }
}
