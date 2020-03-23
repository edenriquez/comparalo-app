<script>
  import { link } from "svelte-spa-router";
  import { readable, get } from "svelte/store";
  import { username, userSession } from "../store/user.js";
  import Icon from "fa-svelte";
  import {
    faUserAlt,
    faBell,
    faSync,
    faCommentDollar,
    faRobot
  } from "@fortawesome/free-solid-svg-icons";
</script>

<style>
  :root {
    font-size: 16px;
    font-family: "Open Sans";
    --text-primary: #b6b6b6;
    --text-secondary: #ececec;
    --bg-primary: #2e47ae;
    --bg-secondary: #263fae;
    --transition-speed: 600ms;
  }

  .nav-explorer {
    z-index: 11;
    position: fixed;
    background-color: var(--bg-secondary);
    transition: width 600ms ease;
    overflow: scroll;
  }
  .nav-element li:first-child {
    margin-bottom: 100px;
  }
  .nav-element {
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
</nav>
<!-- {/if} -->
