import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // 🧠 i18n hook
import './SiteSettings.css';

const SiteSettings = () => {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation(); // i18n instance

  const togglePanel = () => setOpen(!open);

  const handleLangChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang); // 🔁 change language
    localStorage.setItem('lang', lang); // 💾 persist selection
  };

  const handleThemeChange = (e) => {
    document.documentElement.style.setProperty('--theme-color', e.target.value);
  };

  const handleFontChange = (e) => {
    document.body.style.fontFamily = e.target.value;
  };

  return (
    <div className="site-settings">
      <button className="settings-toggle" onClick={togglePanel}>⚙️</button>

      {open && (
        <div className="settings-panel">
          <label>
            🌐 Language:
            <select onChange={handleLangChange} value={i18n.language}>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="bn">বাংলা</option>
            </select>
          </label>

          <label>
            🎨 Theme:
            <input type="color" onChange={handleThemeChange} />
          </label>

          <label>
            🔤 Font:
            <select onChange={handleFontChange}>
              <option value="Arial">Arial</option>
              <option value="'Segoe UI'">Segoe UI</option>
              <option value="'Comic Sans MS'">Comic Sans</option>
              <option value="'Courier New'">Courier</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
};

export default SiteSettings;
