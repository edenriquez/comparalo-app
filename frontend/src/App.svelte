<script>
  import Search from "./components/Search.svelte";
  import Header from "./components/Header.svelte";
  export let headerText;
  export let placeholderText;
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>

<Header {headerText} />
<Search {placeholderText} />
