
<img src="https://github.com/Ruitjes/blind-date/blob/main/assets/logo.png" alt="SeeThrough Logo" title="SeeThrough" align="right" height="60" />

# SeeThrough

SeeThrough is Q & A Platform with Tinder flavours,
Users can ask questions in selected communities and can answer them through a personalized question feed.<br/>
SeeThrough's main stakeholders are part of a research group at [Fontys](https://fontys.nl/) that focusses on [visually impaired](https://en.wikipedia.org/wiki/Visual_impairment) people so Accessiblity has been part of the project from day-one.<br/><br/>
The stakeholders goals are defined as follows:

- Can technology help visually impaired people with asking difficult and intimiate questions?
- How do people respond and use this developed app?

Furthermore SeeThrough has been built with scalability in mind meaning an Event driven microservices architecture was the chosen approach.
This architecture has been deployed in a [kubernetes](https://kubernetes.io/) cluster.

## Setting up the development environment

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
CERTIFICATE_PASSWORD=XXX

QUESTION_SERVICE_CONNECTION_STRING=XXX
PROFILE_SERVICE_CONNECTION_STRING=XXX

Auth0Domain=XXX
Auth0Audience=XXX

ACCESS_KEY=XXX
SECRET_ACCESS_KEY=XXX
BUCKET_NAME=XXX
```

4. Write the following in the usersecret.

```bash
{
  "AmazonS3Settings":{
    "AccessKey": "AKIA6L6USLIWFSHUW4M3",
    "SecretKey": "2w72sh9JNiIfJH1P4okJuphY2NNJhh1ddbomDsZ",
    "BucketName": "seetrough"
  }
}
```

5. Run the docker compose file from root

```bash
docker-compose build
docker-compose up -d
```

6. When the docker-compose is up.

-   http://localhost:3000 -> React front-end
-   https://localhost:7000 -> .NET Gateway Ocelot

7. Start React app
```bash
npm run dev
```

8. When the React app is running

-   http://localhost:3000 -> React front-end

9. Start Angular app
```bash
npm run start OR ng serve
```

10. When the React app is running

-   http://localhost:4200 -> Angular front-end

11. To get Auth0 working add a .env file to the front-end folder with the following:

```bash
# url for the back-end endpoints
NEXT_PUBLIC_API_URL=https://localhost:7000
# A long, secret value used to encrypt the session cookie
AUTH0_SECRET='verysecretgeneratedkey'
# The base url of your application
AUTH0_BASE_URL='http://localhost:3000'
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL='https://our-tenant.region.auth0.com'
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID='ourclientid'
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET='ourclientsecret'
# Audience for ASP back-end
AUTH0_AUDIENCE='seethrough'
```
