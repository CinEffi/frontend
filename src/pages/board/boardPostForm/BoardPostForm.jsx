import { useState } from 'react';
import styles from './BoardPostForm.module.css';
import X from '../../../assets/free-icon-x copy.png?react';
import Editor from '../../../components/editor/Editor';
import { Link } from 'react-router-dom';

const BoardPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState([]);

  const addTags = e => {
    const inputVal = e.target.value;
    if (
      inputVal.length !== 0 &&
      (e.key === 'Enter' ||
        e.code === 'Enter' ||
        e.key === ' ' ||
        e.code === 'Space')
    ) {
      if (!e.nativeEvent.isComposing) {
        const tagAddRegex = /^[가-힣a-zA-Z0-9]+$/; // 한글, 영문, 숫자만 허용
        const trimmedTag = inputVal.trim().replace(tagRegex, '');
        if (
          tagList.length < 30 &&
          tagAddRegex.test(trimmedTag) &&
          !tagList.includes(inputVal)
        ) {
          setTagList([...tagList, inputVal]);
          setTagItem('');
        } else {
          setTagItem('');
        }
      }
    }
  };
  const handleBlur = () => {
    setTagItem('');
  };

  const handleTagTextChange = e => {
    const value = e.target.value.replace(tagRegex, '');
    setTagItem(value);
  };

  const tagRegex = /[\s!@#$%^&*()_+\-={}\[\]|\\:;"'<>,.?/]/gi;

  const removeTags = e => {
    const indexToRemove = e.target.innerText;
    const filter = tagList.filter(tags => tags !== indexToRemove);
    setTagList(filter);
  };

  return (
    <div className={styles.boardContainer}>
      <div className={styles.headerBox}>
        <h2 className={styles.title}>글 작성하기</h2>
      </div>
      <div className={styles.titleInputBox}>
        <input
          className={styles.titleInput}
          placeholder="제목을 입력하세요."
          onChange={e => setTitle(e.target.value)}
          type="text"
          name="title"
          value={title}
        />
      </div>
      <div className={styles.editorContainer}>
        <Editor content={content} setContent={setContent} />
        <div className={styles.tagBox}>
          <ul className={styles.tagList}>
            {tagList.map((tag, index) => (
              <li
                className={styles.tag}
                key={index}
                onClick={e => removeTags(e)}
              >
                <span className={styles.tagName}>{tag}</span>
                {/* <button className={styles.tagRemoveBtn}> */}
                <img src={X} className={styles.tagRemove} />
                {/* </button> */}
              </li>
            ))}
          </ul>

          <input
            className={
              tagList.length === 0 ? styles.tagPlaceholder : styles.tagInput
            }
            onChange={handleTagTextChange}
            value={tagItem}
            onBlur={handleBlur}
            placeholder={
              tagList.length === 0
                ? '태그를 추가하세요! Enter를 치면 태그가 생성됩니다.'
                : ''
            }
            type="text"
            onKeyDown={e => {
              {
                addTags(e);
              }
            }}
          />
        </div>
        <div className={styles.btnBox}>
          <Link to={'/boardlist'}>
            <button className={styles.cancleBtn}>뒤로가기</button>
          </Link>
          <button className={styles.submitBtn}>작성 완료</button>
        </div>
      </div>
    </div>
  );
};
export default BoardPostPage;
