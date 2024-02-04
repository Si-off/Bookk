import { Fragment, useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import useAdminManage from 'hooks/useAdminManage';
import * as S from 'styles/AdminStyledTemp';
import { useGetReplies } from 'queries';
import styled from 'styled-components';
import { Loader } from 'components/shared';
import { Replies } from 'types';
import { IoIosArrowDropupCircle } from 'react-icons/io';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { getDateStr } from 'utils';

const AdminManageReviews = () => {
  const { currentPage, handleNextPage } = useAdminManage();
  const { data: reviews, status, isLoading } = useGetReplies();
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null); // 단일 ID로 변경

  const toggleDetail = (id: number) => {
    if (selectedReviewId === id) {
      setSelectedReviewId(null); // 이미 열린 항목을 다시 클릭하면 닫음
    } else {
      setSelectedReviewId(id); // 다른 항목을 클릭하면 해당 항목의 상세 정보 표시
    }
  };
  const reviewsPerPage = 10;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews?.slice(indexOfFirstReview, indexOfLastReview);

  if (!reviews || isLoading) {
    return <Loader />;
  }
  return (
    <S.Layout>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>댓글 목록</S.ContainerTitle>
        </S.ContainerHeader>
        <S.Table>
          <S.Theader>
            <S.Trow>
              <S.Tcolumn>No.</S.Tcolumn>
              <S.Tcolumn>ID</S.Tcolumn>
              <S.Tcolumn>책이름</S.Tcolumn>
              <S.Tcolumn>댓글수</S.Tcolumn>
              <S.Tcolumn>상세보기</S.Tcolumn>
            </S.Trow>
          </S.Theader>
          <S.Tbody>
            {status === 'success' &&
              currentReviews?.map((review: Replies, index: number) => {
                return (
                  <Fragment key={review.id}>
                    <S.Trow>
                      <S.Tcell width={30}>{indexOfFirstReview + index + 1}</S.Tcell>
                      <S.Tcell width={50}>{review.id}</S.Tcell>
                      <S.Tcell width={100}>{review.title}</S.Tcell>
                      <S.Tcell>{review.reply2Count}</S.Tcell>
                      <S.Tcell>
                        {selectedReviewId === review.id ? (
                          <IoIosArrowDropupCircle
                            size={24}
                            onClick={() => toggleDetail(review.id)}
                          />
                        ) : (
                          <IoIosArrowDropdownCircle
                            size={24}
                            onClick={() => toggleDetail(review.id)}
                          />
                        )}
                      </S.Tcell>
                    </S.Trow>
                    {selectedReviewId === review.id && (
                      <S.Trow>
                        <S.Tcell colSpan={5}>
                          {/* 상세 댓글 정보 렌더링 */}
                          {review.reply2s.map((reply2) => (
                            <Wrapper key={reply2.id}>
                              <p>ID:{reply2.id}</p>
                              <p>내용:{reply2.reply2}</p>
                              <p>작성일:{getDateStr(reply2.createdAt)}</p>
                            </Wrapper>
                          ))}
                        </S.Tcell>
                      </S.Trow>
                    )}
                  </Fragment>
                );
              })}
          </S.Tbody>
        </S.Table>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
          }}
        >
          <S.Pagination>
            <S.PaginationButton disabled={currentPage === 1}>
              <FaAngleLeft onClick={() => handleNextPage(currentPage - 1)} />
            </S.PaginationButton>
            <div>
              {Array.from({ length: Math.ceil(reviews?.length / 10) }, (_, index) => (
                <S.PaginationNumber key={index} onClick={() => handleNextPage(index + 1)}>
                  {index + 1}
                </S.PaginationNumber>
              ))}
            </div>
            <S.PaginationButton
              disabled={currentPage >= Math.ceil(reviews.length) / reviewsPerPage}
            >
              <FaAngleRight onClick={() => handleNextPage(currentPage + 1)} />
            </S.PaginationButton>
          </S.Pagination>
        </div>
      </S.Container>
    </S.Layout>
  );
};

export default AdminManageReviews;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #e9e9e9;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
`;
