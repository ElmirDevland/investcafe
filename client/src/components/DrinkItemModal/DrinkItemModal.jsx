import axios from 'axios';

import { apiToken, chatId } from '../../config';

import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect, useCallback, useContext } from 'react';

import './DrinkItemModal.scss';
import '../../OrderBtn.scss';

import { ModalContext } from '../../context/ModalContext';
import { QuantityContext } from '../../context/QuantityContext';

import OptionGroup from '../OptionGroup/OptionGroup';
import CloseBtn from '../Buttons/CloseBtn/CloseBtn';
import QtyBtn from '../Buttons/QtyBtn/QtyBtn';
import Spinner from '../Spinner/Spinner';
import ResponseStatus from '../ResponseStatus/ResponseStatus';

const DrinkItemModal = ({ username }) => {
  const {
    openModal,
    modalItem,
    closeModal,
    setModalItem,
    setShowComments,
    showComments,
    statusError,
    statusOK,
    onErrorStatus,
    onOkStatus,
    statusReset,
    loading,
    setLoading,
  } = useContext(ModalContext);

  const { quantity, quantityHandler } = useContext(QuantityContext);

  const { firstName, lastName } = username;
  const { t } = useTranslation();

  const modalRef = useRef(null);
  const commentRef = useRef(null);

  const [timerID, setTimerID] = useState(null);

  useEffect(() => {
    return () => {
      if (timerID) {
        clearTimeout(timerID);
      }
    };
  }, [timerID]);

  useEffect(() => {
    if (openModal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [openModal]);

  useEffect(() => {
    if (showComments && commentRef.current) {
      commentRef.current.focus();
    }
  }, [showComments]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  const sendMessage = useCallback(() => {
    const apiUrl = `https://api.telegram.org/bot${apiToken}/sendMessage`;
    const username = firstName + ' ' + lastName;

    const formatOption = (key, value) =>
      `${key.charAt(0).toUpperCase() + key.slice(1)}: ${
        value.charAt(0).toUpperCase() + value.slice(1)
      }`;

    const createMessage = ({ name, options, comment, objKey }) => {
      const optionsMessage = Object.entries(options)
        .filter(([key, value]) => value !== 'none')
        .map(([key, value]) => formatOption(key, value))
        .join('\n\n');

      const commentMessage = comment ? `Serh: ${comment}.` : '';

      return `
Kimdən: ${username.trim()}.

${objKey.charAt(0).toUpperCase() + objKey.slice(1)}: ${name}.

Say: ${quantity}.

${optionsMessage}

${commentMessage}
`.trim();
    };

    const message = createMessage(modalItem);

    setLoading(true);
    axios
      .post(apiUrl, {
        chat_id: chatId,
        text: message,
      })
      .then(() => {
        onOkStatus();
      })
      .catch(() => {
        onErrorStatus();
      })
      .finally(() => {
        setLoading(false);
        const id = setTimeout(() => {
          statusReset();
        }, 2000);
        setTimerID(id);
      });

    axios.post('http://localhost:5000/drinks', {
      name: modalItem.name,
      quantity: quantity,
    });
  }, [
    modalItem,
    firstName,
    lastName,
    quantity,
    setLoading,
    onOkStatus,
    onErrorStatus,
    statusReset,
  ]);

  const sendAndCloseModal = useCallback(() => {
    sendMessage();
  }, [sendMessage]);

  const handleClickOutside = (e) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  const handleCommentChange = (e) => {
    setModalItem((prev) => ({
      ...prev,
      comment: e.target.value,
    }));
  };

  const settings = {
    styles: {
      backgroundColor: statusError ? 'red' : 'rgb(0, 170, 0)',
      borderColor: statusError ? 'red' : 'rgb(0, 170, 0)',
    },
    value: statusError ? t('responseMessage.error') : t('responseMessage.ok'),
  };

  const responseMessage =
    statusError || statusOK ? <ResponseStatus settings={settings} /> : null;
  const modalContent =
    !statusOK && !statusError ? (
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {loading && <Spinner />}
        <CloseBtn onClick={closeModal} />
        <div className="modal-main">
          <div className="modal-header">
            <div className="modal-image">
              <img src={modalItem.img} alt="Drink" />
            </div>
            <div className="modal-info">
              <h2>{modalItem.name}</h2>
              <p>{modalItem.descr}</p>
            </div>
          </div>
          <div className="modal-body">
            <OptionGroup />
          </div>
        </div>
        <div className="modal-footer">
          <QtyBtn
            quantity={quantity}
            minus={() => quantityHandler(-1)}
            plus={() => quantityHandler(1)}
          />
          {showComments ? (
            <textarea
              ref={commentRef}
              id="comment"
              onChange={handleCommentChange}
              placeholder={t('modal.add_comment')}
            />
          ) : (
            <button
              onClick={() => setShowComments(true)}
              className="comment-button"
            >
              {t('modal.add_comment')}
            </button>
          )}
          <button onClick={sendAndCloseModal} className="order-button">
            {t('cart.order_btn')}
          </button>
        </div>
      </div>
    ) : null;

  return (
    openModal && (
      <div
        id="modal"
        className="modal"
        tabIndex="0"
        ref={modalRef}
        onClick={handleClickOutside}
        onKeyDown={handleKeyDown}
      >
        {responseMessage}
        {modalContent}
      </div>
    )
  );
};

export default DrinkItemModal;
