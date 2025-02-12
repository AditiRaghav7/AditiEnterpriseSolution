# Use the official MySQL image from Docker Hub
FROM mysql:8.0

# Set environment variables for MySQL root password, database, and user
ENV MYSQL_ROOT_PASSWORD=Aditi@1122
ENV MYSQL_DATABASE=employees_db


# Copy initialization SQL script into Docker container
COPY init.sql /docker-entrypoint-initdb.d/
# Expose MySQL default port
EXPOSE 3306
