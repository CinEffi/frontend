import axios from './axiosInstance';

// 게시판 관련 API

/** 게시글 목록 조회 */
export const getPostList = (page, size = 20) =>
  axios.get(
    '/posts',
    {
      params: { page, size },
    },
    { withCredentials: false }
  );

/** 게시글 상세 조회 */
export const getPostDetail = postId => axios.get(`/posts/${postId}`);

/** 댓글 목록 조회 */
export const getComment = postId => axios.get(`/posts/${postId}/comments`);

/** 댓글 작성 */
export const postComment = (postId, comment) =>
  axios.post(`/posts/${postId}/comments`, { content: comment });

/** 게시글 작성 */
