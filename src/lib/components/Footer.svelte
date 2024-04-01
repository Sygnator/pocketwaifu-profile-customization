<!-- src/lib/components/Footer.svelte -->
<script lang="ts">
	import { Footer, FooterCopyright, FooterIcon } from 'flowbite-svelte';
	import { GithubSolid, DiscordSolid } from 'flowbite-svelte-icons';
</script>

<Footer footerType="socialmedia" class="fixed bottom-0 z-20 w-full sm:p-4">
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterCopyright href="https://sanakan.pl/" by="Sanakan" year={new Date().getFullYear()} />
		<div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-center rtl:space-x-reverse">
			<FooterIcon href="https://discord.gg/shinden" target="_blank">
				<DiscordSolid
					class="h-4 w-4 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
				/>
			</FooterIcon>
			<FooterIcon
				href="https://github.com/Sygnator/pocketwaifu-profile-customization"
				target="_blank"
			>
				<GithubSolid
					class="h-4 w-4 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
				/>
			</FooterIcon>
		</div>
	</div>
</Footer>
