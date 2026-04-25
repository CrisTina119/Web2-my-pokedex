# React + Vite

Pokedex Project 
WEB2 Assignment 2

This project is a React-based Pokedex application that retrieves data from the PokéAPI. It was developed as part of the WEB2 course .

Live Demo: https://cristina119.github.io/Web2-my-pokedex/#/

Following the asynchronous programming principles learned in Chapter 5 (Asynchronous Programming), I implemented the data fetching using the "Fetch API and Promises" within React "useEffect" hooks. This approach ensures efficient data retrieval and state management, as practiced in the course exercises.

The project structure also follows the "Thinking in React" methodology from Chapter 6, breaking the UI into modular and reusable components.

Implemented Features
- Data Fetching: Real-time data retrieval from PokéAPI.
- Pagination: Implemented using `limit` and `offset` query parameters to navigate through the Pokémon list (20 per page).
- Client-Side Routing: Utilized `react-router-dom` with `createHashRouter` to manage navigation between the main list and the detailed view, ensuring compatibility with GitHub Pages.
- Detailed View: Clicking on a Pokémon displays specific information: images, types, height, and weight.
- Responsive Design: A custom Dark Mode UI with interactive hover effects and CSS transitions for a better user experience.


- React (Hooks: "useState", "useEffect", "useParams")
- Vite (Build tool)
- React Router (Navigation)
- CSS3 (Custom styling with Grid and Flexbox)

How to Run Locally
1. Clone the repository:
   git clone https://github.com/CrisTina119/Web2-my-pokedex

2. Install dependencies:
   npm install
   
3. Start the development server:
   npm run dev
