import './SubmitBtn.scss';
const SubmitBtn = ({ value, width = '160px', onClick }) => {
  return (
    <button onClick={onClick} className="order-button" style={{ width: width }}>
      {value}
    </button>
  );
};

export default SubmitBtn;
