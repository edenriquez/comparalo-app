<script>
	export let headerText;
</script>

<style>
	header {
		background: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 150px;
	}
    h1{
        text-align: center;
        max-width: 50%;
    }
</style>

<header>
    <h1>{headerText}</h1>
</header>

