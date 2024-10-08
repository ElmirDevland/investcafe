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
    const userFromLocalStorage = localStorage.getItem('user');

    if (userFromLocalStorage) {
      const user = JSON.parse(userFromLocalStorage);
      setUserName(user);
      setIsLoggedIn(true);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const tableNameFromUrl = urlParams.get('tableName');

    if (tableNameFromUrl) {
      localStorage.setItem(
        'user',
        JSON.stringify({ firstName: tableNameFromUrl, lastName: '' })
      );
      const user = JSON.parse(localStorage.getItem('user'));

      setUserName(user);
      setIsLoggedIn(true);

      const url = new URL(window.location);
      url.searchParams.delete('tableName');
      window.history.replaceState({}, '', url.toString());
    }

    const handleScroll = () => {
      let current = '';

      const navigationMenu = document.querySelector('.navigation-menu');
      if (navigationMenu) {
        if (window.scrollY > 50) {
          navigationMenu.classList.add('scrolled');
        } else {
          navigationMenu.classList.remove('scrolled');
        }
      }

      sectionsRef.current.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3 - 100) {
          current = section.id;
        }
      });

      navLinksRef.current.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
          link.classList.add('active');

          const activeLink = link;
          const offsetLeft = activeLink.offsetLeft;
          const menuWidth = navigationMenu.clientWidth;
          const linkWidth = activeLink.clientWidth;

          navigationMenu.scrollTo({
            left: offsetLeft - menuWidth / 2 + linkWidth / 2,
            behavior: 'smooth',
          });
        }
      });

      setCurrentSection(current);
    };

    const debouncedHandleScroll = () => {
      let timeoutId;
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(handleScroll, 25);
      };
    };

    const handleScrollDebounced = debouncedHandleScroll();

    window.addEventListener('scroll', handleScrollDebounced);

    return () => {
      window.removeEventListener('scroll', handleScrollDebounced);
    };
  }, [currentSection]);

  const handleClick = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 30,
        behavior: 'smooth',
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
