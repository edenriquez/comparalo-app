import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		headerFirstText: 'Comparalo',
		headerSecondText: 'App!',
		placeholderText: 'Search a product'
	}
});

export default app;