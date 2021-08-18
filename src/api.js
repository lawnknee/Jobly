import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interaction with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Registering a new user */

  static async register(user) {
    let res = await this.request(`auth/register`, user, "post");
    return res.token;
  }

  /** Get token after login */

  static async login(username, password) {
    let res = await this.request(`auth/token`, { username, password }, "post");
    return res.token;
  }

  /** Get a user. */

  static async getUser(username) {
    let res = await this.request(`user/${username}`);
    return res.user;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies (optional search term of company name) */

  static async getCompanies(name) {
    let res;

    if(name === "") {
      res = await this.request(`companies`);
    } else {
      res = await this.request(`companies`, { name });
    }
    return res.companies
  }

  /** Get all jobs (optional search term of job title) */

  static async getJobs(title) {
    let res;

    if(title === "") {
      res = await this.request(`jobs`);
    } else {
      res = await this.request(`jobs`, { title });
    }
    return res.jobs
  }

}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;