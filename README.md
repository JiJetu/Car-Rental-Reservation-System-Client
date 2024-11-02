<div align="center">
  <h1>Car Rental Reservation System</h1>
</div>

---

# Car Rental Reservation System - Client

## Introduction

A user-friendly and responsive car rental reservation platform designed for customers and admins, providing a seamless experience for browsing, booking, and managing cars. The project features public pages (Home, Car Listing, Car Details, About Us, Error Page, and User Authentication), a User Dashboard for managing bookings and payments, and an Admin Dashboard for managing car listings, bookings, and user accounts, all built with React, Vite, TypeScript, Ant Design, and Redux Toolkit.

## Live Demo

Check out the live demo of the application [here](https://your-live-demo-link.com).

## Project Description

The Car Rental Reservation System aims to streamline the car rental process for users while offering robust management tools for administrators. The platform allows users to search for available cars, make reservations, and manage bookings while providing admins with tools to manage inventory and customer interactions. It mainly focus on user authentication, a booking system, an admin dashboard for managing cars and bookings, and integrated payment functionality.

## Features

- **Public Pages**: Home, Car Listing, Car Details, About Us, Error Page, and User Authentication Pages.
- **User Dashboard**: Manage personal information, booking history, and payment management.
- **Admin Dashboard**: Manage car listings, bookings, user accounts, and generate reports.
- **Responsive Design**: Fully responsive across devices (mobile, tablet, desktop).
- **User Authentication**: Sign Up, Sign In, and password recovery functionalities.
- **Payment Integration**: Secure payment gateway for processing online payments(AmarPay).
- **Theme Switcher**: Toggle between dark and light modes.

## Technology Stack

- React
- Redux Toolkit
- Ant Design
- TypeScript
- Vite
- Tailwind CSS
- Moment.js
- Recharts
- Sweetalert2
- JWT Decode

## Installation Guideline

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/JiJetu/Car-Rental-Reservation-System-Client.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Car-Rental-Reservation-System-Client
   ```

3. Install dependencies:

   ```bash
    npm install
    # or
    yarn install
   ```

### Configuration

1. Create a `.env.local` file in the root directory of the project.
2. Add necessary configuration variables in the `.env.local` file
   Example:
   ```bash
    VITE_IMAGE_HOSTING_KEY=your_imgbb_api_key_here
   ```

## Usage

1. Start the development server:

   ```bash
    npm run dev
    # or
    yarn dev
   ```

2. Navigate to http://localhost:5173 to view the application.

3. Explore the application, test the booking process, and manage user/admin functionalities.

# Image Hosting

For image uploads, the application requires an IMGBB API key. This key must be set in the `.env.local` file under the variable `VITE_IMAGE_HOSTING_KEY`. Make sure to obtain the API key from IMGBB and replace `your_imgbb_api_key_here` with your actual key.

# Clean Code and Documentation

The codebase is organized and documented for easy understanding and future maintenance. Follow the project's structure for developing new features or making modifications.

# Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.

2. Create a new branch:

   ```bash
   git checkout -b feature-branch
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Description of the feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-branch
   ```

5. Open a pull request.

# Contact

Project Maintainer: **Md Jaoadul Islam**
