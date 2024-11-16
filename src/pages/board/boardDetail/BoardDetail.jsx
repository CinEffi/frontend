import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Back from '../../../assets/back_icon.png?react';
import ThumbUp from '../../../assets/thumb_up.png?react';
import Visibility from '../../../assets/visibility.png?react';
import Share from '../../../assets/share.png?react';
import styles from './BoardDetail.module.css';
import BoardComment from '../../../components/boardComment/BoardComment';
import { useQuery } from 'react-query';
import { getPostDetail } from '../../../utils/post';

const BoardDetailPage = () => {
  const { postId } = useParams();
  const { data: data } = useQuery(
    ['post', postId],
    () => getPostDetail(postId),
    { keepPreviousData: true }
  );
  const postData = data?.data?.result;
  console.log(postData);

  return (
    <div className={styles.boardContainer}>
      <div className={styles.headerBox}>
        <h2 className={styles.title}>게시판</h2>
        <Link to={'/boardlist'}>
          <button className={styles.listBtn}>
            <img src={Back} className={styles.backBtn} alt="backBtnImg" />
            목록으로
          </button>
        </Link>
      </div>
      <div className={styles.postContainer}>
        <div className={styles.postBox}>
          <div className={styles.postHeaderContainer}>
            <div className={styles.leftHeaderBox}>
              <h4 className={styles.postAuthor}>
                Lv.{postData?.user?.level} {postData?.user?.userNickname}
              </h4>
              <div className={styles.postVisibility}>
                <img
                  src={Visibility}
                  alt="VisibilityIcon"
                  className={styles.visitIcon}
                />
                조회 수 {postData?.view}
              </div>
              <div className={styles.timeStamp}>{postData?.createdAt}</div>
            </div>
            <div className={styles.rigthHeaderBox}>
              <img src={ThumbUp} className={styles.thumbUpIcon} />
              <img src={Share} className={styles.shareIcon} />
            </div>
          </div>
          {/* content */}
          <h2>{postData?.title}</h2>
          <span className={styles.content}>{postData?.content}</span>
          {/* 태그 */}
          {postData?.tag === 0 ? (
            <></>
          ) : (
            <li className={styles.itemTagList}>
              {postData?.tag?.map((tag, index) => (
                <Link to={`/search?query=${tag}`}>
                  <ul key={index} className={styles.itemTag}>
                    # {tag}
                  </ul>
                </Link>
              ))}
            </li>
          )}
        </div>

        <BoardComment like={postData?.likeNumber} postId={postId} />
      </div>
    </div>
  );
};
export default BoardDetailPage;
