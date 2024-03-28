<!-- src/lib/components/DarkModeButton.svelte -->
<script lang="ts">
	import { DarkMode } from 'flowbite-svelte';

	import Tooltip from '$lib/components/Tooltip.svelte';

	let btnClass: string | undefined =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-xl p-2';
</script>

<DarkMode {btnClass} />
<Tooltip content="Zmień motyw" />
