<script>
  import { getContext } from "svelte";
  import Search from "../components/Search.svelte";
  import Header from "../components/Header.svelte";
  import SideBar from "../components/SideBar.svelte";
  import Categories from "../components/Categories.svelte";

  export let headerFirstText = getContext("HeaderProps").headerFirstText;
  export let headerSecondText = getContext("HeaderProps").headerSecondText;
  export let headerThirdText = getContext("HeaderProps").headerThirdText;
  export let placeholderText = getContext("HeaderProps").placeholderText;
</script>

<style>

</style>

<div class="flex flex-wrap">
  <Header {headerFirstText} {headerSecondText} {headerThirdText} />
  <Search {placeholderText} />
  <SideBar />
  <Categories />
</div>
