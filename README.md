# SeeThrough

## Installation

SeeThrough with Docker.

1. Clone this git repository

2. Create a aspnet cert in the cert folder
from project root
```bash
cd certs
dotnet dev-certs https -ep aspnetapp.pfx -p yourcertificatepasswordhere
```
3. Create a .env file in root with the following
```bash
CERTIFICATE_PASSWORD=yourcertificatepasswordhere
DB_USER=yourdatabaseuser
DB_PASSWORD=yourdatabasepassword
DB_URL=mongodb://yourdatabaseuser:yourdatabasepassword@databaseservicename:27017/
```

4. Run the docker compose file from root
```bash
docker-compose build
docker-compose up -d
```

5. When the docker-compose is up.

- http://localhost:3000 -> React front-end
- https://localhost:7000 -> .NET Gateway Ocelot
```
