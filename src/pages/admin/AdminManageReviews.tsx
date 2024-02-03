import { Fragment, useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import useAdminManage from 'hooks/useAdminManage';
import * as S from 'styles/AdminStyledTemp';
import { useGetReplies } from 'queries';
import { Loader } from 'components/shared';
import { Replies } from 'types';
const AdminManageReviews = () => {
  const { currentPage, setCurrentPage, handleNextPage } = useAdminManage();
  const { data: reviews, status, isLoading } = useGetReplies();
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  useEffect(() => {
    console.log('reviews', reviews);
  }, [reviews]);
  const toggleDetail = (id: number) => {
    if (selectedReviewId === id) {
      setSelectedReviewId(null); // 이미 선택된 아이템을 다시 클릭하면 닫힘
    } else {
      setSelectedReviewId(id); // 다른 아이템을 클릭하면 해당 아이템의 상세 정보 표시
    }
  };
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
            </S.Trow>
          </S.Theader>
          <S.Tbody>
            {status === 'success' &&
              reviews?.map((review: Replies, index: number) => {
                return (
                  <Fragment key={review.id}>
                    <S.Trow onClick={() => toggleDetail(review.id)}>
                      <S.Tcell width={30}>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
                      <S.Tcell width={50}>{review.id}</S.Tcell>
                      <S.Tcell width={100}>{review.title}</S.Tcell>
                      <S.Tcell>{review.reply2Count}</S.Tcell>
                    </S.Trow>
                    {selectedReviewId === review.id && (
                      <S.Trow>
                        <S.Tcell colSpan={4}>
                          {/* 상세 댓글 정보 렌더링, 예: review.reply2s.map(...) */}
                          {review.reply2s.map((reply2) => (
                            <div key={reply2.id}>
                              <p>{reply2.reply2}</p>
                            </div>
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
            <S.PaginationButton>
              <FaAngleLeft onClick={() => handleNextPage(currentPage - 1)} />
            </S.PaginationButton>
            <div>
              {Array.from({ length: Math.ceil(reviews?.length / 10) }, (_, index) => (
                <S.PaginationNumber key={index} onClick={() => handleNextPage(index + 1)}>
                  {index + 1}
                </S.PaginationNumber>
              ))}
            </div>
            <S.PaginationButton>
              <FaAngleRight onClick={() => handleNextPage(currentPage + 1)} />
            </S.PaginationButton>
          </S.Pagination>
        </div>
      </S.Container>
    </S.Layout>
  );
};

export default AdminManageReviews;
