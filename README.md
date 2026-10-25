
# Health Check Application - Frontend

A React-based frontend for the Health Check Application.

## Tech Stack

- **Frontend:** React, Redux
- **Backend Integration:** REST APIs

## Features

- Patient and doctor user interfaces.
- Authentication and role-based access through the backend.
- Integration with backend REST APIs.
- AI-powered functionality through the backend.

## Build and Run Locally

### Pre-Requisites

- Node.js
- npm

### 1. Clone the Repository

```bash
git clone <your-frontend-repository-url>
cd health-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Backend URL

Configure the API base URL to point to your local backend.

```text
http://localhost:8000
```

Update the API URL in the configuration or environment file used by your project.

### 4. Run the Application

```bash
npm start
```

Open the frontend at:

http://localhost:3000

### 5. Build the Application

```bash
npm run build
```

The production build is generated in the `build` directory for a standard Create React App project.


## Build and Deploy to Production

The frontend is built and deployed using **Jenkins, npm, Docker, and AWS EC2**.

### Prerequisites

- Jenkins configured with Node.js/npm and the required credentials.
- AWS EC2 instance with Docker and Docker Compose installed.
- Frontend repository cloned on the EC2 instance in `~/health-frontend`.
- `docker-compose.yml` configured in the frontend directory.

### 1. Checkout Source Code

Jenkins checks out the frontend source code from the configured Git repository.

### 2. Install Dependencies

Jenkins installs the required npm dependencies.

```bash
npm install
```

### 3. Build the Frontend

Jenkins creates an optimized production build of the React application.

```bash
npm run build
```

The generated production files are stored in the `build` directory.

### 4. Configure Environment Variables

Jenkins retrieves the SSL keystore and keystore password from Jenkins Credentials.

The pipeline creates an `.env` file containing the SSL configuration:

```env
SPRING_SSL_KEY_STORE_PASSWORD=<keystore-password>
SPRING_SSL_KEY_STORE_FILE=./ssl/keystore.p12
```

### 5. Transfer Files to EC2

Jenkins uses SCP to transfer the following files to the EC2 instance:

- React production build (`build` directory)
- `.env` configuration file
- SSL keystore (`keystore.p12`)

The keystore is stored in the `ssl` directory on the EC2 instance.

### 6. Deploy Using Docker Compose

Jenkins connects to EC2 over SSH and executes the deployment commands.

```bash
cd ~/health-frontend
git pull
docker compose down
docker compose up -d --build
```

Docker Compose rebuilds and starts the frontend container using the updated production build and configuration.

### 7. Verify Deployment

Check the status of running containers:

```bash
docker compose ps
```

[FRONTEND PRODUCTION URL](https://13.233.194.9:3000)
### Security Notes

- Store the SSL keystore and password in Jenkins Credentials.
- Do not commit `.env` files or keystores to the Git repository.
- Restrict SSH and application-port access through AWS Security Groups.
