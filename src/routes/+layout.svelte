<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.pcss';

	import NavBar from '$lib/components/NavBar.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<NavBar />
<SideBar />
<main class="overflow-auto p-5">
	<slot />
</main>
<Footer />
