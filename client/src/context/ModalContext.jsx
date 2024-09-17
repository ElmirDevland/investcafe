import { useTranslation } from 'react-i18next';
import { createContext, useState, useContext } from 'react';
import { QuantityContext } from './QuantityContext';
export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [statusError, setStatusError] = useState(null);
  const [statusOK, setStatusOK] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setQuantity } = useContext(QuantityContext);
  const { t } = useTranslation();
  const [showComments, setShowComments] = useState(false);
  const [modalItem, setModalItem] = useState({
    comment: '',
    options: {
      milk: 'none',
      sugar: 'none',
      syrup: 'none',
      espresso: 'none',
      temperature: 'none',
    },
  });
  const [openModal, setOpenModal] = useState(false);

  const showModal = (drink) => {
    document.body.style.overflow = 'hidden';
    setOpenModal(true);
    setModalItem((prev) => ({ ...drink, ...prev }));
  };

  const closeModal = () => {
    document.body.style.overflow = '';
    setOpenModal((openModal) => !openModal);
    setModalItem({
      comment: '',
      options: {
        milk: 'none',
        sugar: 'none',
        syrup: 'none',
        espresso: 'none',
        temperature: 'none',
      },
    });
    setShowComments(false);
    setQuantity(1);
  };

  const updateOptions = (options, category, value) => ({
    ...options,
    [category]: value,
  });

  const handleChange = (category, value) => {
    setModalItem((prev) => ({
      ...prev,
      options: updateOptions(prev.options, category, value),
    }));
  };

  const optionsList = [
    {
      temperature: [
        { label: t('options.temperature.room'), value: 'none' },
        { label: t('options.temperature.cold'), value: 'cold' },
      ],
      title: t('options.temperature.title'),
    },
    {
      espresso: [
        { label: t('options.espresso.none'), value: 'none' },
        { label: t('options.espresso.double'), value: 'double' },
      ],
      title: t('options.espresso.title'),
    },
    {
      milk: [
        { label: t('options.milk.none'), value: 'none' },
        { label: t('options.milk.milk'), value: 'milk' },
      ],
      title: t('options.milk.title'),
    },
    {
      syrup: [
        { label: t('options.syrup.none'), value: 'none' },
        { label: t('options.syrup.caramel'), value: 'caramel' },
        { label: t('options.syrup.vanilla'), value: 'vanilla' },
        { label: t('options.syrup.hazelnut'), value: 'hazelnut' },
        { label: t('options.syrup.chocolate'), value: 'chocolate' },
      ],
      title: t('options.syrup.title'),
    },
    {
      sugar: [
        { label: t('options.sugar.none'), value: 'none' },
        { label: t('options.sugar.medium_sugar'), value: 'medium sugar' },
        { label: t('options.sugar.sugar'), value: 'sugar' },
      ],
      title: t('options.sugar.title'),
    },
  ];

  const onErrorStatus = () => {
    setStatusError(true);
    setStatusOK(false);
    setLoading(false);
  };

  const onOkStatus = () => {
    setLoading(false);
    setStatusError(false);
    setStatusOK(true);
  };

  const statusReset = () => {
    setLoading(false);
    setStatusError(null);
    setStatusOK(null);
    closeModal();
  };

  return (
    <ModalContext.Provider
      value={{
        modalItem,
        openModal,
        optionsList,
        showComments,
        setShowComments,
        showModal,
        closeModal,
        setModalItem,
        handleChange,
        onErrorStatus,
        onOkStatus,
        statusReset,
        statusError,
        statusOK,
        loading,
        setLoading,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
