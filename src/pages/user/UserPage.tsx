import { Fragment, useState } from 'react';
import { styled } from 'styled-components';
import { getStyledColor } from 'utils';
import Book from '../../components/user/Book';
import { useInfinityScroll } from 'queries';
import { Stars, Stars2, Stars3 } from 'styles/StarParticles';
import { CustomModal } from 'components/modal/CustomModal';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Dropdown from 'components/shared/Dropdown';
import Loader from 'components/shared/Loader';
import * as S from 'styles/SearchStyled';
import { useSearchStore } from 'store/useSearchStore';

const UserPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchState, setSearchState] = useState('');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [order, setOrder] = useState<'DESC' | 'ASC' | 'CLICKS' | 'LIKECOUNT'>('DESC');

  const { search, setSearch } = useSearchStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfinityScroll(
    order,
    search,
  );
  const targetRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(e.target.value);
  };

  const onKeyPressSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(searchState);
    }
  };
  const onClickSearch = () => {
    if (!searchState) return alert('검색어를 입력해주세요');
    setSearch(searchState);
  };
  const onClickReset = () => {
    setSearch('');
    setSearchState('');
  };

  const unshowScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  const showScroll = () => {
    document.body.style.overflow = 'unset';
  };
  const findSelectedBook = () => {
    return data?.pages.flatMap((page) => page?.data).find((book) => book?.id === selectedBookId);
  };
  const selectedBook = findSelectedBook();
  const handleClick = (id: number) => {
    setModalOpen(true);
    unshowScroll();
    setSelectedBookId(id); // 선택된 책의 ID를 상태에 저장
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (status === 'loading')
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );

  return (
    <Main>
      <S.WrapperSearch>
        <S.Search>
          <S.SearchInput
            placeholder="검색어를 입력하세요"
            value={searchState}
            onChange={onChangeSearch}
            onKeyDown={onKeyPressSearch}
          />
          <S.SearchButton onClick={onClickSearch}>검색</S.SearchButton>
          <S.ResetButton onClick={onClickReset}>초기화</S.ResetButton>
        </S.Search>
        <Dropdown order={order} setOrder={setOrder} />
      </S.WrapperSearch>

      <Stars />
      <Stars2 />
      <Stars3 />
      <Layout>
        <TotheTop onClick={scrollToTop}>Top</TotheTop>
        {status === 'success' &&
          data?.pages.map((page) =>
            page?.data.map((book, index) => {
              if (page.data.length - 1 === index) {
                return (
                  <Fragment key={book.id}>
                    <Book ref={targetRef} {...book} onClick={() => handleClick(book.id)} />
                    {modalOpen && (
                      <CustomModal
                        bookId={selectedBookId}
                        book={selectedBook}
                        setModalOpen={setModalOpen}
                        showScroll={showScroll}
                      ></CustomModal>
                    )}
                  </Fragment>
                );
              }
              return <Book key={book.id} {...book} onClick={() => handleClick(book.id)} />;
            }),
          )}
      </Layout>
    </Main>
  );
};

export default UserPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10%;
  position: relative;
`;

const Layout = styled.div`
  width: 1200px;
  background-color: ${getStyledColor('background', 'dark')};
  display: grid;
  grid-gap: 5px;
  grid-auto-flow: dense;
  grid-auto-rows: minmax(500px, auto);
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`;

const TotheTop = styled.button`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 200;
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: #000;
  color: #fff;
  border: 2px solid rgb(210, 204, 193);
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &:hover {
    color: #017374;
    border: 2px solid #017374;
  }
`;
