pipeline {
    agent any
    environment {
        SSL_KEYSTORE_PASSWORD = credentials('keystore-password')
        SSL_KEYSTORE_FILE = credentials('KeyStore')
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
                bat 'docker run -p 3000:3000 health-frontend'
            }
        }
    }
}