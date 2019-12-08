import Main from "./pages/Main.svelte";
import Product from "./pages/Product.svelte";
import NotFound from "./pages/NotFound.svelte";

const routes = {
    '/': Main,
    '/index': Main,
    '/product/:search_id': Product,
    '*': NotFound,
};

export { routes };

