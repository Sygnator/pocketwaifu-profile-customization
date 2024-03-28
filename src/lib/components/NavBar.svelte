<!-- src/lib/components/NavBar.svelte -->
<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import DarkModeButton from '$lib/components/DarkModeButton.svelte';
</script>

<Navbar rounded color="form">
	<NavBrand href="/">
		<img src="pwlogo.png" class="me-3 h-6 sm:h-9" alt="PocketWaifu Logo" />
		<span
			style="font-family: 'Lato'"
			class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Profile customization</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="https://shinden.pl/" target="_blank">Shinden</NavLi>
		<NavLi href="https://waifu.sanakan.pl/" target="_blank">PocketWaifu</NavLi>
		<NavLi href="https://wiki.sanakan.pl/" target="_blank">Wiki</NavLi>
		<NavLi href="https://skalpel.sanakan.pl/" target="_blank">Skalpelator</NavLi>
	</NavUl>
	<DarkModeButton />
</Navbar>
