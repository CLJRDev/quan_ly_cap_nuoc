import ReactPaginate from 'react-paginate'

export default function Paginate({ pageCount, onPageChange }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Tiếp >"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="< Trước"
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageLinkClassName="page-num"
      previousLinkClassName="page-num"
      nextLinkClassName="page-num"
      activeLinkClassName="active"
    />
  );
}