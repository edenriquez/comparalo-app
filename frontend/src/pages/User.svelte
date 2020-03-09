<script>
  import axios from "axios";
  import { CONSTANTS } from "../config/constants";
  import { onMount, getContext } from "svelte";
  import Header from "../components/Header.svelte";
  export let headerFirstText = getContext("HeaderProps").headerFirstText;
  export let headerSecondText = getContext("HeaderProps").headerSecondText;
  export let headerThirdText = getContext("HeaderProps").headerThirdText;
  import { username } from "../store/user.js";

  let userInfo = [];
  onMount(async () => {
    axios.defaults.baseURL = CONSTANTS.BACKEND_BASE_API;
    axios.defaults.withCredentials = true;
    await axios
      .get("user/info")
      .then(async res => {
        userInfo = res.data;
        username.set(userInfo.name || userInfo.email);
      })
      .catch(async err => {
        console.log("err", err);
      });
  });
</script>

<div class="flex flex-wrap">
  <Header {headerFirstText} {headerSecondText} {headerThirdText} />
  <div class="w-full text-center">
    <h1 class="text-gray-500">
      Welcome {userInfo.username || userInfo.email}! to your profile
    </h1>
  </div>
</div>
