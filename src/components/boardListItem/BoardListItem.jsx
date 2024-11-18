import { Link } from 'react-router-dom';
import styles from './BoardListItem.module.css';

const BoardListItem = ({ data }) => {
  const timeStamp = data?.createdAt;
  // console.log(timeStamp);
  return (
    <div className={styles.boardListBox}>
      {data?.map((data, postId) => (
        <div key={postId} className={styles.boradItem}>
          {data.isHotPost && <div>🔥</div>}
          <div className={styles.boradContent}>
            <div className={styles.boardItemHeader}>
              <Link
                to={`/boardlist/post/${data.postId}`}
                className={styles.titleLink}
              >
                <div className={styles.itemTitle}>{data.title}</div>
              </Link>
              <div className={styles.itemContentBox}>
                <Link to={`/userInfo/${data.user.userId}`}>
                  <div className={styles.AuthorName}>
                    {`Lv.${data.user.level} ${data.user.userNickname}`}
                  </div>
                </Link>
                <div className={styles.itemGood}>👍🏻 {data.likeNumber}</div>
              </div>
            </div>
            <div className={styles.boardItemBottom}>
              {data?.tag === 0 ? (
                <></>
              ) : (
                <li className={styles.itemTagList}>
                  {data?.tag?.map((tag, index) => (
                    <Link to={`/search?query=${tag}`}>
                      <ul key={index} className={styles.itemTag}>
                        # {tag}
                      </ul>
                    </Link>
                  ))}
                </li>
              )}
              <div className={styles.itemTimeStamp}>{data.createdAt}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default BoardListItem;
