# Raven

Raven is a web application designed to share files between devices. Built with **Next.js**, **TypeScript**, it integrates AWS S3 for file storage and provides a seamless user experience.

## Features
- Room-based file sharing system
- Secure authentication
- Supports **Docker** for easy deployment

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (>= 18.x)
- [Docker](https://www.docker.com/get-started) (optional for containerized setup)

## Getting Started
### **1. Clone the Repository**
```sh
git clone https://github.com/iyush05/raven-file-share.git
cd raven
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the root directory and set the necessary environment variables:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=you_aws_server_region
AWS_BUCKET_NAME=your_bucket_name
```
Modify values according to your setup.


### **5. Start the Development Server**
```sh
npm run dev
```
The server should now be running at `http://localhost:3000`.

---
## Running with Docker
If you prefer running Raven using Docker, follow these steps:

### **1. Build the Docker Image**
```sh
docker build -t raven .
```

### **2. Run the Container**
```sh
docker run -p 3000:3000 --env-file .env raven
```
This will start the application on `http://localhost:3000`.

---
## Contributing
Feel free to open issues or submit pull requests to improve **Raven**!

## License
[MIT](LICENSE)

