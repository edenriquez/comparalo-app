<script>
  import { link } from "svelte-spa-router";
  export let userSession;
</script>

<style>
  .navigator {
    position: absolute;
  }
</style>

<div class="navigator">
  {#if userSession}
    <div>Navigation</div>
    <a href="/user/profile" use:link>profile</a>
  {/if}
</div>
