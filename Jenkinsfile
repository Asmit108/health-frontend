pipeline {
    agent any
    environment {
        SPRING_SSL_KEY_STORE_PASSWORD = credentials('keystore-password')
        SPRING_SSL_KEY_STORE_FILE = credentials('KeyStore')
    }
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
        stage('Create docker image') {
            steps {
                bat 'docker build -t health-frontend .'
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([
                        file(
                                credentialsId: 'KeyStore',
                                variable: 'SPRING_SSL_KEY_STORE_FILE'
                        ),
                        string(
                                credentialsId: 'keystore-password',
                                variable: 'SPRING_SSL_KEY_STORE_PASSWORD'
                        )]) {
                              bat 'docker run -p 3000:3000 health-frontend'
                        }
            }
        }
    }
}