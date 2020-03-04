<script>
  export let headerFirstText;
  export let headerSecondText;
  export let headerThirdText;
</script>

<style>
  header {
    align-items: center;
    height: 150px;
  }
  span {
    font-family: "Oswald", sans-serif;
  }
</style>

<header class="px-3 flex flex-wrap w-full">
  <h1 class="w-full text-center font-bold ">
    <span class="text-5xl text-black-100">{headerFirstText}</span>
    <span class="text-5xl text-green-500">{headerSecondText}</span>
  </h1>
  <div class="w-full text-center text-gray-500">
    <span>{headerThirdText}</span>
  </div>
</header>
