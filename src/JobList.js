import JobCard from "./JobCard";
import ReactPaginate from "react-paginate";
import React, { useState } from "react";

/** Renders list of JobCards
 *
 * Props:
 *  - jobs
 *
 * { JobsContainer, CompanyDetails } -> JobList -> JobCard
 */

// number of jobs to display on each page
const PER_PAGE = 10;

export default function JobList({ jobs, page, setPage }) {
  // const [currentPage, setCurrentPage] = useState(0);

  const offset = page * PER_PAGE;
  const pageCount = Math.ceil(jobs.length / PER_PAGE);

  const currentPageJobs = jobs.slice(offset, offset + PER_PAGE);

  console.log("Jobs", currentPageJobs, offset, pageCount);

  function handlePageClick({ selected: selectedPage }) {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  }

  return (
    <div className="JobList">
      {currentPageJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      <ReactPaginate
        forcePage={page}
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
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
