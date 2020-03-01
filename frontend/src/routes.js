import Main from "./pages/Main.svelte";
import Product from "./pages/Product.svelte";
import FacebookSuccess from "./pages/FacebookSuccess.svelte";
import NotFound from "./pages/NotFound.svelte";
import User from "./pages/User.svelte";

const routes = {
    '/': Main,
    '/index': Main,
    '/product/:search_id': Product,
    '/auth/facebook/success': FacebookSuccess,
    '/auth/facebook/failure': FacebookSuccess, // TODO: change to Facebook Failure 
    '/auth/google/success': FacebookSuccess, // TODO: change google
    '/auth/google/failure': FacebookSuccess, // TODO: change to google Failure 
    '/user/profile': User,
    '*': NotFound,
};

export {
    routes
};