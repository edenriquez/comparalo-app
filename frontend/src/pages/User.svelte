<script>
  import axios from "axios";
  import { CONSTANTS } from "../config/constants";
  import { onMount } from "svelte";
  let userInfo = [];
  onMount(async () => {
    axios.defaults.baseURL = CONSTANTS.BACKEND_BASE_API;
    axios.defaults.withCredentials = true;
    await axios
      .get("user/info")
      .then(async res => {
        userInfo = res.data;
        console.log("USER INFO ", userInfo);
      })
      .catch(async err => {
        console.log("err", err);
      });
  });
</script>

<div>
  <h1>Welcome {userInfo.username}! to your profile</h1>
</div>
