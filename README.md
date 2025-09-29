# odewizard ✨

### A Personal Poetry Collection by Sahil Rane

Welcome to **odeWizard**, a beautifully designed web portfolio created to house a personal collection of poems. This project is a blend of creative writing and modern web development, designed to offer a seamless and immersive reading experience, inspired by the cozy feel of Goodreads.

**https://odewizard.pages.dev/**

<img width="1920" height="1991" alt="screencapture-wizardwithcodehazard-github-io-odewizard-2025-09-28-06_54_52" src="https://github.com/user-attachments/assets/017291f1-842d-4fa2-940c-ea322de44059" />

-----

## About The Project

`odewizard` is more than just a website; it's a digital sanctuary for poetry. It's a single-page application built with vanilla JavaScript, designed to dynamically load and display a collection of poems from a simple JSON file. The user interface is clean, responsive, and packed with features that make discovering and reading poetry a delight.

The project is also a fully installable **Progressive Web App (PWA)**, allowing users to add it to their home screen for an app-like experience.

-----

## Key Features

  * **Dynamic Poem Loading**: Poems are fetched asynchronously from a `poems.json` file and rendered on the page without requiring a reload.
  * **Interactive Poem Modal**: Click on any poem cover to open a beautifully styled modal that displays the full text, author, category, and date.
  * **Search Functionality**: Instantly search through all poems by title or content with the live search bar.
  * **Filter & Sort**: Organize the poetry collection by category, or sort the poems from latest to oldest.
  * **"Load More" Pagination**: The site initially displays a set number of poems and allows users to load more, ensuring fast initial load times.
  * **Fully Responsive Design**: The layout is optimized for all devices, from large desktops to small mobile phones, using modern CSS techniques like Grid and Flexbox.
  * **Progressive Web App (PWA)**: `odewizard` is installable on mobile and desktop devices for easy offline access and a native app feel.
  * **SEO Optimized**: The site includes all necessary meta tags for search engines and social media sharing, ensuring poems are discoverable.

-----

## Technologies Used

This project was built from the ground up using core web technologies:

  * **HTML5**: For the structure and semantic markup.
  * **CSS3**: For all styling, responsiveness, and the Goodreads-inspired theme.
  * **Vanilla JavaScript (ES6)**: For all the dynamic functionality, including fetching data, DOM manipulation, and event handling.

No frameworks were used, making this a lightweight and fast-loading application.

-----

## How It Works

The magic behind `odewizard` lies in its simplicity.

1.  On page load, the `PoemManager` class in `poems.js` is initialized.
2.  It sends a `fetch` request to the `poems.json` file to get the poem data.
3.  The poems are then dynamically rendered into the main grid.
4.  All event listeners for search, filter, sorting, and modals are set up, allowing for a smooth, single-page experience.

-----

## Getting Started

To get a local copy up and running, follow these simple steps.

1.  **Clone the repo**
    ```sh
    git clone https://github.com/wizardwithcodehazard/odewizard.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd odewizard
    ```
3.  **Open `index.html`** in your browser. For the best experience (to avoid any CORS issues with `fetch`), it's recommended to use a simple live server extension, like "Live Server" in VS Code.

-----

## License

Distributed under the MIT License. See `LICENSE` for more information.

-----

## Author

**Sahil Rane**

  * **GitHub**: [@wizardwithcodehazard](https://github.com/wizardwithcodehazard)
  * **LinkedIn**: [sahilrane8](https://www.linkedin.com/in/sahilrane8)
  * **Linktree**: [sahilrane](https://linktr.ee/sahilrane)
