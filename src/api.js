import axios from 'axios';
import adapter from "axios/lib/adapters/http";

axios.defaults.adapter = adapter;

export class API {
  constructor(url) {
    if (url === undefined || url === "") {
      url = process.env.REACT_APP_API_BASE_URL;
    }
    this.url = url
  }

  withPath(path) {
    if (!path.startsWith("/")) {
      path = "/" + path
    }
    return `${this.url}${path}`
  }

  getJobs() {
    return axios.get(this.withPath("api/v1/jobs" ))
    .then(r => r.data);
  }

  async storeJob(val) {
    return axios.post(this.withPath("api/v1/jobs"),{
      body: val.body,
    })
    .then(r => r.data);
  }
}

export default new API("http://localhost:8080");
