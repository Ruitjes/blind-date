FROM openjdk:18-jdk-slim
ADD target/answer-service.jar answer-service.jar
EXPOSE 80
ENTRYPOINT ["java","-jar", "answer-service.jar"]