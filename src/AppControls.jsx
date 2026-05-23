function AppControls({ language, setLanguage, theme, setTheme, t }) {
  return (
    <div className="app-controls" aria-label="Application settings">
      <div className="control-group">
        <span>{t.languageLabel}</span>
        <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>
          {t.english}
        </button>
        <button className={language === 'da' ? 'active' : ''} onClick={() => setLanguage('da')}>
          {t.danish}
        </button>
      </div>

      <div className="control-group">
        <span>{t.themeLabel}</span>
        <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}>
          {t.light}
        </button>
        <button className={theme === 'night' ? 'active' : ''} onClick={() => setTheme('night')}>
          {t.night}
        </button>
      </div>
    </div>
  )
}

export default AppControls
