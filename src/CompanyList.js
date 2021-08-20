import CompanyCard from "./CompanyCard";
import ReactPaginate from "react-paginate";
import React, { useState } from "react";
import "./CompanyList.css"


/** Renders list of companies
 *
 * Props:
 *  - companies
 *
 * CompaniesContainer -> CompanyList -> CompanyCard
 */

// number of companies to display on each page
const PER_PAGE = 10;

export default function CompanyList({ companies, page, setPage }) {
  // const [currentPage, setCurrentPage] = useState(page);

  
  const offset = page * PER_PAGE;
  const pageCount = Math.ceil(companies.length / PER_PAGE);
  
  const currentPageCompanies = companies.slice(offset, offset + PER_PAGE);
  
  console.log("Companies", currentPageCompanies, offset, pageCount);

  function handlePageClick({ selected: selectedPage }) {
    setPage(selectedPage);
    window.scrollTo(0,0);
  }

  return (
    <div className="CompanyList">
      {currentPageCompanies.map(company => (
        <CompanyCard key={company.handle} company={company} />
      ))}
      <ReactPaginate
        forcePage={page}
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={10}
        onPageChange={handlePageClick}
        containerClassName={"pagination pagination-md"}
        activeClassName={"page-item active"}
        activeLinkClassName={"page-link"}
        disabledClassName={"page-item disabled"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
      />
    </div>
  );
}
