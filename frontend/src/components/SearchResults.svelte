<script>
  export let results;
</script>

<style>
  .search-results-container {
    margin-top: -50px;
    background: rgb(247, 241, 241);
    border-radius: 15px;
  }
  .search-results {
    margin-top: 50px;
    max-height: 250px;
    overflow-y: scroll;
  }
  .result:hover {
    background: rgb(250, 249, 249);
    border-radius: 15px;
  }
</style>

<div
  id="search-results"
  class="search-results-container flex flex-wrap w-full mx-20">
  <div class="search-results w-full">
    {#each results as result}
      <div class="result p-4 mx-1 my-1">
        <span>{result.product_name.substring(0, 10)}</span>
      </div>
    {/each}
  </div>
</div>
