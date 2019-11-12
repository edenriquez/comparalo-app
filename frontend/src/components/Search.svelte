<script>
	const BACKEND_BASE_API = 'http://localhost:3000'
	export let placeholder;
	import axios from "axios";
	const handleSearch = () => {
		const searchValue = document.getElementById('searchBarValue').value
		axios
		.get(`${BACKEND_BASE_API}/search/options?q=${searchValue}&max=10?`)
		.then((response) =>{
			console.log('responses', response)
		})
		.catch(console.warn)
	}
 </script>

<style>
	input {
		border-radius: 10px;
	}
</style>

<div>
    <input id="searchBarValue" type="text" placeholder={placeholder}>
	<button on:click={handleSearch}>Go!</button>
</div>

