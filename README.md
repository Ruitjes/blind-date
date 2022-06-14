
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

DB_URL_ANSWER=XXX
DB_URL_PROFILE=XXX
DB_URL_QUESTION=XXX
DB_URL_REPORT=XXX

AUTH0_AUTHORITY=XXX
AUTH0_AUDIENCE=XXX

AUTH0_MANAGEMENT_SECRET=XXX
AUTH0_MANAGEMENT_CLIENT_ID=XXX
AUTH0_MANAGEMENT_AUDIENCE=XXX

RabbitMQ_URI=amqp://guest:guest@rabbitmq:5672/

ACCESS_KEY=XXX
SECRET_ACCESS_KEY=XXX
BUCKET_NAME=XXX

```

4. Run the docker compose file from root

```bash
docker-compose build
docker-compose up -d
```

5. When the docker-compose is up.

-   http://localhost:3000 -> React front-end
-   https://localhost:7000 -> .NET Gateway Ocelot

6. Start React app
```bash
npm run dev
```

7. When the React app is running

-   http://localhost:3000 -> React front-end

8. Start Angular app
- Development
```bash
npm run start OR ng serve
```

- Production
```bash
ng serve --configuration production
```

9. When the React app is running

-   http://localhost:4200 -> Angular front-end

10. To get Auth0 working add a .env file to the front-end folder with the following:

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

## Setting up the mongoDB / importing the dataset

1. Create a Mongo Atlas DB at https://www.mongodb.com/cloud/atlas/register
2. Import our base dataset located in the "dataset" folder via the mongo cli. read more at [https://www.mongodb.com/docs/database-tools/mongoexport/ ](https://www.mongodb.com/docs/database-tools/mongoimport/)

```bash
mongoimport mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```
