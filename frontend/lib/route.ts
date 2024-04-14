// Read the value of the DEBUG environment variable
const DEBUG = process.env.DEBUG === 'true';

// Define the base URL based on the DEBUG value
export const BASE_URL = DEBUG ? 'https://ask-me-dwd5uweh6-callmemilads-projects.vercel.app' : 'http://127.0.0.1:8000';
