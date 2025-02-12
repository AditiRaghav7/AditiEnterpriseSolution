pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '296062592493'
        AWS_REGION = 'eu-north-1'
        ECR_REPO_FRONTEND = 'ema-frontend'
        ECR_REPO_BACKEND = 'ema-backend'
        ECR_REPO_DB = 'ema-db'
        ECR_URL = '296062592493.dkr.ecr.eu-north-1.amazonaws.com'
    }

    stages {
        stage('Cleanup Old Docker Images') {
            steps {
                script {
                    sh 'docker system prune -af'
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 296062592493.dkr.ecr.eu-north-1.amazonaws.com'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t $ECR_REPO_FRONTEND:latest ./frontend'
                    sh 'docker build -t $ECR_REPO_BACKEND:latest ./backend'
                    sh 'docker build -t $ECR_REPO_DB:latest ./mysql'
                }
            }
        }

        stage('Tag Docker Images') {
            steps {
                script {
                    sh 'docker tag $ECR_REPO_FRONTEND:latest $ECR_URL/$ECR_REPO_FRONTEND:latest'
                    sh 'docker tag $ECR_REPO_BACKEND:latest $ECR_URL/$ECR_REPO_BACKEND:latest'
                    sh 'docker tag $ECR_REPO_DB:latest $ECR_URL/$ECR_REPO_DB:latest'
                }
            }
        }

        stage('Push Images to AWS ECR') {
            steps {
                script {
                    sh 'docker push $ECR_URL/$ECR_REPO_FRONTEND:latest'
                    sh 'docker push $ECR_URL/$ECR_REPO_BACKEND:latest'
                    sh 'docker push $ECR_URL/$ECR_REPO_DB:latest'
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    sh 'docker stop ema-frontend-container || true && docker rm ema-frontend-container || true'
                    sh 'docker stop ema-backend-container || true && docker rm ema-backend-container || true'
                    sh 'docker stop ema-db-container || true && docker rm ema-db-container || true'

                    sh 'docker run -d --name ema-frontend-container -p 8000:8000 $ECR_URL/$ECR_REPO_FRONTEND:latest'
                    sh 'docker run -d --name ema-backend-container -p 5000:5000 $ECR_URL/$ECR_REPO_BACKEND:latest'
                    sh 'docker run -d --name ema-db-container -p 3306:3306 $ECR_URL/$ECR_REPO_DB:latest'
                }
            }
        }
    }
}
