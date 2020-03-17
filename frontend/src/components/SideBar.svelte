<script>
  import { link } from "svelte-spa-router";
  import { readable, get } from "svelte/store";
  import { username, userSession } from "../store/user.js";
  import Icon from "fa-svelte";
  import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";

  let icon = faUserCircle;
</script>

<style>
  :root {
    font-size: 16px;
    font-family: "Open Sans";
    --text-primary: #b6b6b6;
    --text-secondary: #ececec;
    --bg-primary: #23232e;
    --bg-secondary: #141418;
    --transition-speed: 600ms;
  }

  .navbar {
    position: fixed;
    background-color: var(--bg-primary);
    transition: width 600ms ease;
    overflow: scroll;
  }

  .navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .nav-item {
    width: 100%;
  }

  .nav-item:last-child {
    margin-top: auto;
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
    filter: grayscale(0%) opacity(1);
    background: var(--bg-secondary);
    color: var(--text-secondary);
  }

  .link-text {
    display: none;
    margin-left: 2rem;
  }

  .logo {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 1rem;
    text-align: center;
    color: var(--text-secondary);
    background: var(--bg-secondary);
    font-size: 1.5rem;
    letter-spacing: 0.3ch;
    width: 100%;
  }

  .logo-text {
    display: inline;
    position: absolute;
    left: -999px;
    transition: var(--transition-speed);
  }

  /* Small screens */
  @media only screen and (max-width: 600px) {
    .navbar {
      bottom: 0;
      width: 100vw;
      height: 5rem;
    }

    .logo {
      display: none;
    }

    .navbar-nav {
      flex-direction: row;
    }

    .nav-link {
      justify-content: center;
    }
  }

  /* Large screens */
  @media only screen and (min-width: 600px) {
    .navbar {
      top: 0;
      width: 5rem;
      height: 100vh;
    }

    .navbar:hover {
      width: 16rem;
    }

    .navbar:hover .link-text {
      display: inline;
    }

    .navbar:hover .logo-text {
      left: 0px;
    }
  }

  .dark {
    --text-primary: #b6b6b6;
    --text-secondary: #ececec;
    --bg-primary: #23232e;
    --bg-secondary: #141418;
  }

  .light {
    --text-primary: #1f1f1f;
    --text-secondary: #000000;
    --bg-primary: #ffffff;
    --bg-secondary: #e4e4e4;
  }

  .solar {
    --text-primary: #576e75;
    --text-secondary: #35535c;
    --bg-primary: #fdf6e3;
    --bg-secondary: #f5e5b8;
  }
</style>

{#if $userSession}
  <!-- should be userValidSession instead userSession-->
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="logo">
        <a class="nav-link mx-6" href="/user/profile" use:link>
          <Icon
            icon={faUserCircle}
            class="svg-inline--fa fa-space-station-moon-alt fa-w-16 fa-5x" />
          <span class="link-text logo-text">Profile</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="/" class="nav-link" use:link>
          <Icon
            icon={faUserCircle}
            class="mx-6 svg-inline--fa fa-space-station-moon-alt fa-w-16 fa-5x" />
          <span class="link-text">Home</span>
        </a>
      </li>
    </ul>

  </nav>
{/if}
