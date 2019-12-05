import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		headerProps:{
			headerFirstText: 'Comparalo',
			headerSecondText: 'App!',
			headerThirdText: 'Enjoy the experience',
			placeholderText: 'Search a product'
		}
	}
});

export default app;
