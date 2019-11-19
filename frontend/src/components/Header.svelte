<script>
  export let headerFirstText;
  export let headerSecondText;
</script>

<style>
  header {
    display: flex;
    align-items: center;
    height: 150px;
  }
  span {
    font-family: "Oswald", sans-serif;
  }
</style>

<header class="px-3 w-full">
  <h1 class="text-left font-bold">
    <span class="text-5xl text-black-100">{headerFirstText}</span>
    <span class="text-5xl text-green-500">{headerSecondText}</span>
  </h1>
</header>
