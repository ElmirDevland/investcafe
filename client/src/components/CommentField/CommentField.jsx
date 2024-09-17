import styles from './CommentField.module.scss';

const CommentField = ({ comment, handleSetComment }) => {
  return (
    <div className={styles.comment__field}>
      <textarea
        id="comment"
        className={styles.comment__input}
        value={comment}
        onChange={handleSetComment}
        placeholder={'Sifarişinizə şərh yazın'}
        rows={4}
        cols={50}
      />
    </div>
  );
};

export default CommentField;
