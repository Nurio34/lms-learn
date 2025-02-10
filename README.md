# Online Learning Platform

This project is an online learning platform similar to Udemy, where users can register either as instructors to create courses or as students to purchase and watch courses. It provides a full learning experience with user authentication, course creation, video streaming, and progress tracking.

## Features

### Authentication

-   Users can register and log in as either an instructor or student.

### Student Role

-   **Homepage**: Redirected to a personalized homepage after login.
-   **Explore Courses**: Browse a catalog of all available courses.
-   **Course Details**: Watch a free preview video and purchase the course if desired.
-   **My Courses**: View a list of purchased courses.
-   **Course Progress**:
    -   Access and watch all lectures.
    -   Track progress visually.
    -   Engage with course content by leaving, replying to, and liking comments on videos.

### Instructor Role

-   **Instructor Homepage**: Access a dashboard with a table listing the instructor's courses, the number of enrolled students, and total profit for each course.
-   **Create New Course**:
    -   Open a form to create a new course.
    -   Upload lectures, videos, and a banner image.
    -   Enter course information, including title, description, and pricing.

## Tech Stack

### Frontend

-   **React.js & Vite**: Frontend framework and build tool for a fast, modular application.
-   **react-router-dom**: For seamless navigation and routing within the app.
-   **react-player**: Customized video player for streaming lectures and previews.
-   **Tailwind CSS & daisyUI**: For responsive and styled UI components.
-   **TypeScript**: Provides type safety and improved development experience.
-   **Zod**: Schema-based validation for form and API data.
-   **Framer Motion**: Smooth animations for a polished user experience.

### Backend

-   **Express.js & Mongoose**: REST API and database modeling with MongoDB.
-   **cors**: Enables secure cross-origin resource sharing.
-   **bcryptjs**: Hashes passwords for secure storage.
-   **jsonwebtoken**: Handles user authentication with tokens.
-   **Cloudinary**: Manages media storage for course images and video content.
-   **iyzico**: Manages secure payment processing.

### Database

-   **MongoDB**: NoSQL database for storing users, courses, and progress data.

###### Live at [https://lms-learn.vercel.app](https://lms-learn.vercel.app/)

###### Server Repository at [https://github.com/Nurio34/lms-learn-server](https://github.com/Nurio34/lms-learn-server)
