import { useGetBooks } from "pages/admin/dev2/queries";
import { styled } from "styled-components";
import Book from "./Book";

const BookList = () => {
  const { data: books, status } = useGetBooks();

  return (
    <S.Container>
      <S.List>
        {status === "success" &&
          books.map((book) => <Book key={book.id} {...book} />)}
      </S.List>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    overflow: hidden;
    z-index: 1;
    width: 800px;
  `,

  List: styled.ul`
    display: flex;
    overflow-x: scroll;
  `,
};

export default BookList;
