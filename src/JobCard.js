import './JobCard.css';
import JoblyApi from './api.js';
import UserContext from "./userContext";
import React, { useContext, useState } from "react";

/** Renders Job Card
 * 
 * displays information about each job
 * 
 * Props:
 *  - job
 * 
 * Context:
 *  - UserContext
 * 
 * JobList -> JobCard
 */
export default function JobCard({ job }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [applied, setApplied] = useState(currentUser.applications.includes(job.id));

    async function apply() {
        try {
            await JoblyApi.apply(currentUser.username, job.id);
            setCurrentUser(currentUser => {
                currentUser.applications.push(job.id);
                return currentUser;
            });
            setApplied(true);
        } catch (errs) {

        }
    }

    return (
        <div className="JobCard container mb-4"style={{width: "60%"}}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{job.companyHandle}</h6>
                    <p className="card-text">Salary: {job.salary}</p>
                    <p className="card-text">Equity: {job.equity}</p>
                    {(applied)
                        ? <button className="btn btn-outline-primary" disabled={applied}>Applied</button>
                        : <button className="btn btn-primary" onClick={apply}>Apply</button>}
                </div>
            </div>
        </div>
    );
}