<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.pcss';

	import NavBar from '$lib/components/NavBar.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let count = 0;

	function handleClick() {
		count++;
	}
</script>

<NavBar />
<SideBar {handleClick} />
<main class="overflow-auto p-5" style="text-align: -webkit-center;">
	<slot />
</main>
<Footer />
