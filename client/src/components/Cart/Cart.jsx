import axios from 'axios';
import styles from './Cart.module.scss';

import { useTranslation } from 'react-i18next';

import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { apiToken, chatId } from '../../config';

import CartItem from '../CartItem/CartItem';
import CloseBtn from '../Buttons/CloseBtn/CloseBtn';
import SubmitBtn from '../Buttons/SubmitBtn/SubmitBtn';

const Cart = ({ username }) => {
  const { cart, clearCart, closeCart, showCart } = useContext(CartContext);
  const { t } = useTranslation();
  const { firstName, lastName } = username;

  const sendMessage = () => {
    const apiUrl = `https://api.telegram.org/bot${apiToken}/sendMessage`;

    const formatOption = (key, value) =>
      `${key.charAt(0).toUpperCase() + key.slice(1)}: ${
        value.charAt(0).toUpperCase() + value.slice(1)
      }`;

    const createMessage = ({ name, quantity, options, comment, objKey }) => {
      const optionsMessage = options
        ? Object.entries(options)
            .map(([key, value]) => formatOption(key, value))
            .join('\n\n')
        : '';

      const commentMessage = comment ? `Serh: ${comment}.` : '';

      return `
Kimdən: ${firstName} ${lastName}.

${objKey.charAt(0).toUpperCase() + objKey.slice(1)}: ${name}.

Say: ${quantity}.

${optionsMessage ? `${optionsMessage}` : ''}

${commentMessage}
`.trim();
    };

    cart.forEach((item) => {
      console.log(item);
      const message = createMessage(item);

      axios.post(apiUrl, {
        chat_id: chatId,
        text: message,
      });
    });
  };

  const render = showCart ? (
    <div className={styles.cart__wrapper}>
      <div className={styles.cart}>
        <CloseBtn onClick={closeCart} />
        <h2>{t('cart.title')}</h2>
        <div className={styles.cart__items}>
          {cart.map(
            ({ category, objKey, itemKey, quantity, img, id, options }, i) => {
              let props = {
                category,
                quantity,
                img,
                id,
                name: t(`${objKey}_descriptions.${itemKey}.name`),
                options,
              };

              return <CartItem key={i} {...props} />;
            }
          )}
        </div>
        <div className={styles.cart__btns}>
          <SubmitBtn
            onClick={sendMessage}
            width="230px"
            value={t('cart.order_btn')}
          />
          <SubmitBtn
            onClick={clearCart}
            width="230px"
            value={t('cart.clear_btn')}
          />
        </div>
      </div>
    </div>
  ) : null;

  return render;
};

export default Cart;
