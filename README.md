# Flexpod - Podcast App

Welcome to Flexpod, the podcast app!

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Components](#components)
- [API](#api)
- [Meta Tags and Favicon](#meta-tags-and-favicon)
- [License](#license)

## Features

- Browse a list of podcasts sorted alphabetically.
- View detailed information about each podcast.
- Add podcasts to your favorites.
- Filter podcasts by various criteria.
- Subscribe to a newsletter (feature in progress).
- Contact page for user inquiries.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/flexpod.git
    cd flexpod
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

    or

    ```bash
    yarn start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

- Navigate to `http://localhost:3000` to see the login page.
- After logging in, you will be redirected to the home page where you can browse podcasts.
- Use the navigation links to access different sections like Favorites, About, Contact, and Subscribe.

## Project Structure

```bash
src/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── PodcastCarousel.js
│   ├── PodcastList.js
├── context/
│   └── AuthContext.js
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Podcast.js
│   ├── Favorites.js
│   ├── Search.js
│   ├── About.js
│   ├── Contact.js
│   ├── Subscribe.js
├── App.js
├── AppRoutes.js
├── index.js
public/
├── favicon.ico
├── index.html
```

## Routes

- `/`: Login page.
- `/home`: Home page with featured podcasts.
- `/favorites`: User's favorite podcasts.
- `/podcast/:id`: Detailed view of a specific podcast.
- `/podcasts`: List of all podcasts.
- `/search`: Search page for finding podcasts.
- `/about`: About page.
- `/contact`: Contact page.
- `/subscribe`: Subscribe to the newsletter (in progress).

## Components

### Header

Displays the navigation links to different sections of the application.

### Footer

Footer section of the application.

### PodcastCarousel

Displays a carousel of featured podcasts.

### PodcastList

Displays a list of all podcasts with filters and sorting options.

### About

Provides information about the podcast platform.

### Contact

Provides contact information for user inquiries.

### Subscribe

Subscription page for the newsletter (feature in progress).

## API

The application fetches podcast data from the following API:

- **Base URL:** `https://podcast-api.netlify.app/`

## Meta Tags and Favicon

The favicon and meta tags are added in the `public/index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="description" content="Welcome to our podcast platform! We offer a variety of podcasts from different genres.">
  <meta name="keywords" content="podcasts, personal growth, comedy, journalism, history, entertainment">
  <meta name="author" content="Hasan Rizvi">
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
  <title>FlexPod</title>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>
</html>
```
