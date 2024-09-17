import './QtyBtn.scss';
const QtyBtn = ({ minus, plus, quantity }) => {
  return (
    <div className="quantity-selection">
      <div className="quantity-controls">
        <button onClick={minus} disabled={quantity < 2} id="decrease-quantity">
          -
        </button>
        <span>{quantity}</span>
        <button onClick={plus} id="increase-quantity">
          +
        </button>
      </div>
    </div>
  );
};

export default QtyBtn;
