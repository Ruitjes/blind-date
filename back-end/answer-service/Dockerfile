FROM openjdk:18-jdk-slim
ADD target/answer-service.jar answer-service.jar
EXPOSE 80
ENTRYPOINT ["java","-jar", "answer-service.jar"]

# #
# # Build stage
# #
# FROM maven:3.6.0-jdk-11-slim AS build
# COPY src /home/app/src
# COPY pom.xml /home/app
# RUN mvn -f /home/app/pom.xml clean package

# #
# # Package stage
# #
# FROM openjdk:18-jdk-slim
# COPY --from=build /home/app/target/answer-service.jar /usr/local/lib/answer-service.jar
# EXPOSE 8080
# ENTRYPOINT ["java","-jar","/usr/local/lib/answer-service.jar"]