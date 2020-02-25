<script>
  import axios from "axios";
  import { CONSTANTS } from "../config/constants";
  let userInfo;
  axios.defaults.baseURL = CONSTANTS.BACKEND_BASE_API;
  axios
    .get("user/info")
    .then(async res => {
      userInfo = res;
    })
    .catch(async err => {
      console.log("err", err);
    });
</script>

<div>
  <h1>User Profile</h1>
  {userInfo}
</div>
