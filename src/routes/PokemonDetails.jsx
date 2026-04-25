import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function PokemonDetails() {
  const { name } = useParams() 
  const [details, setDetails] = useState(null)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setDetails(data))
  }, [name])

  if (!details) return <div className="container">Loading...</div>

  return (
    <div className="container">
      <Link to="/" style={{ color: '#646cff' }}>← Back to list</Link>
      <h1>{details.name}</h1>
      <img 
        src={details.sprites.other['official-artwork'].front_default} 
        alt={details.name} 
        style={{ width: '250px' }}
      />
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <p><strong>Height:</strong> {details.height / 10} m</p>
        <p><strong>Weight:</strong> {details.weight / 10} kg</p>
        <p><strong>Types:</strong> {details.types.map(t => t.type.name).join(', ')}</p>
      </div>
    </div>
  )
}

export default PokemonDetails