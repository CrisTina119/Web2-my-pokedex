import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import AppControls from './AppControls'
import './App.css'
import { useAppSettings } from './appSettings'

const popularPokemonNames = ['pikachu', 'charizard', 'mewtwo', 'eevee']
function App() {
  const [pokemon, setPokemon] = useState([])
  const [popularPokemon, setPopularPokemon] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('number')
  const { language, setLanguage, theme, setTheme, t } = useAppSettings()
  const limit = 20

  useEffect(() => {
    const offset = page * limit

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then(res => res.json())
      .then(async data => {
        const pokemonWithDetails = await Promise.all(
          data.results.map(async p => {
            const response = await fetch(p.url)
            return response.json()
          }),
        )

        setPokemon(pokemonWithDetails)
      })
      .catch(err => console.error('Fetch error:', err))
      .finally(() => setLoading(false))
  }, [page])

  useEffect(() => {
    Promise.all(
      popularPokemonNames.map(async name => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        return response.json()
      }),
    )
      .then(data => setPopularPokemon(data))
      .catch(err => console.error('Popular Pokemon fetch error:', err))
  }, [])

  const changePage = nextPage => {
    setLoading(true)
    setSearchTerm('')
    setPage(nextPage)
  }

  const pageTypes = useMemo(() => {
    const types = new Set()
    pokemon.forEach(p => p.types.forEach(typeInfo => types.add(typeInfo.type.name)))
    return [...types].sort()
  }, [pokemon])

  const filteredPokemon = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return pokemon
      .filter(p => {
        if (!normalizedSearch) return true

        const typeNames = p.types.map(typeInfo => typeInfo.type.name)
        return p.name.includes(normalizedSearch) || typeNames.some(typeName => typeName.includes(normalizedSearch))
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'experience') return b.base_experience - a.base_experience
        if (sortBy === 'height') return b.height - a.height
        return a.id - b.id
      })
  }, [pokemon, searchTerm, sortBy])

  const pageInsight = useMemo(() => {
    if (pokemon.length === 0) return null

    return {
      topBaseXp: pokemon.reduce((best, current) => (
        current.base_experience > best.base_experience ? current : best
      ), pokemon[0]),
      tallest: pokemon.reduce((best, current) => (
        current.height > best.height ? current : best
      ), pokemon[0]),
    }
  }, [pokemon])

  const renderPokemonCard = (p, compact = false) => (
    <article key={p.name} className={`card ${compact ? 'compact-card' : ''}`}>
      <span className="pokemon-number">#{String(p.id).padStart(3, '0')}</span>
      <div className="image-circle">
        <img src={p.sprites.other['official-artwork'].front_default || p.sprites.front_default} alt={p.name} />
      </div>
      <h3>{p.name}</h3>
      <div className="type-list">
        {p.types.map(typeInfo => {
          const typeName = typeInfo.type.name

          return (
            <span key={typeName} className={`type-pill type-${typeName}`}>
              {t.typeNames[typeName] || typeName}
            </span>
          )
        })}
      </div>
      <Link to={`/pokemon/${p.name}`} className="details-button">{t.viewDetails}</Link>
    </article>
  )

  return (
    <div className="container">
      <header className="hero">
        <div>
          <p className="eyebrow">{t.projectTag}</p>
          <h1>{t.title}</h1>
          <p className="hero-text">{t.heroText}</p>
        </div>

        <nav className="top-nav">
          <Link to="/about">{t.aboutProject}</Link>
        </nav>
      </header>

      <AppControls language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} t={t} />

      {loading ? (
        <div className="loading">{t.loadingPokemon}</div>
      ) : (
        <main className="pokedex-dashboard">
          <section className="pokedex-main">
            <div className="toolbar">
              <label>
                <span>{t.searchLabel}</span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value.toLowerCase())}
                  placeholder={t.searchPlaceholder}
                />
              </label>

              <label>
                <span>{t.sortLabel}</span>
                <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
                  <option value="number">{t.sortNumber}</option>
                  <option value="name">{t.sortName}</option>
                  <option value="experience">{t.sortExperience}</option>
                  <option value="height">{t.sortHeight}</option>
                </select>
              </label>
            </div>

            <div className="pokemon-grid">
              {filteredPokemon.map(p => renderPokemonCard(p))}
            </div>
          </section>

          <aside className="type-sidebar">
            <div className="section-heading">
              <p className="eyebrow">{t.currentPage}</p>
              <h2>{t.typeGroupsTitle}</h2>
              <p>{t.typeGroupsText}</p>
            </div>

            <div className="type-stack">
              {pageTypes.map(typeName => {
                const matchingPokemon = pokemon.filter(p => p.types.some(typeInfo => typeInfo.type.name === typeName))

                return (
                  <article key={typeName} className="type-column">
                    <h3 className={`type-heading type-${typeName}`}>
                      {t.typeNames[typeName] || typeName}
                      <span>{matchingPokemon.length}</span>
                    </h3>
                    <div className="mini-list">
                      {matchingPokemon.map(p => (
                        <Link key={p.name} to={`/pokemon/${p.name}`}>
                          <img src={p.sprites.front_default} alt={p.name} />
                          <span>{p.name}</span>
                        </Link>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </aside>
        </main>
      )}

      <div className="pagination">
        <button onClick={() => changePage(Math.max(0, page - 1))} disabled={page === 0}>
          {t.previous}
        </button>
        <span>{t.page} {page + 1}</span>
        <button onClick={() => changePage(page + 1)}>
          {t.next}
        </button>
      </div>

      {pageInsight && (
        <section className="insights-strip" aria-label={t.pageInsights}>
          <div>
            <span>{t.shownPokemon}</span>
            <strong>{pokemon.length}</strong>
          </div>
          <div>
            <span>{t.availableTypes}</span>
            <strong>{pageTypes.length}</strong>
          </div>
          <div>
            <span>{t.topBaseXp}</span>
            <strong>{pageInsight.topBaseXp.name}</strong>
          </div>
          <div>
            <span>{t.tallest}</span>
            <strong>{pageInsight.tallest.name}</strong>
          </div>
        </section>
      )}

      <section className="feature-section">
        <div className="section-heading">
          <p className="eyebrow">{t.popularTitle}</p>
          <h2>{t.popularTitle}</h2>
          <p>{t.popularText}</p>
        </div>

        <div className="popular-grid">
          {popularPokemon.map(p => (
            <article key={p.name} className="popular-card">
              <img src={p.sprites.other['official-artwork'].front_default || p.sprites.front_default} alt={p.name} />
              <div>
                <span className="pokemon-number">#{String(p.id).padStart(3, '0')}</span>
                <h3>{p.name}</h3>
                <p>{t.reason[p.name]}</p>
                <Link to={`/pokemon/${p.name}`} className="details-button">{t.viewDetails}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  )
}

export default App
