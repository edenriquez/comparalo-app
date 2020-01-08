<script>
  export let stepsDescription;
  let currentStep = 0;
  window.curr = currentStep;
  import { onMount } from "svelte";
  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  onMount(async () => {
    let steps = document.querySelectorAll(".step");
    steps.forEach((step, index) => {
      step.setAttribute("id", uuidv4());
      step.dataset.stepNumber = index;
      if (currentStep === index) {
        step.classList.remove("step-not-active");
        step.classList.add("step-is-active");
      }
    });
  });

  const previousStep = () => {
    if (currentStep - 1 > -1) {
      currentStep -= 1;
      let stepBefore = document.querySelectorAll(
        "[data-step-number='" + (currentStep + 1) + "']"
      )[0];
      let step = document.querySelectorAll(
        "[data-step-number='" + currentStep + "']"
      )[0];
      stepBefore.classList.add("step-not-active");
      step.classList.remove("step-not-active");
    }
  };
  const nextStep = () => {
    let steps = document.querySelectorAll(".step");
    let stepBefore = document.querySelectorAll(
      "[data-step-number='" + currentStep + "']"
    )[0];
    stepBefore.classList.remove("step-is-active");
    stepBefore.classList.add("step-not-active");
    if (currentStep + 1 <= steps.length - 1) {
      currentStep += 1;

      let step = document.querySelectorAll(
        "[data-step-number='" + currentStep + "']"
      )[0];

      step.classList.remove("step-not-active");
      step.classList.add("step-is-active");
    }
  };
</script>

<style>
  .name {
    color: #848383;
  }
  .subtitle {
    color: rgb(223, 219, 219);
    display: block;
  }
  .multistep-form {
    display: flex;
  }
  .separator,
  .multistep-left-sidebar {
    flex: 1;
  }
  .multistep-right-sidebar {
    flex: 6;
  }
  .multistep-continue-button {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .separator-check {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #48db71;
    padding: 11px 10px 2px;
    z-index: 10;
  }
  .separator-line {
    border-right: 2px solid #ccc;
    margin: 0 auto;
    position: relative;
    height: 40px; /* placeholder, should be displayed dynamically*/
    width: 1px;
    margin-bottom: 2px;
    margin-top: 2px;
  }
  .multistep-master-form {
    height: 100%;
  }
  #multistep-prev {
    cursor: pointer;
    margin-right: 20px;
  }
  #multistep-next {
    cursor: pointer;
    margin-left: 20px;
  }
  .dot {
    height: 8px;
    width: 8px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin-left: -3px;
    margin-top: 18px;
  }
  .multistep-title-side {
    margin-top: 40px;
    text-align: right;
  }
</style>

<div class="multistep-master-form">
  <form class="multistep-form">
    <div class="multistep-left-sidebar">
      {#each stepsDescription as step}
        <div class="multistep-title-side">
          <span class="name">{step.title}</span>
          <span class="subtitle">{step.subtitle}</span>
        </div>
      {/each}
    </div>
    <div class="separator">
      {#each stepsDescription as step}
        <div class="separator-line">
          <span class="dot" />
        </div>
        <div class="separator-check">
          <svg viewBox="0 0 32 32" style="fill:#48DB71">
            <path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z" />
          </svg>
        </div>
      {/each}
    </div>
    <!-- This slot represents StepForm  -->
    <div class="multistep-right-sidebar">
      <slot />
    </div>
    <!-- end of  StepForm  -->
    <div class="multistep-continue-button">
      <span on:click={previousStep} id="multistep-prev">prev</span>
      |
      <span on:click={nextStep} id="multistep-next">next</span>
    </div>
  </form>
</div>
<!-- <button
  class="js-finish hover:bg-green-900 py-2 px-4 rounded inline-flex items-center">
  <svg
    class="fill-current w-4 h-4 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    id="Capa_1"
    enable-background="new 0 0 465.882 465.882"
    height="512"
    viewBox="0 0 465.882 465.882"
    width="512">
    <path
      d="m465.882 0-465.882 262.059 148.887 55.143 229.643-215.29-174.674
      235.65.142.053-.174-.053v128.321l83.495-97.41 105.77 39.175z" />
  </svg>
  Enviar!
</button> -->
