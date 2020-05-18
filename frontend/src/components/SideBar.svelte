<script>
  import { link } from "svelte-spa-router";
  import axios from "axios";
  import { CONSTANTS } from "../config/constants";
  import { readable, get } from "svelte/store";
  import { onMount } from "svelte";
  import {
    username,
    userSession,
    userProfilePicture,
    userProducts,
    userId
  } from "../store/user.js";
  import Icon from "fa-svelte";
  import {
    faUserAlt,
    faBell,
    faSync,
    faCommentDollar,
    faRobot,
    faUser,
    faHeart,
    faShare
  } from "@fortawesome/free-solid-svg-icons";
  const search = () => {
    // onMount(async () => {
    axios
      .get(`${CONSTANTS.BACKEND_BASE_API}/user/products/${$userId}`)
      .then(response => {
        userProducts.set(response.data);
      })
      .catch(console.warn);
  };
  // });
</script>

<style>
  :root {
    font-size: 16px;
    font-family: "Open Sans";
    --text-primary: #b6b6b6;
    --text-secondary: #ececec;
    --bg-primary: #2e47ae;
    --bg-secondary: #263fae;
    --transition-speed: 200ms;
  }

  .nav-explorer {
    z-index: 11;
    position: fixed;
    background-color: var(--bg-secondary);
    transition: width 600ms ease;
    overflow: hidden;
  }
  .nav-element li:first-child {
    margin-bottom: 100px;
  }
  .nav-element {
    float: left;
    background: var(--bg-primary);
    max-width: 5em;
    height: 100vh;
  }

  .nav-link {
    display: flex;
    align-items: center;
    height: 5rem;
    color: var(--text-primary);
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: var(--transition-speed);
  }
  .nav-link:hover {
    color: #fff;
  }

  .active {
    color: #fff;
  }

  /* Small screens */
  @media only screen and (max-width: 600px) {
    .nav-explorer {
      bottom: 0;
      width: 100vw;
      height: 5rem;
    }

    .nav-link {
      justify-content: center;
    }
  }

  /* Large screens */
  @media only screen and (min-width: 600px) {
    .nav-explorer {
      top: 0;
      width: 5rem;
      height: 102vh;
    }

    .nav-explorer:hover {
      width: 20rem;
    }
  }
  .quick-profile {
    display: inline-block;
    color: #fff;
    font-size: 51px;
    border: 1px dashed;
    border-radius: 50%;
    margin-top: 70px;
    padding: 10px;
    margin-left: 25%;
  }
  .quick-profile img {
    border-radius: 50%;
    width: 100px;
  }

  .inner-sidebar {
    margin-left: 20%;
  }

  .quick-items > .item {
    background: #f1f1f1;
  }

  .score-separator {
    border-right: 1px solid #ccc;
    margin: 0 auto;
    position: relative;
    width: 1px;
    margin-bottom: 2px;
    margin-top: 2px;
  }
</style>

<!-- {#if $userSession} -->
<!-- should be userValidSession instead userSession-->
<nav class="nav-explorer">
  <ul class="nav-element">
    <li>
      <a class="nav-link active mx-6" href="/" use:link>
        <Icon
          icon={faCommentDollar}
          class="svg-inline--fa fa-space-station-moon-alt fa-w-16 fa-5x" />
      </a>
    </li>
    <li>
      <a class="nav-link active mx-6" href="/user/profile" use:link>
        <Icon
          icon={faUserAlt}
          class="svg-inline--fa fa-space-station-moon-alt fa-w-16 fa-5x" />
      </a>
    </li>
    <li>
      <a class="nav-link mx-6" href="/user/notifications" use:link>
        <Icon
          icon={faBell}
          class="svg-inline--fa fa-space-station-moon-alt fa-w-16 fa-5x" />
      </a>
    </li>
    <li>
      <a class="nav-link mx-6" href="/user/sync" use:link>
        <Icon
          icon={faSync}
          class="svg-inline--fa fa-space-station-moon-alt fa-w-16 fa-5x" />
      </a>
    </li>
    <li>
      <a class="nav-link mx-6" href="/user/bot" use:link>
        <Icon
          icon={faRobot}
          class="svg-inline--fa fa-space-station-moon-alt fa-w-16 fa-5x" />
      </a>
    </li>
  </ul>
  <div class="inner-sidebar">
    <ul>
      <li>
        <div class="quick-profile">
          <img src={$userProfilePicture.photo} alt="" />
        </div>
        <h1 class="text-center text-white">{$username}</h1>
      </li>
      <li>
        <h1 class="w-full text-center text-lg text-white mt-10">Puntuacion</h1>
        <div class="mb-4 mt-10 text-white flex w-full">
          <div class="w-1/2 text-center ">
            <span>140</span>
            <Icon icon={faHeart} class="fa-w-16 fa-5x" />
          </div>
          <div class="score-separator" />
          <div class="w-1/2 text-center ">
            <span>10</span>
            <Icon icon={faShare} class="fa-w-16 fa-5x" />
          </div>
        </div>
      </li>
      <li>
        <div class="quick-items">
          <h1 class="text-center text-lg text-white mt-10">
            Agregados recientemente
          </h1>
          <button class="btn bg-white" on:click={search}>
            Get products 🤖
          </button>
          {#each $userProducts as product}
            <div class="item md:flex rounded-lg m-6 p-4 shadow-lg">
              <img
                alt=""
                class="h-16 w-16 rounded-full mx-auto md:mx-0 md:mr-3"
                src={product.img || 'https://i.ya-webdesign.com/images/abstract-neon-cube-png-1.png'} />
              <div class="text-center md:text-left">
                <h2 class="text-md">{product.name.slice(0, 10)}</h2>
                <div class="text-sm text-gray-700">
                  {product.vendor || 'amazon.com'}
                </div>
                <div class="text-sm text-gray-600">{product.status}</div>
                <div class="text-sm text-gray-600">{product.category}</div>
              </div>
            </div>
          {/each}
        </div>
      </li>
    </ul>
  </div>
</nav>
<!-- {/if} -->
