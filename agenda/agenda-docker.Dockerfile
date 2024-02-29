FROM openjdk:21

COPY target/agenda-0.0.1-SNAPSHOT.jar /agendaapp.jar

#Como su nombre indica, copia el .jar que generamos anteriormente en docker.

CMD ["java", "-jar", "/agendaapp.jar"]

