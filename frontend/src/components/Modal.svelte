<script>
  import { onMount } from "svelte";
  import dynamics from "dynamics.js";
  import { Form, Step } from "./MultiStepForm";
  let stepsDescription = [
    { title: "Step One", subtitle: "subtitle" },
    { title: "Step Two", subtitle: "subtitle" }
  ];
  onMount(async () => {
    var btnClose = document.querySelector(".js-close");

    var modal = document.querySelector(".js-modal");
    var wrap = document.querySelector(".wrap");

    var modalChildren = modal.children;

    function hideModal() {
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
      modal.classList.remove("not-active");
      modal.classList.toggle("is-active");
      wrap.style.display = "none";
    }
    // Open nav when clicking sandwich button
    btnClose.addEventListener("click", function(e) {
      hideModal();
      dynamics.setTimeout(toggleClasses, 500);
    });
  });
</script>

<style>
  .wrap {
    overflow-y: scroll;
    top: -150%;
    position: absolute;
    z-index: 10;
    width: 60vw;
    height: 60vh;
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
  button {
    font-size: 1.25em;
    font-weight: bold;
    border: none;
    padding: 0.5em 1em;
    color: #fff;
    border-radius: 0.25em;
    cursor: pointer;
    transition: background 0.4s ease, color 0.4s ease;
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
</style>

<div class="wrap bg-white shadow-lg">
  <div class="tag-remove js-close" />
  <div class="modal js-modal not-active ">
    <!-- <div class="modal-image">
       <svg viewBox="0 0 32 32" style="fill:#48DB71">
        <path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z" />
      </svg> 
    </div> -->
    <Form {stepsDescription}>
      <Step>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2"
              for="grid-first-name">
              Nombre del producto
            </label>
            <input
              class="appearance-none block w-full text-gray-700 rounded py-3
              px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Nike Air" />
          </div>
        </div>
      </Step>
      <Step>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs
              font-bold mb-2"
              for="grid-second-name">
              Nombre del producto
            </label>
            <input
              class="appearance-none block w-full text-gray-700 rounded py-3
              px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-second-name"
              type="text"
              placeholder="Nike Air" />
          </div>
        </div>
      </Step>
    </Form>
  </div>
</div>
