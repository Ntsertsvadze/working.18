import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const {  translations, toggleLanguage } = useLanguage();

  return (
    <header style={headerStyle}>
      <h1>{translations.welcome}</h1>
      <div>
        <span>{translations.language}: </span>
        <button onClick={() => toggleLanguage('ka')} style={buttonStyle}>
          ქართული
        </button>
        <button onClick={() => toggleLanguage('en')} style={buttonStyle}>
          English
        </button>
      </div>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
  background: '#f0f0f0',
};

const buttonStyle = {
  margin: '0 5px',
  padding: '5px 10px',
};

export default Header;
