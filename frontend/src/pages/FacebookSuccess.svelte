<script>
  import axios from "axios";
  import { CONSTANTS } from "../config/constants";
  import { onMount } from "svelte";
  import { username } from "../store/user.js";

  let userInfo = [];
  onMount(async () => {
    axios.defaults.baseURL = CONSTANTS.BACKEND_BASE_API;
    axios.defaults.withCredentials = true;
    await axios
      .get("user/info")
      .then(async res => {
        userInfo = res.data;
        window.opener.postMessage(userInfo, "*");
        window.close();
      })
      .catch(async err => {
        console.log("err", err);
      });
  });
</script>

<!-- SHOULD RENDER SUCCESS WINDOW... -->
<div class="flex flex-wrap">
  <div class="w-full text-center">
    <h1 class="text-gray-500">
      Welcome {userInfo.username || userInfo.email}! to your profile
    </h1>
  </div>
</div>
