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
    return this.instance
      .get(url, { params, ...config })
      .then(({ data }) => {
        return { data: data.data, meta: data.meta };
      })
      .catch((error) => this.errorHandling(error));
  }

  post(url, params, config = {}) {
    return this.instance
      .post(url, params, config)
      .then(({ data }) => {
        return { data: data.data, meta: data.meta };
      })
      .catch((error) => this.errorHandling(error));
  }

  delete(url, params, config = {}) {
    return this.instance
      .delete(url, config)
      .then(({ data }) => {
        return { data: data.data, meta: data.meta };
      })

      .catch(this.errorHandling);
  }

  put(url, params, config = {}) {
    return this.instance
      .put(url, params, config)
      .then(({ data }) => {
        return { data: data.data, meta: data.meta };
      })
      .catch(this.errorHandling);
  }

  errorHandling(error) {
    console.log("error", error);
  }
}

export const axiosInstance = new AxiosService();
