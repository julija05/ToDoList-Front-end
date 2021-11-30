import axios from "axios";

const BASE_PATH = `${process.env.REACT_APP_API_HOST}`;
export const TOKEN = "token";

class AxiosService {
  instance = axios.create({
    baseURL: BASE_PATH,
  });

  constructor() {
    this.instance.interceptors.request.use((request) => {
      const currentToken = localStorage.getItem("token");
      request.headers["Authorization"] = `Bearer ${currentToken}`;

      return request;
    });
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {}
    );
  }

  get(url, params, config = {}) {
    config.validateStatus = () => true;
    return this.instance
      .get(url, { params, ...config })
      .then((res) => {
        return res.data;
      })
      .catch((error) => this.errorHandling(error));
  }

  post(url, params, config = {}) {
    config.validateStatus = () => true;
    return this.instance
      .post(url, params, config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => this.errorHandling(error));
  }

  delete(url, params, config = {}) {
    config.validateStatus = () => true;
    return this.instance
      .delete(url, config)
      .then((res) => {
        return res.data;
      })
      .catch(this.errorHandling);
  }

  put(url, params, config = {}) {
    config.validateStatus = () => true;
    return this.instance
      .put(url, params, config)
      .then((res) => {
        return res.data;
      })
      .catch(this.errorHandling);
  }

  errorHandling(error) {
    console.log("error", error);
  }
}

export const axiosInstance = new AxiosService();
