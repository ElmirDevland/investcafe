import { useState, useEffect, useRef } from 'react';
import './App.scss';
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import DrinkList from './components/DrinkList/DrinkList';
import DrinkItemModal from './components/DrinkItemModal/DrinkItemModal';
import Footer from './components/Footer/Footer';
import { DrinksProvider } from './context/DrinksContext';
import { ModalProvider } from './context/ModalContext';
import { QuantityProvider } from './context/QuantityContext';
import AboutUs from './components/AboutUs/AboutUs';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState('');
  const [currentSection, setCurrentSection] = useState('');
  const sectionsRef = useRef([]);
  const navLinksRef = useRef([]);

  useEffect(() => {
    const fetchUser = () => {
      const userFromLocalStorage = localStorage.getItem('user');
      if (userFromLocalStorage) {
        const user = JSON.parse(userFromLocalStorage);
        setUserName(user);
        setIsLoggedIn(true);
      }
    };

    fetchUser();

    const urlParams = new URLSearchParams(window.location.search);
    const tableNameFromUrl = urlParams.get('tableName');

    if (tableNameFromUrl) {
      localStorage.setItem(
        'user',
        JSON.stringify({ firstName: tableNameFromUrl, lastName: '' })
      );
      setIsLoggedIn(true);
      const url = new URL(window.location);
      url.searchParams.delete('tableName');
      window.history.replaceState({}, '', url.toString());
    }

    const handleScroll = () => {
      let current = '';

      const navigationMenu = document.querySelector('.navigation-menu');
      if (navigationMenu) {
        navigationMenu.classList.toggle('scrolled', window.scrollY > 50);
      }

      sectionsRef.current.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3 - 100) {
          current = section.id;
        }
      });

      navLinksRef.current.forEach((link) => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${current}`
        );
      });

      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (event) => {
    const targetId = event.target.getAttribute('href');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 30,
      });
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName(JSON.parse(localStorage.getItem('user')));
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <DrinksProvider>
      <QuantityProvider>
        <ModalProvider>
          <Header setIsLoggedIn={setIsLoggedIn} username={username} />
          <Hero />
          <DrinkList
            sectionsRef={sectionsRef}
            navLinksRef={navLinksRef}
            currentSection={currentSection}
            handleClick={handleClick}
          />
          <DrinkItemModal username={username} />
          <AboutUs />
          <Footer />
        </ModalProvider>
      </QuantityProvider>
    </DrinksProvider>
  );
}

export default App;
