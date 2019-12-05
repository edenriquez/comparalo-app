<script>
  import { setContext } from 'svelte'
  import Router from 'svelte-spa-router';
  import {routes} from './routes.js'

  export let headerProps;
  setContext('HeaderProps', headerProps)
  
</script>
<style>
  :global(body) {
      margin: 0;
      padding: 0;
    }
</style>
<body>
    <Router {routes}/>
</body>
