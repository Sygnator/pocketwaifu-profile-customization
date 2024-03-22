<!-- src/routes/+layout.svelte -->
<script>
	import '../app.pcss';

	import DarkModeButton from '$lib/components/DarkModeButton.svelte';
</script>

<DarkModeButton />
<slot />
