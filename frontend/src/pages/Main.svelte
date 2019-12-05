<script>
  import { getContext } from 'svelte'
  import Search from "../components/Search.svelte";
  import Header from "../components/Header.svelte";
  import Categories from "../components/Categories.svelte";

  export let headerFirstText = getContext('HeaderProps').headerFirstText;
  export let headerSecondText = getContext('HeaderProps').headerSecondText;
  export let headerThirdText =getContext('HeaderProps').headerThirdText;
  export let placeholderText = getContext('HeaderProps').placeholderText;
</script>
<style>
  @import url("https://fonts.googleapis.com/css?family=Oswald&display=swap");
</style>

<div class="flex flex-wrap">
  <Header {headerFirstText} {headerSecondText} {headerThirdText} />
  <Search {placeholderText} />
  <Categories />
</div>
