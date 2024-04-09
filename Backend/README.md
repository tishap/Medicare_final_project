# MediCare Backend

This project provides the backend services for the MediCare platform, designed to connect patients and doctors. It's built using Next.js, a React framework, and is currently hosted on Vercel. The backend supports various CRUD operations (except deletion) to ensure platform resilience and is connected to a MongoDB database for data management.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The MediCare backend is accessible at [https://mediblockbackend.vercel.app](https://mediblockbackend.vercel.app) and offers two main routes:
- `/user` for patient-related queries and operations.
- `/doctor` for doctor-related queries and operations.

## Features

- **CRUD Operations**: Supports Create, Read, Update operations on both patient and doctor data.
- **Database**: Utilizes MongoDB for efficient data storage and retrieval.
- **Scalable and Resilient**: Designed to be robust and easily scalable to accommodate growing user data.

## Installation

To set up the server locally, follow these steps:

1. **Navigate to the backend directory**:
    ```bash
    cd Backend
    ```

2. **Install all required modules**:
    ```bash
    npm install
    ```

3. **Set up MongoDB connection**:
    - Watch this video for guidance on obtaining a MongoDB connection string: [https://youtu.be/bhiEJW5poHU?feature=shared](https://youtu.be/bhiEJW5poHU?feature=shared).
    - Set up the `.env` file using `.env.example` as a template. Rename the file by removing `.example` and enter your MongoDB connection string:
        ```plaintext
        MONGODB_URI=<Your_Connection_String>
        ```

## Usage

Once the installation is complete, you can start the server with the following command:

```bash
npm run dev
```

The server will be up and running at http://localhost:3000, ready to handle requests.
