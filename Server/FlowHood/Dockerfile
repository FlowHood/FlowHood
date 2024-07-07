FROM tomcat
COPY ./build/libs/*.war /usr/local/tomcat/webapps/flowhood.war
EXPOSE 8080
CMD ["catalina.sh", "run"]