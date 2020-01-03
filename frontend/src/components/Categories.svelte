<script>
  // TODO: temporal hack
  let currentCategoryIndex = 0;
  const categories = [
    { name: "Electronicos" },
    { name: "Videojuegos" },
    { name: "Telefonos" }
  ];
  const innerCategories = [
    {
      name: "Audifonos",
      image: "https://picsum.photos/200",
      product_total: 10
    },
    {
      name: "Computo",
      image: "https://picsum.photos/200",
      product_total: 20
    },
    {
      name: "Tabletas",
      image: "https://picsum.photos/200",
      product_total: 33
    },
    {
      name: "Television",
      image: "https://picsum.photos/200",
      product_total: 53
    },
    {
      name: "Camaras",
      image: "https://picsum.photos/200",
      product_total: 53
    },
    {
      name: "Audifonos",
      image: "https://picsum.photos/200",
      product_total: 23
    }
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
  .category__item:hover {
    transform: scale(1.1);
    transition: all 0.1s ease-in-out;
    cursor: pointer;
  }
</style>

<div class="container mx-auto">

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

  <div class="flex flex-wrap -mx-2 overflow-hidden xl:-mx-3">
    {#each innerCategories as item}
      <div
        class="category__item my-2 px-2 w-1/2 overflow-hidden lg:w-1/3 xl:my-3
        xl:px-3 xl:w-1/5">

        <div class="bg-white text-center rounded-lg shadow-xl">
          <img
            class="my-4 h-16 w-16 rounded-full mx-auto mb-5"
            src={item.image}
            alt="" />
          <span class="text-gray-800 ">{item.name}</span>
          <p class="text-gray-400 my-1 mb-8 pb-6 font-hairline">
            {item.product_total} productos
          </p>
        </div>
      </div>
    {/each}
  </div>

</div>
