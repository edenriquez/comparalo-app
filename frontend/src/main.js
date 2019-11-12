import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		headerText: 'comparaloapp',
		placeholderText: 'Busca un producto!'
	}
});

export default app;