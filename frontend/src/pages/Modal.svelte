<script>
  import { onMount } from "svelte";
  import dynamics from "dynamics.js";

  onMount(async () => {
    var btnClose = document.querySelector(".js-close");
    var modal = document.querySelector(".js-modal");
    var wrap = document.querySelector(".wrap");

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
    left: 26%;
    position: absolute;
    z-index: 10;
    margin: auto;
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
    margin-bottom: 2em;
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
  }
</style>

<div class="wrap">
  <div class="modal js-modal not-active">
    <div class="modal-image">
      <svg viewBox="0 0 32 32" style="fill:#48DB71">
        <path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z" />
      </svg>
    </div>
    <h1>Nice job!</h1>
    <p>To dismiss click the button below</p>
    <button class="js-close">Dismiss</button>
  </div>
</div>
