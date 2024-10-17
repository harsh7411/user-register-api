# user-register-api
User Registration API with MongoDB, Image Upload, and Email Sending

# Node.js Project Initializer 
npm init -y

# Requirements
node - 20.18.0
npm - 10.8.2
mongodb - 8.0.1

# Package installation
npm install

# configuration
1.rename the env.example to .env
2.Insert SMTP details correctly accroding to you

# Run the server
npm start

# API Endpoints
1.Register - http://localhost:4000/api/register  
.POST Method
.Request Body - 

multipart/form-data
name: User Name,
  email: user@example.com,
  password: yourpassword,
  profilePicture: file

.Description: Register a new user with name, email, password and profilePicture. Sends a verification email upon successful registration.

2.verifyEmail - http://localhost:4000/api/verify-email  GET
.GET Method
.Query parameter - token
.Description: Verify the user's email using a token received in the registration email.

# Validation
joi validation
.Description: to validate name, email, password with specific format.



# File Upload
.This API uses multer for handling file uploads, allowing users to upload profile pictures during registration.
.File size should not more than 5 mb and it should be jpeg/jpg/png
