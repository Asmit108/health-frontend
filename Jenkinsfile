pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Deploy Frontend') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ec2-ssh-key',
                        keyFileVariable: 'SSH_KEY',
                    )
                ]) {

                    bat '''
                        scp -i "%SSH_KEY%" -o StrictHostKeyChecking=no -r build ubuntu@13.204.66.133:~/health-frontend/

                        ssh -i "%SSH_KEY%" -o StrictHostKeyChecking=no ubuntu@13.204.66.133 "cd ~/health-frontend && git pull && docker compose down && docker compose up -d --build"
                    '''
                }
            }
        }
    }
}
                