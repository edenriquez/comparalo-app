<script>
  import axios from "axios";
  import { CONSTANTS } from "../config/constants";
  axios.defaults.baseURL = CONSTANTS.BACKEND_BASE_API;
  axios
    .get("auth/facebook/callback")
    .then(async res => {
      // TODO: handle sucess resposne
      console.log("success", res);
      alert("success");
    })
    .catch(async err => {
      // TODO: handle error response
      console.log("err", err);
      alert("error");
    });
  window.close();
</script>
