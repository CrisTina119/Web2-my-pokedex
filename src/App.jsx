import { useState, useEffect } from 'react'
import './App.css' 
import { Link } from 'react-router-dom'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [page, setPage] = useState(0)
  const limit = 20

  useEffect(() => {
    const offset = page * limit
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data.results)
      })
      .catch(err => console.error("Eroare la fetch:", err))
  }, [page])

  return (
    <div className="container">
      <h1>Pokedex</h1>

    <nav style={{ marginBottom: '20px' }}>
        <Link to="/about" style={{ color: '#ffcb05', textDecoration: 'none', fontWeight: 'bold' }}>
        About this project
        </Link>
    </nav>
      
      <div className="pokemon-grid">
        {pokemon.map((p, index) => {
          //  URL image - using ID from poke URL
          const id = p.url.split('/')[p.url.split('/').length - 2]
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          
          return (
            <div key={p.name} className="card">
            <img src={imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <Link to={`/pokemon/${p.name}`} className="details-button">View Details</Link>
            </div>
          )
        })}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
          Back
        </button>
        <span> Page {page + 1} </span>
        <button onClick={() => setPage(p => p + 1)}>
         Next
        </button>
      </div>
    </div>
  )
}

export default App