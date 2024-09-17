import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import './CartButton.scss';

import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../context/CartContext';

function CartButton() {
  const { cart, openCart } = useContext(CartContext);

  const [isShaking, setIsShaking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const total = cart.reduce((acc, item) => (acc += item.quantity), 0);

  const button =
    cart.length > 0 ? (
      <button
        onClick={openCart}
        className={`basket-button ${isShaking ? 'shake' : ''}`}
        aria-label="Показать корзину"
      >
        <FontAwesomeIcon className="basket-icon" icon={faCartShopping} />
        <span className="basket-count">{total}</span>
      </button>
    ) : null;

  return button;
}

export default CartButton;
