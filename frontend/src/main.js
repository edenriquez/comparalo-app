import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		headerText: 'comparaloapp',
		placeholder: 'Busca un producto!'
	}
});

export default app;
