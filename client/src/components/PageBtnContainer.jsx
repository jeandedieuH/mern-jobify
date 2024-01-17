import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../context/AllJobsContext";
const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageNumber = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageNumber(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const buttons = [];

    buttons.push(
      addPageButton({
        pageNumber: 1,
        activeClass: currentPage === 1,
      })
    );

    if (currentPage > 3) {
      buttons.push(
        <span className="page-btn dots" key="dots-1">
          ....
        </span>
      );
    }

    // Current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      buttons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    // Add the dots after the current page if there are more than 3 pages
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      buttons.push(
        addPageButton({ pageNumber: currentPage + 1, activeClass: false })
      );
    }

    if (currentPage < numOfPages - 2) {
      buttons.push(
        <span className="page-btn dots" key="dots+1">
          ....
        </span>
      );
    }

    // Add the last page button
    buttons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );

    return buttons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageNumber(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageNumber(nextPage);
        }}
      >
        {" "}
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
