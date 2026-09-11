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