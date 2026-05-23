import { Link } from 'react-router-dom'
import AppControls from './AppControls'
import { useAppSettings } from './appSettings'
import './App.css'

function About() {
  const { language, setLanguage, theme, setTheme, t } = useAppSettings()

  return (
    <div className="container">
      <AppControls language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} t={t} />
      <Link to="/" className="back-link">{t.backToPokedex}</Link>
      <div className="about-card">
        <p className="eyebrow">{t.assignment}</p>
        <h1>{t.aboutTitle}</h1>
        <p>{t.aboutIntro}</p>
        <ul>
          <li>{t.fetching}</li>
          <li>{t.routing}</li>
          <li>{t.styling}</li>
        </ul>
      </div>
    </div>
  )
}

export default About
