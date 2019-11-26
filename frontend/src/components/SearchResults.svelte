<script>
  export let results;
</script>

<style>
  .search-results-container {
    background: rgb(247, 241, 241);
    border-radius: 15px;
  }
  .search-results {
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
  class="search-results-container flex flex-wrap w-full my-4 mx-20">
  <div class="search-results w-full">
    <div class=" p-4 mx-2 my-2">
      <strong>Results</strong>
    </div>
    <hr />
    {#each results as result}
      <div class="result p-4 mx-1 my-1">
        <span>{result.product_name.substring(0, 10)}</span>
      </div>
    {/each}
  </div>
</div>
