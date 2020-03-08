<script>
  import axios from "axios";
  import { CONSTANTS } from "../config/constants";
  axios.defaults.baseURL = CONSTANTS.BACKEND_BASE_API;
  axios
    .get("auth/facebook/callback")
    .then(res => {
      console.log(res);
      window.r = res;
      window.opener.parent.postMessage(res.data, "*");
    })
    .catch(err => {
      console.log(err);
    });
  window.opener.parent.posstMessage(res.data, "*");
  window.close();
</script>
