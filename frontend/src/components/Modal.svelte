<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import dynamics from "dynamics.js";
  import { Form, Step } from "./MultiStepForm";
  import { CONSTANTS } from "../config/constants";
  let productUrl,
    subscribeEmail,
    selected,
    multiStepOptions = {
      formTitle: "Nuevo Producto",
      formSubtitle: "Ingresa el producto que deseas seguir",
      stepsDescription: [
        { title: "Nuevo Producto", subtitle: "Detalla las caracteristicas" },
        { title: "Guardar", subtitle: "Envia tu producto a nuestro sistema" }
      ]
    },
    categories = [
      { id: "electronic", text: `Electronica` },
      { id: "home", text: `Hogar` },
      { id: "clothing", text: `Ropa` },
      { id: "health", text: `Salud y belleza` },
      { id: "technology", text: `Tecnologia` },
      { id: "videogames", text: `Videojuegos` },
      { id: "food", text: `Alimentos` },
      { id: "other", text: `otra` }
    ];

  const handleSubmit = () => {
    const options = {
      url: productUrl,
      category: selected.id
    };
    axios.defaults.baseURL = CONSTANTS.BACKEND_BASE_API;
    axios
      .post("jobs/product/new", options)
      .then(async res => {
        console.log("NEW PRODUCT ", res);
      })
      .catch(async err => {
        console.log("ERROR SENDING PRODUCT ", err);
      });
    productUrl = "";
    selected.id = "electronic";
    selected.text = "Electronica";
    subscribeEmail = "";
  };

  onMount(async () => {
    var btnClose = document.querySelector(".js-close");
    var modalBackground = document.getElementById("animated-modal");
    var lastBtnClose = document.querySelector(".button-close");
    window.onclick = function(event) {
      if (event.target == modalBackground) {
        modalBackground.style.display = "none";
        hideModal();
        dynamics.setTimeout(toggleClasses, 500);
      }
    };

    var modal = document.querySelector(".js-modal");
    var wrap = document.querySelector(".wrap");

    var modalChildren = modal.children;

    function hideModal() {
      modalBackground.style.display = "none";
      dynamics.animate(
        wrap,
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

    function toggleClasses() {
      document.body.style.overflowY = "scroll";
      modal.classList.remove("not-active");
      modal.classList.toggle("is-active");
      wrap.style.display = "none";
    }
    // Open nav when clicking sandwich button
    btnClose.addEventListener("click", function(e) {
      hideModal();
      dynamics.setTimeout(toggleClasses, 500);
    });
    lastBtnClose.addEventListener("click", function(e) {
      hideModal();
      dynamics.setTimeout(toggleClasses, 500);
    });
  });
</script>

<style>
  .wrap {
    overflow-y: scroll;
    top: -200%;
    position: absolute;
    z-index: 10;
    height: auto;
    display: none;
  }

  h1 {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  p {
    color: #666;
  }
  .btn-open {
    display: none;
  }
  .not-active {
    display: none;
  }
  .is-active {
    position: absolute;
    display: block;
  }
  .modal {
    background-color: #fff;
    padding: 2em 3em;
    text-align: center;
    border-radius: 0.5em;
    height: 100%;
    width: auto;
  }

  .tag-remove:before {
    padding: 10px;
    content: "x";
    color: #ccc;
    font-weight: 300;
    font-family: Arial, sans-serif;
    float: right;
    cursor: pointer;
  }

  .modal-background {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }

  #select-categories {
    height: 40px;
    border: 0px;
  }
  .right-separator,
  .left-separator {
    flex: 2;
    border-bottom: 1px solid #ccc;
    margin-bottom: 13px;
  }
  .or-separator {
    flex: 1;
    text-align: center;
  }
  .svg-facebook {
    display: inline-block;
  }
  .svg-google {
    height: 13px;
    width: 13px;
    display: inline-block;
  }
</style>

<div id="animated-modal" class="modal-background" />
<div class="wrap bg-white shadow-outline">
  <div class="tag-remove js-close" />
  <div class="modal js-modal not-active ">
    <Form {multiStepOptions}>
      <Step>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2"
              for="form-url-field">
              Url:
              <span class="text-gray-500">(requerido)</span>
            </label>
            <input
              class="appearance-none block w-full text-gray-700 rounded py-3
              px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="form-url-field"
              type="url"
              required
              data-multistep-error-message="El formato de la url es incorrecto"
              bind:value={productUrl}
              placeholder="http://example.com/iphone-x" />
          </div>
          <div class="w-full px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2"
              for="form-category-field">
              Categoria:
              <span class="text-gray-500">(requerido)</span>
            </label>
            <select
              class="block appearance-none w-full bg-white border
              border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded
              shadow leading-tight focus:outline-none focus:shadow-outline"
              name="block"
              id="select-categories"
              required
              data-multistep-error-message="Necesitas seleccionar una categoria"
              bind:value={selected}>
              {#each categories as category}
                <option value={category}>{category.text}</option>
              {/each}
            </select>
          </div>
        </div>
      </Step>
      <Step>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2"
              for="form-email-field">
              Email:
              <span class="text-gray-500">(opcional)</span>
            </label>
            <input
              class="appearance-none block w-full text-gray-700 rounded py-3
              px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="form-email-field"
              type="email"
              placeholder="Suscribete para recibir mas informacion!"
              bind:value={subscribeEmail} />
          </div>
          <div class="flex w-full px-3 mb-6 md:mb-0 my-2">
            <div class="right-separator" />
            <span class="or-separator">OR</span>
            <div class="left-separator" />
          </div>

          <div class="flex w-full px-3 mb-6 md:mb-0">
            <button
              class="w-1/2 bg-white hover:bg-gray-100 text-gray-800
              font-semibold py-2 px-4 border border-gray-400 rounded shadow m-1">
              <svg
                class="svg-facebook"
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="88.428 12.828 107.543 207.085">
                <path
                  d="M158.232
                  219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658
                  2.96-17.922
                  18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106
                  0-47.348 17.155-47.348
                  48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
                  fill="#3c5a9a" />
              </svg>
              <span class="font-light">Facebook</span>
            </button>

            <button
              class="w-1/2 bg-white hover:bg-gray-100 text-gray-800
              font-semibold py-2 px-4 border border-gray-400 rounded shadow m-1">
              <svg
                version="1.1"
                id="Livello_1"
                xmlns:x="&ns_extend;"
                xmlns:i="&ns_ai;"
                xmlns:graph="&ns_graphs;"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                class="svg-google"
                viewBox="0 0 533.5 544.3"
                style="enable-background:new 0 0 533.5 544.3;"
                xml:space="preserve">
                <style type="text/css">
                  .st0 {
                    fill: #4285f4;
                  }
                  .st1 {
                    fill: #34a853;
                  }
                  .st2 {
                    fill: #fbbc04;
                  }
                  .st3 {
                    fill: #ea4335;
                  }
                </style>
                <metadata>
                  <sfw xmlns="&ns_sfw;">
                    <slices />
                    <sliceSourceBounds
                      bottomLeftOrigin="true"
                      height="544.3"
                      width="533.5"
                      x="0.1"
                      y="110.1" />
                  </sfw>
                </metadata>
                <g>
                  <path
                    class="st0"
                    d="M533.5,278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1,33.8-25.7,63.7-54.4,82.7v68h87.7
                    C503.9,431.2,533.5,361.2,533.5,278.4z" />
                  <path
                    class="st1"
                    d="M272.1,544.3c73.4,0,135.3-24.1,180.4-65.7l-87.7-68c-24.4,16.6-55.9,26-92.6,26c-71,0-131.2-47.9-152.8-112.3
                    H28.9v70.1C75.1,486.3,169.2,544.3,272.1,544.3z" />
                  <path
                    class="st2"
                    d="M119.3,324.3c-11.4-33.8-11.4-70.4,0-104.2V150H28.9c-38.6,76.9-38.6,167.5,0,244.4L119.3,324.3z" />
                  <path
                    class="st3"
                    d="M272.1,107.7c38.8-0.6,76.3,14,104.4,40.8l0,0l77.7-77.7C405,24.6,339.7-0.8,272.1,0C169.2,0,75.1,58,28.9,150
                    l90.4,70.1C140.8,155.6,201.1,107.7,272.1,107.7z" />
                </g>
              </svg>

              <span class="font-light">Google</span>
            </button>
          </div>

          <div class="my-8 w-full px-3 mb-6 md:mb-0">
            <button
              class="button-close w-full bg-transparent hover:bg-blue-500
              text-blue-700 font-semibold hover:text-white py-2 px-4 border
              border-blue-500 hover:border-transparent rounded"
              on:click|preventDefault={handleSubmit}>
              Guardar
            </button>
          </div>
        </div>
      </Step>
    </Form>
  </div>
</div>
