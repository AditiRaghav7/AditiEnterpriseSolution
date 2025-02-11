# Use the official MySQL image from Docker Hub
FROM mysql

# Set environment variables for MySQL root password, database, and user
ENV MYSQL_HOST="my-mysql-container"
ENV MYSQL_USER="root"
ENV MYSQL_PASSWORD="Aditi@1122"
ENV MYSQL_DATABASE="employees_db"
ENV MYSQL_PORT="3306"


EXPOSE 3306

# Copy initialization SQL script into Docker container
COPY init.sql /docker-entrypoint-initdb.d/
