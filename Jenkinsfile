pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-north-1'
        ECR_REGISTRY = '296062592493.dkr.ecr.eu-north-1.amazonaws.com'
        ECR_REPOSITORY = 'employee-ecr-jenkins'
        FRONTEND_IMAGE = 'my-frontend-image'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main' , url: 'https://github.com/AditiRaghav7/employee-ecr-jenkins.git'
            }
        }

        stage('Authenticate with AWS ECR') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${FRONTEND_IMAGE} ./frontend"
                }
            }
        }

        stage('Tag and Push Docker Image to ECR') {
            steps {
                script {
                    sh "docker tag ${FRONTEND_IMAGE}:latest ${ECR_REGISTRY}/${ECR_REPOSITORY}:frontend-latest"
                    sh "docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:frontend-latest"
                }
            }
        }

        stage('Remove Old Container') {
            steps {
                script {
                    sh "docker rm -f my-frontend-container || true"
                }
            }
        }

        stage('Run New Frontend Container') {
            steps {
                script {
                    sh "docker run -d --name my-frontend-container -p 5000:5000 ${ECR_REGISTRY}/${ECR_REPOSITORY}:frontend-latest"
                }
            }
        }
    }
}
