<script>
  import { link } from "svelte-spa-router";
  import { readable, get } from "svelte/store";
  import { username, userSession } from "../store/user.js";
</script>

<style>
  .navigator {
    position: absolute;
  }
</style>

{#if $userSession}
  <!-- should be userValidSession instead userSession-->
  <div class="navigator">
    <div>{$username}</div>
    <a href="/user/profile" use:link>profile</a>
  </div>
{/if}
