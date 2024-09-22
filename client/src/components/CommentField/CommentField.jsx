import { useTranslation } from 'react-i18next';

import styles from './CommentField.module.scss';

const CommentField = ({ comment, handleCommentChange, commentRef }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.comment__field}>
      <textarea
        ref={commentRef}
        id="comment"
        className={styles.comment__input}
        value={comment}
        onChange={handleCommentChange}
        placeholder={t('modal.comment_text_area')}
      />
    </div>
  );
};

export default CommentField;
