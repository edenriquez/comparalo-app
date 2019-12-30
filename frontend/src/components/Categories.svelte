<script>
  // TODO: temporal hack
  let currentCategoryIndex = 0;
  const categories = [
    { name: "Electronics" },
    { name: "Computer" },
    { name: "Celphone" },
    { name: "Other" }
  ];

  const removeAllButCurrent = e => {
    const el = document.querySelectorAll(".category");
    el.forEach(current => {
      current.children[0].classList.remove("category__active");
    });
  };
  const returnSelection = () => {
    const el = document.querySelectorAll(".category");
    el[currentCategoryIndex].children[0].classList.add("category__active");
  };
</script>

<style>
  .category span {
    padding-bottom: 10px;
    transition: all 0.1s ease-out;
  }
  .category span:hover {
    border-bottom: 3px solid rgb(102, 194, 94);
  }
  .category__active {
    border-bottom: 3px solid rgb(102, 194, 94);
  }
</style>

<div class="md:flex md:flex-wrap w-full md:mb-4 my-10 ">
  {#each categories as category, index}
    <div
      on:mouseover={removeAllButCurrent}
      on:mouseleave={returnSelection}
      class="md:flex-1 sm:w-full m-10 text-center category">
      <span
        class="px-10 {index == currentCategoryIndex ? 'category__active' : ''}">
        {category.name}
      </span>
    </div>
  {/each}
</div>
