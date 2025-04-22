import RetryAxios from "../../extendedFunctionalities/RetryAxios.js";


// const retryAxios = new RetryAxios(2).getInstance();
const retryAxios = new RetryAxios(2).getInstance();




retryAxios
  .get("https://jsonplaceholder.typicode.com/invalid-url")
  .then((res) => console.log("[RetryAxios]", res.data))
  .catch((err) => console.error("❌ Final Error:", err.message));
