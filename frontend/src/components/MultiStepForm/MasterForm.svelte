<script>
  export let multiStepOptions;
  let currentStep = 0;
  import { onMount } from "svelte";
  // TODO: think about it if this is nedeed or useless
  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const setPrevButtonOpacity = () => {
    let prev = document.querySelector("#multistep-prev");
    prev.style.opacity = 1;
    if (currentStep == 0) {
      prev.style.opacity = 0.5;
    }
  };

  const setNextButtonOpacity = itemsLenght => {
    let next = document.querySelector("#multistep-next");
    next.style.opacity = 1;
    if (currentStep == itemsLenght - 1) {
      next.style.opacity = 0.5;
    }
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
    setPrevButtonOpacity();
    setNextButtonOpacity(steps.length);
  });

  const previousStep = () => {
    let steps = document.querySelectorAll(".step");
    if (currentStep - 1 > -1) {
      steps[currentStep].classList.add("step-not-active");
      currentStep -= 1;
      steps[currentStep].classList.remove("step-not-active");
    }
    setPrevButtonOpacity();
    setNextButtonOpacity(steps.length);
  };

  const nextStep = () => {
    let steps = document.querySelectorAll(".step");
    if (currentStep + 1 <= steps.length - 1) {
      steps[currentStep].classList.remove("step-is-active");
      steps[currentStep].classList.add("step-not-active");
      currentStep += 1;
      steps[currentStep].classList.remove("step-not-active");
      steps[currentStep].classList.add("step-is-active");
    }
    setPrevButtonOpacity();
    setNextButtonOpacity(steps.length);
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
    flex: 3;
    text-align: left;
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
  .separator-check-pending {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #48db71;
    padding: 11px 10px 2px;
    z-index: 10;
  }
  .separator-check-current {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    border-radius: 50%;
    background: #5e40db;
    padding: 11px 10px 2px;
    z-index: 10;
    box-shadow: 0px 1px 8px #5e40db;
  }
  .separator-check-number {
    color: white;
    margin-top: -3px;
  }
  .separator-check-number-blank {
    margin-top: -3px;
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
  .multistep-form-title {
    text-align: left;
    color: #636262;
    font-weight: bold;
  }
  .multistep-form-subtitle {
    text-align: left;
    color: rgb(223, 219, 219);
    margin-bottom: 30px;
    font-weight: lighter;
  }
</style>

<div class="multistep-master-form">
  <h1 class="multistep-form-title">{multiStepOptions.formTitle}</h1>
  <h5 class="multistep-form-subtitle">{multiStepOptions.formSubtitle}</h5>
  <form class="multistep-form">
    <div class="multistep-left-sidebar">
      {#each multiStepOptions.stepsDescription as step}
        <div class="multistep-title-side">
          <span class="name">{step.title}</span>
          <span class="subtitle">{step.subtitle}</span>
        </div>
      {/each}
    </div>
    <div class="separator">
      {#each multiStepOptions.stepsDescription as step, index}
        <div class="separator-line">
          <span class="dot" />
        </div>
        {#if currentStep === index}
          <div class="separator-check-current">
            <div class="separator-check-number">{index + 1}</div>
          </div>
        {:else if currentStep > index}
          <div class="separator-check">
            <svg viewBox="0 0 32 32" style="fill:#48DB71">
              <path d="M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z" />
            </svg>
          </div>
        {:else if currentStep < index}
          <div class="separator-check-pending">
            <div class="separator-check-number-blank">{index + 1}</div>
          </div>
        {/if}
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
