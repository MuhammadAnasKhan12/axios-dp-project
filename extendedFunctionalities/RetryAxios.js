import axios from "../lib/axios.js";

export default class RetryAxios {
  constructor(retries = 3, retryStatuses = [500, 502, 503, 504, 404]) {
    this.retries = retries;
    this.retryStatuses = retryStatuses;
    this.axiosInstance = axios.create();

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;

        // If no config or not a retryable status, reject
        if (
          !config ||
          !error.response ||
          !this.retryStatuses.includes(error.response.status)
        ) {
          return Promise.reject(error);
        }

        // Retry logic
        config.__retryCount = config.__retryCount || 0;
        if (config.__retryCount >= this.retries) {
          return Promise.reject(error);
        }

        config.__retryCount += 1;
        console.warn(
          `🔁 Retrying [${config.__retryCount}/${this.retries}] for ${config.url}`
        );
        return this.axiosInstance(config);
      }
    );
  }

  getInstance() {
    return this.axiosInstance;
  }
}

