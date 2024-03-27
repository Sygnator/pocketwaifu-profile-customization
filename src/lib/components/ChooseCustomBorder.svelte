<script lang="ts">
	import { AvatarBorder } from '$lib';
	import { profileConfig } from '$lib/profileConfig';
	import { Modal, Card } from 'flowbite-svelte';
	export let openModal: boolean;
</script>

<Modal
	title="Ramka avatara"
	bind:open={openModal}
	autoclose
	outsideclose
	size="lg"
	placement="top-center"
>
	<div class="grid grid-cols-6 flex-row justify-start gap-2">
		{#each Object.values(AvatarBorder) as avatarBorder}
			<Card
				style={`padding: 0; ${avatarBorder == $profileConfig.avatarBorder ? 'border-bottom: outset;' : ''}`}
				class={`${avatarBorder == $profileConfig.avatarBorder ? 'bg-gray-300 dark:bg-gray-700' : ''} flex cursor-pointer flex-col items-center justify-end text-center hover:bg-gray-200 dark:hover:bg-gray-700`}
				on:click={() => {
					if (avatarBorder == AvatarBorder.Base) {
						profileConfig.setAvatarBorder(avatarBorder);
					} else if (avatarBorder != $profileConfig.avatarBorder) {
						openModal = false;
						profileConfig.setAvatarBorder(avatarBorder);
					}
				}}
			>
				<img
					class="object-fit: contain max-w-30 place-self-center p-2"
					src={`/profile_assets/avatar_border/${avatarBorder}.png`}
					alt={avatarBorder}
				/>
				<p class="mt-2 pb-1">{avatarBorder}</p>
			</Card>
		{/each}
	</div>
</Modal>
