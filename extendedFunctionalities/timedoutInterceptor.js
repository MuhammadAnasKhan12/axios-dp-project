function alertService(url, duration) {
  console.error(`🚨 CRITICAL: ${url} took ${duration}ms`);
}

export function timeoutInterceptor(
  threshold = 2000,
  criticalThreshold = 5000
) {
  return {
    request: (config) => {
      config.metadata = { startTime: new Date() };
      return config;
    },
    response: (response) => {
      const duration = new Date() - response.config.metadata.startTime;
      const url = response.config.url;

      if (duration > threshold) {
        console.warn(`⚠️ Slow response (${duration}ms): ${url}`);
      }
      if (duration > criticalThreshold) {
        alertService(url, duration);
      }

      return response;
    },
    error: (error) => Promise.reject(error),
  };
}
