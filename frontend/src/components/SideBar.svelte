<script>
  import { link } from "svelte-spa-router";
  import { readable, get } from "svelte/store";
  import { username } from "../store/user.js";
</script>

<style>
  .navigator {
    position: absolute;
  }
</style>

<div class="navigator">
  <div>{$username}</div>
  {#if $username}
    <a href="/user/profile" use:link>profile</a>
  {/if}
</div>
