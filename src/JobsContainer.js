import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import JoblyApi from "./api";
import SearchBar from "./SearchBar";
import JobList from './JobList';
import './JobsContainer.css'
import UserContext from "./userContext";
import Loading from "./Loading";
import debounce from 'lodash.debounce';


/** JobsContainer renders JobList and SearchBar.
 * 
 *  On first mount, renders a list of all current jobs.
 *  Can search through jobs by title.
 * 
 *  Inaccessible if not logged in.

 *  State:
 *      - isLoading
 *      - jobs
 *      - searchTerm
 * 
 *  Context:
 *      - UserContext
 * 
 * JobsContainer -> { JobList, SearchBar }
 */

export default function JobsContainer() {
    const { currentUser } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState('All');
    const [page, setPage] = useState(0);

    useEffect(function getJobs() {
        search(searchTerm.trim());
    }, [searchTerm]);

    async function search(term) {
        setPage(0);
        setSearchTerm(term);
        const jobs = await JoblyApi.getJobs(term);
        setJobs(jobs);
        setIsLoading(false);
    }

    // async function searchApplied(term) {
    //     setSearchTerm(term);
    //     const jobs = await JoblyApi.getJobs(term);
    //     setJobs(jobs.filter(job => currentUser.applications.includes(job.id)));
    //     setIsLoading(false);
    // }

    // async function searchUnapplied(term) {
    //     setSearchTerm(term);
    //     const jobs = await JoblyApi.getJobs(term);
    //     setJobs(jobs.filter(job => !(currentUser.applications.includes(job.id))));
    //     setIsLoading(false);
    // }

    const debouncedSearch = debounce(search, 500);
    // const debouncedSearchApplied = searchApplied;
    // const debouncedSearchUnapplied = searchUnapplied;

    if (!currentUser) {
        return <Redirect to="/" />
    } 

    if (isLoading) return <Loading />

    let jobsForDisplay = jobs;

    if (filter === 'Applied') {
        jobsForDisplay = jobs.filter(job => currentUser.applications.includes(job.id))
    } else if (filter === 'Unapplied') {
        jobsForDisplay = jobs.filter(job => !(currentUser.applications.includes(job.id)))
    }

    return (
        <div className="JobsContainer container">
            <SearchBar 
                search={debouncedSearch} 
                initialTerm={searchTerm} 
                isJobs={true} 
                // searchApplied={debouncedSearchApplied}
                // searchUnapplied={debouncedSearchUnapplied}
                filter={filter}
                setFilter={setFilter}/>
            <JobList jobs={jobsForDisplay} page={page} setPage={setPage}/>         
        </div>
    )
}