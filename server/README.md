# MERN Stack Coding Challenge - Backend

This is the backend portion of the MERN Stack Coding Challenge. It provides APIs for managing transactions, fetching statistics, and generating data for charts.

## Installation

1. Clone the repository
2. Navigate to the `backend` directory
3. Install dependencies: `npm install`

## Usage

1. Start the development server: `npm run dev`
2. The server will be running at `http://localhost:5000`

## API Endpoints

- `GET /api/init`: Initialize the database with seed data
- `GET /api/transactions`: List all transactions with search and pagination
- `GET /api/statistics`: Fetch total sale amount, total sold items, and total not sold items for a given month
- `GET /api/barchart`: Fetch the price range and the number of items in each range for a given month
- `GET /api/piechart`: Fetch unique categories and the number of items from each category for a given month
- `GET /api/combined`: Fetch data from the above three APIs and combine the responses into a single JSON

## Note

You'll need to implement the actual logic for fetching data from the third-party API, seeding the database, and handling the API endpoints in the respective files.