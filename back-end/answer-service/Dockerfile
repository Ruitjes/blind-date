FROM maven:3.8.5-openjdk-18-slim AS build

COPY . /usr/src/answer-service
WORKDIR /usr/src/answer-service
RUN mvn clean package -DskipTests


# Step 2: Run jar file with Java
FROM openjdk:18-jdk-slim
COPY --from=build /usr/src/answer-service/target/answer-service.jar answer-service.jar
ENTRYPOINT ["java", "-jar", "answer-service.jar"]