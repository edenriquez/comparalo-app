<script>
  import { link } from "svelte-spa-router";
  import Modal from "./Modal.svelte";
  export let results;
  export let resultShouldRender;
  export let isHoveringResults = false;
  import dynamics from "dynamics.js";
  import { onMount } from "svelte";
  const hoverOutHandler = () => {
    isHoveringResults = false;
  };
  const hoverHandler = () => {
    isHoveringResults = true;
  };
  const showModalHandler = () => {
    resultShouldRender = false;
    var btnOpen = document.querySelector(".js-open");
    var modal = document.querySelector(".js-modal");
    var wrap = document.querySelector(".wrap");
    var modalBackground = document.getElementById("animated-modal");
    var modalChildren = modal.children;

    function hideModal() {
      dynamics.animate(
        modal,
        {
          opacity: 0,
          translateY: 100
        },
        {
          type: dynamics.spring,
          frequency: 50,
          friction: 600,
          duration: 1500
        }
      );
    }

    function showModal() {
      // Define initial properties
      dynamics.css(wrap, {
        opacity: 0,
        scale: 0.5
      });

      // Animate to final properties
      dynamics.animate(
        wrap,
        {
          opacity: 1,
          scale: 1
        },
        {
          type: dynamics.spring,
          frequency: 300,
          friction: 400,
          duration: 1000
        }
      );
    }

    function showModalChildren() {
      // Animate each child individually
      for (var i = 0; i < modalChildren.length; i++) {
        var item = modalChildren[i];

        // Define initial properties
        dynamics.css(item, {
          opacity: 0,
          translateY: 30
        });

        // Animate to final properties
        dynamics.animate(
          item,
          {
            opacity: 1,
            translateY: 0
          },
          {
            type: dynamics.spring,
            frequency: 300,
            friction: 400,
            duration: 1000,
            delay: 100 + i * 40
          }
        );
      }
    }

    function toggleClasses() {
      document.body.style.overflowY = "hidden";
      wrap.style.display = "block";
      modalBackground.style.display = "block";
      btnOpen.classList.toggle("is-active");
      modal.classList.remove("not-active");
      modal.classList.toggle("is-active");
    }
    toggleClasses();
    showModal();
    showModalChildren();
  };
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
    content: "";
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

  .add-item {
    border-radius: 0px 0px 15px 15px;
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
  .result:hover,
  .skeleton-result-container {
    background: rgb(250, 249, 249);
    border-radius: 15px;
  }
  .result img {
    width: 50px;
    margin-top: -40px;
  }
  .btn-add {
    border-radius: 0px 0px 15px 15px;
    background: #60d49d;
  }
  .btn-add:hover {
    background: #4ab483;
  }
</style>

{#if resultShouldRender}
  <div
    on:mouseenter={hoverHandler}
    on:mouseleave={hoverOutHandler}
    id="search-results"
    class="search-results-container flex flex-wrap w-full mx-20">
    <div class="search-results flex flex-col flex-grow">
      {#if results.length > 0}
        <div class=" w-full flex flex-wrap">
          <div class="w-full md:w-1/3 lg:w-full p-2">
            {#each results as result}
              <a href="/product/{result.search_id}" use:link>
                <div
                  class="result pl-4 pr-4 pt-2 mb-4 text-left relative flex-grow">
                  <img
                    class="inline-block"
                    src={result.product_image || 'https://picsum.photos/200'}
                    alt="" />
                  <div class="inline-block w-4/5">
                    <span class="block h-5 w-1/2 mx-2 my-2">
                      {result.product_name.substring(0, 25)}
                    </span>
                    <span class="block h-5 w-1/6 mx-2 text-gray-500">
                      {result.category || 'Otro'}
                    </span>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        </div>
      {:else if results.length === 0}
        <div class=" w-full flex flex-wrap">
          <div class="w-full md:w-1/3 lg:w-full p-2">
            <div class="flex flex-col flex-grow">
              <div
                class="skeleton-result-container pl-4 pr-4 pt-2 mb-4 text-left
                relative flex-grow">
                <div
                  class="skeleton-box w-1/6 inline-block"
                  style="padding-top: 10%" />
                <div class="inline-block w-4/5">
                  <span class="skeleton-box block h-5 w-1/2 mx-2 my-2" />
                  <span class="skeleton-box block h-5 w-1/6 mx-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      {:else}
        <!-- skeleton loader content -->
        <div class=" w-full flex flex-wrap">
          <div class="w-full md:w-1/3 lg:w-full p-2">
            <div class="flex flex-col flex-grow">
              {#each { length: 3 } as _, i}
                <div
                  class="skeleton-result-container pl-4 pr-4 pt-2 mb-4 text-left
                  relative flex-grow">
                  <div
                    class="skeleton-box w-1/6 inline-block"
                    style="padding-top: 10%" />
                  <div class="inline-block w-4/5">
                    <span class="skeleton-box block h-5 w-1/2 mx-2 my-2" />
                    <span class="skeleton-box block h-5 w-1/6 mx-2" />
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>
    <div class=" w-full flex ">
      <button
        on:click={showModalHandler}
        class="js-open btn-add w-full text-white font-thin py-2 px-4 add-item ">
        <span class="font-hairline">+</span>
        Agregar nuevo
      </button>
    </div>
  </div>
{/if}
<Modal />
