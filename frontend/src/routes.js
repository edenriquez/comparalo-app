import Main from "./pages/Main.svelte";
import Product from "./pages/Product.svelte";
import FacebookSuccess from "./pages/FacebookSuccess.svelte";
import NotFound from "./pages/NotFound.svelte";

const routes = {
    '/': Main,
    '/index': Main,
    '/product/:search_id': Product,
    '/auth/facebook/success': FacebookSuccess,
    '/auth/facebook/failure': FacebookSuccess, // TODO: changeto Facebook Failure 
    '*': NotFound,
};

export {
    routes
};