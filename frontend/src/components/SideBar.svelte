<script>
  import { link } from "svelte-spa-router";
  import axios from "axios";
  import { CONSTANTS } from "../config/constants";
  import { readable, get, sessionInformation } from "svelte/store";
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


  const handleGoogleLogout = () => {
    window.location.reload();
   }
  const handleGoogleLogin = () => {
    var googleLoginWindow;
    var popupWidth = 500;
    var popupHeight = 500;
    var xPosition = (window.outerWidth - popupWidth) / 2;
    var yPosition = (window.outerHeight - popupHeight) / 2;
    let loginUrl = CONSTANTS.BACKEND_BASE_API + "/auth/google";

    googleLoginWindow = window.open(
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
  };
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
  #google-login-init svg {
    height: 30px;
    display: inline-block;
  }
  #google-logout-init svg {
    height: 30px;
    display: inline-block;
  }
  #google-login-init span {
      margin: 0 auto;
      line-height: 3;
    }
</style>

<!-- should be userValidSession instead userSession-->
<nav class="nav-explorer">
  <ul class="nav-element">
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
        id="google-logout-init"
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2
        px-4 border border-gray-400 rounded shadow m-1"
        on:click|preventDefault={handleGoogleLogout}>
      <svg
        version="1.1"
        id="Livello_1"
        xmlns:x="&ns_extend;"
        xmlns:i="&ns_ai;"
        xmlns:graph="&ns_graphs;"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        class="svg-google"
        viewBox="0 0 533.5 544.3"
        style="enable-background:new 0 0 533.5 544.3;"
        xml:space="preserve">
        <style type="text/css">
          .st0 {
            fill: #4285f4;
          }
          .st1 {
            fill: #34a853;
          }
          .st2 {
            fill: #fbbc04;
          }
          .st3 {
            fill: #ea4335;
          }
        </style>
        <metadata>
          <sfw xmlns="&ns_sfw;">
            <slices />
            <sliceSourceBounds
              bottomLeftOrigin="true"
              height="544.3"
              width="533.5"
              x="0.1"
              y="110.1" />
          </sfw>
        </metadata>
        <g>
          <path
            class="st0"
            d="M533.5,278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1,33.8-25.7,63.7-54.4,82.7v68h87.7
            C503.9,431.2,533.5,361.2,533.5,278.4z" />
          <path
            class="st1"
            d="M272.1,544.3c73.4,0,135.3-24.1,180.4-65.7l-87.7-68c-24.4,16.6-55.9,26-92.6,26c-71,0-131.2-47.9-152.8-112.3
            H28.9v70.1C75.1,486.3,169.2,544.3,272.1,544.3z" />
          <path
            class="st2"
            d="M119.3,324.3c-11.4-33.8-11.4-70.4,0-104.2V150H28.9c-38.6,76.9-38.6,167.5,0,244.4L119.3,324.3z" />
          <path
            class="st3"
            d="M272.1,107.7c38.8-0.6,76.3,14,104.4,40.8l0,0l77.7-77.7C405,24.6,339.7-0.8,272.1,0C169.2,0,75.1,58,28.9,150
            l90.4,70.1C140.8,155.6,201.1,107.7,272.1,107.7z" />
        </g>
      </svg>
      <span class="font-light">Sign out</span>
    </button>
      </div>
    {:else}
      <button
        id="google-login-init"
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2
        px-4 border border-gray-400 rounded shadow m-1"
        on:click|preventDefault={handleGoogleLogin}>
      <svg
        version="1.1"
        id="Livello_1"
        xmlns:x="&ns_extend;"
        xmlns:i="&ns_ai;"
        xmlns:graph="&ns_graphs;"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        class="svg-google"
        viewBox="0 0 533.5 544.3"
        style="enable-background:new 0 0 533.5 544.3;"
        xml:space="preserve">
        <style type="text/css">
          .st0 {
            fill: #4285f4;
          }
          .st1 {
            fill: #34a853;
          }
          .st2 {
            fill: #fbbc04;
          }
          .st3 {
            fill: #ea4335;
          }
        </style>
        <metadata>
          <sfw xmlns="&ns_sfw;">
            <slices />
            <sliceSourceBounds
              bottomLeftOrigin="true"
              height="544.3"
              width="533.5"
              x="0.1"
              y="110.1" />
          </sfw>
        </metadata>
        <g>
          <path
            class="st0"
            d="M533.5,278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1,33.8-25.7,63.7-54.4,82.7v68h87.7
            C503.9,431.2,533.5,361.2,533.5,278.4z" />
          <path
            class="st1"
            d="M272.1,544.3c73.4,0,135.3-24.1,180.4-65.7l-87.7-68c-24.4,16.6-55.9,26-92.6,26c-71,0-131.2-47.9-152.8-112.3
            H28.9v70.1C75.1,486.3,169.2,544.3,272.1,544.3z" />
          <path
            class="st2"
            d="M119.3,324.3c-11.4-33.8-11.4-70.4,0-104.2V150H28.9c-38.6,76.9-38.6,167.5,0,244.4L119.3,324.3z" />
          <path
            class="st3"
            d="M272.1,107.7c38.8-0.6,76.3,14,104.4,40.8l0,0l77.7-77.7C405,24.6,339.7-0.8,272.1,0C169.2,0,75.1,58,28.9,150
            l90.4,70.1C140.8,155.6,201.1,107.7,272.1,107.7z" />
        </g>
      </svg>
      <span class="font-light">Google</span>
    </button>
    {/if}
  </div>
</nav>
