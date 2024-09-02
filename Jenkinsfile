pipeline {
    agent any


    environment {
        DOCKER_CREDENTIALS_ID = 'c49bbede-46ed-4287-8cdf-21dae8de3f35'  // Docker Hub 자격 증명 ID
        DOCKER_IMAGE = 'chany91/bbansrun-fe'  // Docker Hub에 저장할 이미지 이름
        EC2_SSH_CREDENTIALS_ID = 'EC2_SSH_CREDENTIALS_ID'  // EC2 SSH 자격 증명 ID
        EC2_HOST = '54.180.241.109'  // EC2 인스턴스의 퍼블릭 IP 또는 DNS

    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Dockerfile을 기반으로 이미지 빌드
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Docker Hub에 이미지 푸시
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sshagent (credentials: ['EC2_SSH_CREDENTIALS_ID']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} << 'EOF'
                        # EC2 서버에서 기존 컨테이너 종료 및 제거
                        docker-compose down || true
                        
                        # 최신 버전의 이미지를 가져와서 Docker Compose 실행
                        docker-compose pull
                        docker-compose up -d
                        EOF
                        """
                    }
                }
            }
        }
    }
}
