pipeline {
    agent any

    environment {
        AWS_ACCOUNT_ID = '296062592493'
        AWS_REGION = 'eu-north-1'
        ECR_REPO = '296062592493.dkr.ecr.eu-north-1.amazonaws.com/employee-ecr-jenkins'
        NETWORK_NAME = 'my-network'
        REPO_URL = 'https://github.com/AditiRaghav7/employee-ecr-jenkins.git'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: "$REPO_URL"
            }
        }

        stage('Login to AWS ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t my-frontend-image ./frontEnd"
                    sh "docker build -t my-backend-image ./backend"
                    sh "docker build -t my-mysql-image ./mysql"
                }
            }
        }

        stage('Tag and Push Images to ECR') {
            steps {
                script {
                    sh "docker tag my-frontend-image $ECR_REPO:frontend"
                    sh "docker tag my-backend-image $ECR_REPO:backend"
                    sh "docker tag my-mysql-image $ECR_REPO:mysql"

                    sh "docker push $ECR_REPO:frontend"
                    sh "docker push $ECR_REPO:backend"
                    sh "docker push $ECR_REPO:mysql"
                }
            }
        }

        stage('Remove Old Containers') {
            steps {
                script {
                    sh "docker stop my-frontend-container || true && docker rm my-frontend-container || true"
                    sh "docker stop my-backend-container || true && docker rm my-backend-container || true"
                    sh "docker stop my-mysql-container || true && docker rm my-mysql-container || true"
                }
            }
        }

        stage('Run New Containers') {
            steps {
                script {
                    sh "docker network create $NETWORK_NAME || true"

                    sh "docker run -d --name my-mysql-container --network $NETWORK_NAME -p 3306:3306 $ECR_REPO:mysql"
                    sh "docker run -d --name my-backend-container --network $NETWORK_NAME -p 8000:8000 $ECR_REPO:backend"
                    sh "docker run -d --name my-frontend-container --network $NETWORK_NAME -p 5000:5000 $ECR_REPO:frontend"
                }
            }
        }
    }
}
