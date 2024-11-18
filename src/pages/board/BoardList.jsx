import React, { useState } from 'react';
import styles from './BoardList.module.css';
import ListItem from '../../components/boardListItem/BoardListItem';
import { Link } from 'react-router-dom';
import { getPostList } from '../../utils/post';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

// const hotPostData = [
//   {
//     id: 6,
//     title: '데드풀에 대하여',
//     date: '2024-04-01 17:00',
//     tag: ['시빌워', '데드풀'],
//     good: 12,
//     hot: true,
//     authorName: 'Eeee',
//   },
// ];
// const data = [
//   {
//     id: 1,
//     title: '데드풀에 대하여',
//     date: '2024-04-01 17:00',
//     tag: ['시빌워', '데드풀'],
//     good: 12,
//     hot: false,
//     authorName: '꼴뚜기기기긱',
//   },
//   ,
//   {
//     id: 2,
//     title:
//       '데드풀에 대하여ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ드풀에 대하여',
//     date: '2024-04-01 17:00',
//     tag: ['시빌워', '데드풀'],
//     good: 120,
//     hot: false,
//     authorName: '꼴뚜기기기긱',
//   },
//   ,
//   {
//     id: 3,
//     title: '데드풀에 대하여',
//     date: '2024-04-01 17:00',
//     tag: ['시빌워', '데드풀'],
//     good: 12,
//     hot: false,
//     authorName: 'Eeee',
//   },
// ];

const BoardListPage = () => {
  const [page, setPage] = useState(0);
  const { data: data } = useQuery(['posts', { page }], () => getPostList(), {
    keepPreviousData: true,
  });

  console.log(data?.data?.result?.contents);
  const postsList = data?.data?.result?.contents;

  return (
    <div className={styles.boardContainer}>
      <div className={styles.headerBox}>
        <h2 className={styles.title}>게시판</h2>
        <Link to="/board-post">
          <button className={styles.createBtn}> 글 작성하기</button>
        </Link>
      </div>
      <div className={styles.hotPostContainer}>
        {/* <ListItem data={hotPostData} /> */}
      </div>

      <ListItem data={postsList} />
      {page === 0 ? (
        <></>
      ) : (
        <div className={styles.pagenation}> {`< ${page} >`}</div>
      )}
    </div>
  );
};
export default BoardListPage;
