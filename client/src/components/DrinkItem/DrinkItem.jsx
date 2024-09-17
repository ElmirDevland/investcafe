import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';

import './DrinkItem.scss';

const DrinkItem = ({ img, name, descr, id, category, objKey, itemKey }) => {
  const { showModal } = useContext(ModalContext);
  return (
    <div
      onClick={() =>
        showModal({
          category,
          name,
          img,
          descr,
          objKey,
          itemKey,
        })
      }
      className="menu-item"
      data-id={id}
    >
      <img src={img} alt="Drink" />
      <div className="menu-info">
        <h4>{name}</h4>
      </div>
    </div>
  );
};

export default DrinkItem;
