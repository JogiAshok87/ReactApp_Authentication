

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const requiredEnvVariables = ['MONGODB_URL', 'PORT', 'SECRET_KEY']; 

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Error: Missing required environment variable: ${key}`);
    process.exit(1); // Exit process with failure
  }
});

console.log('Environment variables loaded successfully');
