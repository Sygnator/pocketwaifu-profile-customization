<!-- src/lib/components/Tooltip.svelte -->
<script lang="ts">
	import { Tooltip } from 'flowbite-svelte';

	export let type: 'dark' | 'light' | 'auto' | 'custom' = 'dark';
	export let placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
	export let trigger: 'click' | 'hover' = 'hover';
	export let content: string;

	let TooltipClass: string | undefined = 'bg-gray-400 dark:bg-gray-800';
</script>

<Tooltip {type} {placement} {trigger} class={TooltipClass}>{content}</Tooltip>
