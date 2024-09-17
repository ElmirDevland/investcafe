import React, { useContext, useMemo } from 'react';
import { ModalContext } from '../../context/ModalContext';
import './OptionGroup.scss';

const OptionGroup = () => {
  const { modalItem, optionsList, handleChange } = useContext(ModalContext);
  const { name, objKey, options } = modalItem;

  const isOptionVisible = useMemo(() => {
    const espressoOptions = name === 'Espresso' || name === 'Эспрессо';
    const showMilkOptions = name === 'Americano' || name === 'Американо';
    const showSyrupOptions = ![
      'Turkish coffee',
      'Турецкий кофе',
      'Türk qəhvəsi',
      'Espresso',
      'Эспрессо',
    ].includes(name);
    const showSugarOptions = [
      'Turkish coffee',
      'Турецкий кофе',
      'Türk qəhvəsi',
    ].includes(name);

    return (category) => {
      if (objKey === 'coffee' && category === 'milk') return showMilkOptions;
      if (
        (objKey === 'coffee' || objKey === 'icecoffee') &&
        category === 'syrup'
      )
        return showSyrupOptions;
      if (category === 'sugar') return showSugarOptions;
      if (category === 'espresso') return espressoOptions;
      return false;
    };
  }, [name, objKey]);

  return (
    <div className="option-group">
      {optionsList.map((option) => {
        const category = Object.keys(option)[0];
        const values = option[category];
        const title = option[Object.keys(option)[1]];

        if (!isOptionVisible(category)) return null;

        return (
          <div key={category} className={`${category}-selection`}>
            <h3>{title}</h3>
            <div className={`${category}-options`}>
              {values.map((item) => (
                <label key={item.value} className="radio-container">
                  <input
                    type="radio"
                    name={category}
                    value={item.value}
                    checked={options[category] === item.value}
                    onChange={() => handleChange(category, item.value)}
                  />
                  <span className="radio-checkmark"></span>
                  <span className="radio-label">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(OptionGroup);
