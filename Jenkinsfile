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
                    sh """
                    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
                    sed -i '/"auths": {/,+2 d' ~/.docker/config.json
                    """
                }
            }
        }

        stage('Verify and Build Docker Images') {
            steps {
                script {
                    sh 'pwd && ls -la' // Debugging workspace

                    if (!fileExists('frontend')) {
                        error("ERROR: frontend directory not found!")
                    }
                    if (!fileExists('backend')) {
                        error("ERROR: backend directory not found!")
                    }
                    if (!fileExists('mysql')) {
                        error("ERROR: mysql directory not found!")
                    }

                    sh """
                    docker build -t my-frontend-image ./frontend
                    docker build -t my-backend-image ./backend
                    docker build -t my-mysql-image ./mysql
                    """
                }
            }
        }

        stage('Tag and Push Images to ECR') {
            steps {
                script {
                    sh """
                    docker tag my-frontend-image $ECR_REPO:frontend
                    docker tag my-backend-image $ECR_REPO:backend
                    docker tag my-mysql-image $ECR_REPO:mysql

                    docker push $ECR_REPO:frontend
                    docker push $ECR_REPO:backend
                    docker push $ECR_REPO:mysql
                    """
                }
            }
        }

        stage('Remove Old Containers') {
            steps {
                script {
                    sh """
                    docker ps -q --filter "name=my-frontend-container" | xargs -r docker stop | xargs -r docker rm
                    docker ps -q --filter "name=my-backend-container" | xargs -r docker stop | xargs -r docker rm
                    docker ps -q --filter "name=my-mysql-container" | xargs -r docker stop | xargs -r docker rm
                    """
                }
            }
        }

        stage('Run New Containers') {
            steps {
                script {
                    sh "docker network create $NETWORK_NAME || true"

                    sh """
                    docker run -d --name my-mysql-container --network $NETWORK_NAME -p 3306:3306 $ECR_REPO:mysql
                    docker run -d --name my-backend-container --network $NETWORK_NAME -p 8000:8000 $ECR_REPO:backend
                    docker run -d --name my-frontend-container --network $NETWORK_NAME -p 5000:5000 $ECR_REPO:frontend
                    """
                }
            }
        }
    }
}
