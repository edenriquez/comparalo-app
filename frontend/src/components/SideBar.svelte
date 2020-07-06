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
  function facebookLogout() {
    console.log("LOGOUT");
  }
  function facebookLogin() {
    var facebookLoginWindow;
    var popupWidth = 500;
    var popupHeight = 500;
    var xPosition = (window.outerWidth - popupWidth) / 2;
    var yPosition = (window.outerHeight - popupHeight) / 2;
    let loginUrl = CONSTANTS.BACKEND_BASE_API + "/auth/facebook";

    facebookLoginWindow = window.open(
      loginUrl,
      "LoginWindow",
      `location=1,scrollbars=1,width=${popupWidth},height=${popupWidth},left=${xPosition},top=${yPosition}`
    );

    window.onmessage = function(e) {
      if (e.data) {
        const usernameOrEmail = e.data.username || e.data.email;
        username.set(usernameOrEmail);
        userId.set(e.data.user_id);
        userSession.set(1);
        userProfilePicture.set({ photo: e.data.photo });
      } else {
        console.log("Error ", e);
      }
    };
  }
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
  .sign-in button {
    width: 220px;
    margin-left: 20px;
    margin-top: 20px;
  }

  .sign-in svg {
    display: inline-block;
  }

  .sign-in {
    margin-top: 10px;
    width: 250px;
  }

  .sign-out {
    margin-top: auto;
  }
  .sign-out button {
    width: 200px;
    margin-left: 20px;
    margin-bottom: 25px;
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
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .inner-sidebar ul {
    margin: 0;
    width: 250px;
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
    {#if $userSession}
      <ul>
        <li>
          <div class="quick-profile">
            <img src={$userProfilePicture.photo} alt="" />
          </div>
          <h1 class="text-center text-white">{$username}</h1>
        </li>
        <li>
          <h1 class="w-full text-center text-lg text-white mt-10">
            Puntuacion
          </h1>
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
              <a href="/product/{product.id}" use:link>
                <div
                  class=" bg-white item md:flex rounded-lg m-6 p-4 shadow-lg">
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
              </a>
            {/each}
          </div>
        </li>
      </ul>
      <div class="sign-out">
        <button
          class="w-1/2 bg-black hover:bg-whtie-100 text-white font-semibold py-2
          px-4 border border-gray-400 rounded shadow m-1"
          on:click|preventDefault={facebookLogout}>
          <svg
            class="svg-facebook"
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="88.428 12.828 107.543 207.085">
            <path
              d="M158.232
              219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658
              2.96-17.922
              18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106
              0-47.348 17.155-47.348
              48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
              fill="#3c5a9a" />
          </svg>
          <span class="font-light">sign out</span>
        </button>
      </div>
    {:else}
      <div class="sign-in">
        <h2 class="text-center text-white">Sign in</h2>
        <button
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2
          px-4 border border-gray-400 rounded shadow m-1"
          on:click|preventDefault={facebookLogin}>
          <svg
            class="svg-facebook"
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="88.428 12.828 107.543 207.085">
            <path
              d="M158.232
              219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658
              2.96-17.922
              18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106
              0-47.348 17.155-47.348
              48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"
              fill="#3c5a9a" />
          </svg>
          <span class="font-light">Facebook</span>
        </button>
      </div>
    {/if}
  </div>
</nav>
