<script>
  export let results;
  export let resultShouldRender;
</script>

<style>
.skeleton-box {
  position: relative;
  overflow: hidden;
  background: rgb(247, 241, 241);
}
.skeleton-box::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transform: translateX(-100%);
          transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  -webkit-animation: shimmer 3s infinite;
          animation: shimmer 3s infinite;
  content: '';
}
@-webkit-keyframes shimmer {
  100% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
}
@keyframes shimmer {
  100% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
}

  .search-results-container {
    margin-top: -50px;
    background: rgb(247, 241, 241);
    border-radius: 15px;
  }
  .search-results {
    margin-top: 35px;
    max-height: 250px;
    overflow-y: scroll;
  }
  .result:hover,.skeleton-result-container {
    background: rgb(250, 249, 249);
    border-radius: 15px;
  }
</style>
{#if resultShouldRender}
  <div
    id="search-results"
    class="search-results-container flex flex-wrap w-full mx-20">
    <div class="search-results flex flex-col flex-grow">
      {#if results.length > 0}
        <div class=" w-full flex flex-wrap">
          <div class="w-full md:w-1/3 lg:w-full p-2">
            {#each results as result}
              <div class="result pl-4 pr-4 pt-2 mb-4 text-left relative flex-grow">
                <div class="skeleton-box w-1/6 inline-block" style="padding-top: 10%"></div>
                <div class="inline-block w-4/5">
                  <span class="block h-5 w-1/2 mx-2 my-2">{result.product_name.substring(0, 15)}</span>
                  <span class="skeleton-box block h-5 w-1/6 mx-2"></span>
                </div>
              </div>
            {/each}
            </div>
        </div>
      {:else}
    <!-- skeleton loader content -->
        <div class=" w-full flex flex-wrap">
          <div class="w-full md:w-1/3 lg:w-full p-2">
            <div class="flex flex-col flex-grow">
              {#each {length: 3} as _, i}
                <div class="skeleton-result-container pl-4 pr-4 pt-2 mb-4 text-left relative flex-grow">
                  <div class="skeleton-box w-1/6 inline-block" style="padding-top: 10%"></div>
                  <div class="inline-block w-4/5">
                    <span class="skeleton-box block h-5 w-1/2 mx-2 my-2"></span>
                    <span class="skeleton-box block h-5 w-1/6 mx-2"></span>
                  </div>
                </div>
              {/each}  
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>

{/if}
