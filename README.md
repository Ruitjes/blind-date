# SeeThrough

## Installation

SeeThrough with Docker.

```sh
docker-compose build
docker-compose up -d
```

http://localhost:3000 -> React front-end
https://localhost:7000 -> .NET Gateway Ocelot

Secure certificate required to run Ocelot .NET in docker.

#### Windows using Windows containers

```sh
dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\aspnetapp.pfx -p { your password }
dotnet dev-certs https --trust
```

#### macOS or Linux

```sh
dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p { your password }
dotnet dev-certs https --trust
```

#### Windows using Linux containers

```sh
dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\aspnetapp.pfx -p { your password }
dotnet dev-certs https --trust
```
