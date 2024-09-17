import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';

import './CartItem.scss';

const CartItem = ({ name, img, id, quantity, options }) => {
  const { removeFromCart, updateCartItem } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  const keys = Object.keys(options);

  const values = Object.values(options)
    .map((item, i) => {
      return (item = t(`options.${keys[i]}.${Object.values(options)[i]}`));
    })
    .join(' , ');

  return (
    <div className="cart-item">
      <div className="item-img">
        <img src={img} alt="drink" />
      </div>
      <div>
        <div>{name}</div>
        <p>{values}</p>
        <div className="item-btns">
          <div className="quantity-control">
            <button
              onClick={() => updateCartItem({ name, quantity }, -1)}
              disabled={quantity < 2}
              id="decrease-quantity"
            >
              -
            </button>
            <div>{quantity}</div>
            <button
              onClick={() => updateCartItem({ name, quantity }, 1)}
              id="increase-quantity"
            >
              +
            </button>
          </div>
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => removeFromCart(id)}
            style={{
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
            }}
          >
            <FontAwesomeIcon
              bounce={isHovered}
              icon={faTrashCan}
              style={{
                color: 'red',
                width: '35px',
                height: '35px',
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
