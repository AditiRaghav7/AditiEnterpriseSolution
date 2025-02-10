pipeline {
    agent any

    environment {
        AWS_REGION = 'eu-north-1'
        ECR_REGISTRY = '296062592493.dkr.ecr.eu-north-1.amazonaws.com'
        ECR_REPOSITORY = 'employee-ecr-jenkins'
        FRONTEND_IMAGE = 'my-frontend-image'
        BACKEND_IMAGE = 'my-backend-image'
        MYSQL_IMAGE = 'my-mysql-image'
        NETWORK_NAME = 'my-network'
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    if (fileExists('.git')) {
                        sh 'git fetch --all'
                        sh 'git reset --hard origin/main'
                    } else {
                        sh 'git clone -b main https://github.com/AditiRaghav7/employee-ecr-jenkins.git .'
                    }
                }
            }
        }

        stage('Authenticate with AWS ECR') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t ${FRONTEND_IMAGE} ./frontend"
                    sh "docker build -t ${BACKEND_IMAGE} ./backend"
                    sh "docker build -t ${MYSQL_IMAGE} ./mysql"
                }
            }
        }

        stage('Tag and Push Docker Images to ECR') {
            steps {
                script {
                    sh "docker tag ${FRONTEND_IMAGE}:latest ${ECR_REGISTRY}/${ECR_REPOSITORY}:frontend-latest"
                    sh "docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:frontend-latest"

                    sh "docker tag ${BACKEND_IMAGE}:latest ${ECR_REGISTRY}/${ECR_REPOSITORY}:backend-latest"
                    sh "docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:backend-latest"

                    sh "docker tag ${MYSQL_IMAGE}:latest ${ECR_REGISTRY}/${ECR_REPOSITORY}:mysql-latest"
                    sh "docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:mysql-latest"
                }
            }
        }

        stage('Setup Docker Network') {
            steps {
                script {
                    def networkExists = sh(script: "docker network ls | grep -w $NETWORK_NAME || true", returnStdout: true).trim()
                    if (!networkExists) {
                        sh "docker network create $NETWORK_NAME"
                    }
                }
            }
        }

        stage('Remove Old Containers') {
            steps {
                script {
                    sh "docker rm -f my-frontend-container || true"
                    sh "docker rm -f my-backend-container || true"
                    sh "docker rm -f my-mysql-container || true"
                }
            }
        }

        stage('Run New Containers') {
            steps {
                script {
                    sh """
                    docker run -d --name my-mysql-container --network $NETWORK_NAME \
                        -e MYSQL_ROOT_PASSWORD=Aditi@1122 \
                        -e MYSQL_DATABASE=employees_db \
                        -p 3306:3306 ${ECR_REGISTRY}/${ECR_REPOSITORY}:mysql-latest

                    docker run -d --name my-backend-container --network $NETWORK_NAME \
                        -p 8000:8000 -e DB_HOST=my-mysql-container ${ECR_REGISTRY}/${ECR_REPOSITORY}:backend-latest

                    docker run -d --name my-frontend-container --network $NETWORK_NAME \
                        -p 5000:5000 ${ECR_REGISTRY}/${ECR_REPOSITORY}:frontend-latest
                    """
                }
            }
        }

        stage('Verify Containers') {
            steps {
                sh "docker ps"
            }
        }
    }
}
