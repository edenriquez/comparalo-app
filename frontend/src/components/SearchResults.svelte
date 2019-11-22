<script>
  export let results;
</script>

<style>

</style>

<div class="flex flex-wrap w-full">
  {#each results as result}
    <div>{result.product_name}</div>
  {/each}
</div>
