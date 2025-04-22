import { timeoutInterceptor } from "../../extendedFunctionalities/timedoutInterceptor.js";
import axios from "../../lib/axios.js";

const interceptor = timeoutInterceptor(2000, 5000);


axios.interceptors.request.use(interceptor.request);
axios.interceptors.response.use(interceptor.response, interceptor.error);

//test case
axios
  .get("https://httpstat.us/200?sleep=6000")
  .then((res) => console.log("[ExtendedTimeout]", res.data));
