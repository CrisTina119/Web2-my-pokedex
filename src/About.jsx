import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="container">
      <h1>About Pokedex</h1>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <p>This application was built to demonstrate React core concepts:</p>
        <ul>
          <li>Data fetching from PokéAPI</li>
          <li>React Router for navigation</li>
          <li>Custom CSS with Dark Mode and transitions</li>
        </ul>
        <p style={{ marginTop: '20px' }}>Created as part of Assignment 2 - WEB2 Course.</p>
        
        <Link to="/" className="details-button" style={{ marginTop: '20px', display: 'inline-block' }}>
          Back to Pokedex
        </Link>
      </div>
    </div>
  )
}

export default About