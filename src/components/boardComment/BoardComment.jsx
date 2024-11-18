import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './BoardComment.module.css';
import ThumbUp from '../../assets/thumb_up.png?react';
import Chat from '../../assets/chatbubble.png';
import { getComment, postComment } from '../../utils/post';
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';

const BoardComment = ({ like, postId }) => {
  const { data: data } = useQuery(
    ['comment', postId],
    () => getComment(postId),
    { keepPreviousData: true }
  );
  console.log(postId);
  const commentData = data?.data?.result?.contents;
  console.log(commentData);
  const [comment, setComment] = useState('');
  console.log(comment);

  const { mutate: submitComment } = useMutation(postComment, {
    onSuccess: () => {
      alert('댓글이 등록 되었습니다.');
      setComment('');
    },
    onError: error => {
      alert(`댓글 등록 실패! : ${error.message}`);
    },
  });
  const handleSubmit = e => {
    e.preventDefault();
    console.log(postId);
    submitComment({ postId, comment });
  };
  return (
    <div className={styles.bottomContainer}>
      <div className={styles.numBox}>
        <div className={styles.thumbUpNumBox}>
          <div>
            좋아요
            <img src={ThumbUp} className={styles.thumbUpNumIcon} />
          </div>
          <div className={styles.thumbUpNum}>{like}</div>
        </div>
        <div className={styles.commentNumBox}>
          <div>
            댓글
            <img src={Chat} className={styles.chatIcon} />
          </div>
          <div className={styles.commentNum}>{commentData?.length}</div>
        </div>
      </div>
      <div className={styles.commentContainer}>
        {commentData?.length === 0 ? (
          <span className={styles.noneComment}>
            아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </span>
        ) : (
          commentData?.map((comment, idx) => (
            <>
              <div key={comment.commentId} className={styles.commentBox}>
                <div className={styles.commentTop}>
                  <div className={styles.commentUser}>
                    <div className={styles.userLevel}>
                      Lv.{comment.user.level}
                    </div>
                    <Link to={`/userInfo/${comment.user.userId}`}>
                      {comment.user.userNickname}
                    </Link>
                    <button className={styles.commentLikeBtn}>
                      <img src={ThumbUp} className={styles.thumbUpNumIcon} />
                    </button>
                    <div className={styles.commentLikeNum}>
                      {comment.likeNumber}
                    </div>
                  </div>
                  <div className={styles.verticalDivider} />
                  <div className={styles.commentTime}>{comment.createdAt}</div>
                </div>
                {comment.content}
              </div>
              {idx !== commentData?.length - 1 && (
                <div className={styles.horizontalDivider} />
              )}
            </>
          ))
        )}
        <div className={styles.commentWriteBox}>
          <textarea
            className={styles.commentWriteInput}
            onChange={e => setComment(e.target.value)}
            value={comment}
          />
          <button className={styles.commentWriteBtn} onClick={handleSubmit}>
            작성하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default BoardComment;
