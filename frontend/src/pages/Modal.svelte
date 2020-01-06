<script>
  import { onMount } from "svelte";
  import dynamics from "dynamics.js";

  onMount(async () => {
    var btnClose = document.querySelector(".js-close");
    var btnFinish = document.querySelector(".js-finish");
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

    btnFinish.addEventListener("click", function(e) {
      hideModal();
      dynamics.setTimeout(toggleClasses, 500);
    });
  });
</script>

<style>
  .wrap {
    top: -150%;
    position: absolute;
    z-index: 10;
    width: 60vw;
    height: 60vh;
    display: none;
  }
  .modal-image {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #48db71;
    padding: 11px 10px 2px;
    margin-bottom: 2em;
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
    background-color: #000;
    border: none;
    padding: 0.5em 1em;
    color: #fff;
    box-shadow: 0 0 0 2px #000 inset;
    border-radius: 0.25em;
    cursor: pointer;
    transition: background 0.4s ease, color 0.4s ease;
  }
  button:hover {
    box-shadow: 0 0 0 2px #000 inset;
    color: #000;
    background-color: transparent;
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
    width: 100%;
  }
  .modal-input {
    height: 50px;
    outline: none;
    border: none;
    background: rgb(247, 241, 241);
    color: gray;
    padding: 0 80px 0 20px;
    border-radius: 10px;

    transition: all 0.2s;
    opacity: 0;
    z-index: 5;
    font-weight: bolder;
    letter-spacing: 0.1em;
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

<div class="wrap shadow-lg">
  <div class="tag-remove js-close" />
  <div class="modal js-modal not-active">
    <!-- <div class="modal-image">
       <svg viewBox="0 0 32 32" style="fill:#48DB71">
        <path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z" />
      </svg> 
    </div> -->

    <h1>No encontraste lo que estabas buscando?</h1>
    <p>A countinuacion ingresa la URL del producto que quieres seguir!</p>
    <input
      class="modal-input my-10"
      type="text"
      placeholder="Url del producto" />
    <button class="js-finish">Terminar</button>
  </div>
</div>
