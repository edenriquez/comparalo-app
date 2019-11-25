<script>
  export let results;
</script>

<style>
  .search-results-container {
    background: rgb(247, 241, 241);
    border-radius: 15px;
  }
  .search-results {
    border: 1px solid rgb(247, 241, 241);
    max-height: 250px;
    overflow-y: scroll;
  }
  .result:hover {
    background: rgb(250, 249, 249);
    border-radius: 15px;
  }
</style>

<div class="search-results-container flex flex-wrap w-full my-4 mx-20">
  <div class="search-results">
    {#each results as result}
      <div class="result p-4 mx-1 my-1">{result.product_name}</div>
    {/each}
  </div>
</div>
