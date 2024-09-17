import './DrinkList.scss';
import DrinkItem from '../DrinkItem/DrinkItem';

import { useContext } from 'react';
import { DrinksContext } from '../../context/DrinksContext';

const DrinkList = ({
  sectionsRef,
  navLinksRef,
  currentSection,
  handleClick,
}) => {
  const { drinks } = useContext(DrinksContext);

  return (
    <>
      <nav className="navigation-menu">
        <div className="container">
          <ul className="category-list">
            {drinks.map((obj, i) => {
              return (
                <li key={obj.key}>
                  <a
                    href={obj.id}
                    ref={(el) => (navLinksRef.current[i] = el)}
                    onClick={handleClick}
                    className={currentSection === obj.id ? `active-nav` : ''}
                  >
                    {obj.category}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <section id="menu" className="menu">
        <div className="container">
          {drinks.map((obj, i) => {
            return (
              <div
                id={obj.id}
                ref={(el) => (sectionsRef.current[i] = el)}
                key={obj.key}
                className="menu-category"
              >
                <h3>{obj.category}</h3>
                <div className="menu-category-items">
                  {obj.drinks.map((item) => {
                    let props = {
                      objKey: obj.key,
                      category: obj.category,
                      itemKey: item.key,
                      name: item.name,
                      descr: item.descr,
                      img: item.img,
                    };
                    return (
                      <DrinkItem
                        key={item.key}
                        {...props}
                        category={obj.category}
                        objKey={obj.key}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default DrinkList;
