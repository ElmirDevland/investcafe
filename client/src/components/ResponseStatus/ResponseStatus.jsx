import './ResponseStatus.scss';

const ResponseStatus = ({ settings }) => {
  const { styles, value } = settings;
  return (
    <div style={styles} className="status">
      <h1>{value}</h1>
    </div>
  );
};

export default ResponseStatus;
