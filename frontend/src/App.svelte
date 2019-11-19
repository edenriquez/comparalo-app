<script>
  import Search from "./components/Search.svelte";
  import Header from "./components/Header.svelte";
  export let headerFirstText;
  export let headerSecondText;
  export let placeholderText;
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Oswald&display=swap");

  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>

<div class="flex flex-wrap">
  <Header {headerFirstText} {headerSecondText} />
  <Search {placeholderText} />
</div>
