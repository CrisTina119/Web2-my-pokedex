import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AppControls from '../AppControls'
import { useAppSettings } from '../appSettings'
import '../App.css'

function PokemonDetails() {
  const { name } = useParams()
  const [details, setDetails] = useState(null)
  const { language, setLanguage, theme, setTheme, t } = useAppSettings()

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setDetails(data))
  }, [name])

  if (!details) return <div className="container"><div className="loading">{t.loadingPokemon}</div></div>

  return (
    <div className="container">
      <AppControls language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} t={t} />

      <Link to="/" className="back-link">{t.backToList}</Link>

      <div className="details-layout">
        <section className="details-art">
          <span className="pokemon-number">#{String(details.id).padStart(3, '0')}</span>
          <img
            src={details.sprites.other['official-artwork'].front_default || details.sprites.front_default}
            alt={details.name}
          />
        </section>

        <section className="details-panel">
          <p className="eyebrow">{t.detailsTag}</p>
          <h1>{details.name}</h1>

          <div className="type-list details-types">
            {details.types.map(typeInfo => (
              <span key={typeInfo.type.name} className={`type-pill type-${typeInfo.type.name}`}>
                {t.typeNames[typeInfo.type.name] || typeInfo.type.name}
              </span>
            ))}
          </div>

          <div className="stats-grid">
            <div>
              <span>{t.height}</span>
              <strong>{details.height / 10} m</strong>
            </div>
            <div>
              <span>{t.weight}</span>
              <strong>{details.weight / 10} kg</strong>
            </div>
            <div>
              <span>{t.baseXp}</span>
              <strong>{details.base_experience}</strong>
            </div>
          </div>

          <h2>{t.abilities}</h2>
          <ul className="ability-list">
            {details.abilities.map(a => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default PokemonDetails
