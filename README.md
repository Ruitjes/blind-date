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
ACCESS_KEY=AKIA6L6USLIWFSHUW4M3
SECRET_ACCESS_KEY=2w72sh9JNiIfJH1P4okJuphY2NNJhh1ddbomDsZ6
BUCKET_NAME=seetrough
```

4. Run the docker compose file from root

```bash
docker-compose build
docker-compose up -d
```

5. When the docker-compose is up.

- http://localhost:3000 -> React front-end
- http://localhost:3001 -> Angular front-end admin panel
- https://localhost:7000 -> .NET Gateway Ocelot

```

```
