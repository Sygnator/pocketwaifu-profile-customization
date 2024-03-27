<script lang="ts">
	import { AvatarBorder, type LevelBorderType } from '$lib';
	import { profileConfig } from '$lib/profileConfig';
	import { Modal, Card, Range, Tooltip, Label, Toggle, Input } from 'flowbite-svelte';
	export let openModal: boolean;
	let level = 0;
	let levelB: LevelBorderType = false;
	let color = '#000000';
	let getStep = (value: number) => {
		// TODO: fix this
		if (value >= 0 && value <= 2) {
			levelB = Math.round(value / 2) * 2;
			return 2;
		} else if (value > 2 && value < 5) {
			levelB = Math.round(value / 3) * 3;
			return 3;
		} else if (value >= 5 && value < 100) {
			levelB = Math.round(value / 5) * 5;
			return 5;
		} else if (value >= 100 && value <= 200) {
			levelB = Math.round(value / 25) * 25;
			return 25;
		} else {
			return 2;
		}
	};
</script>

<Modal
	title="Ramka avatara"
	bind:open={openModal}
	autoclose
	outsideclose
	size="lg"
	placement="top-center"
	on:close={() => profileConfig.setLevelBorder(levelB)}
>
	<div class="flex flex-row items-center justify-between">
		<Toggle
			checked={$profileConfig.hasRoundAvatar}
			on:change={profileConfig.switchRoundAvatar}
			disabled={$profileConfig.avatarBorder != AvatarBorder.None}
		>
			Okrągły Awatar
		</Toggle>
		<Tooltip placement="bottom">Działa wyłącznie z ramką None!</Tooltip>

		<div class="ml-3 mr-3 flex-grow">
			<Label
				>Poziom: {level}
				<Range
					min="0"
					max="200"
					step={getStep(level)}
					bind:value={level}
					disabled={$profileConfig.avatarBorder == AvatarBorder.Base ? false : true}
				></Range>
			</Label>
		</div>
		<Tooltip placement="bottom">Działa wyłącznie z ramką Base!</Tooltip>

		<Label>
			Kolor ramki
			<Input
				type="color"
				disabled={$profileConfig.avatarBorder != AvatarBorder.None}
				bind:value={color}
				on:change={() => profileConfig.setAvatarBorderColor(color)}
			/>
		</Label>
		<Tooltip placement="bottom">Działa wyłącznie z ramką None!</Tooltip>
	</div>
	<svelte:fragment slot="footer">
		<div class="grid grid-cols-6 flex-row justify-start gap-2">
			{#each Object.values(AvatarBorder) as avatarBorder}
				<Card
					style={`padding: 0; ${avatarBorder == $profileConfig.avatarBorder ? 'border-bottom: outset;' : ''}`}
					class={`${avatarBorder == $profileConfig.avatarBorder ? 'bg-gray-300 dark:bg-gray-700' : ''} flex cursor-pointer flex-col items-center justify-end text-center hover:bg-gray-200 dark:hover:bg-gray-700`}
					on:click={() => {
						if (avatarBorder == AvatarBorder.Base || avatarBorder == AvatarBorder.None) {
							profileConfig.setAvatarBorder(avatarBorder);
						} else if (avatarBorder != $profileConfig.avatarBorder) {
							openModal = false;
							profileConfig.setAvatarBorder(avatarBorder);
						}
					}}
				>
					<img
						class="object-fit: contain max-w-30 place-self-center p-2"
						src={`/profile_assets/avatar_border/${avatarBorder == AvatarBorder.Base && levelB != false ? 'level/' + levelB : avatarBorder}.png`}
						alt={avatarBorder}
					/>
					<p class="mt-2 pb-1">{avatarBorder}</p>
				</Card>
			{/each}
		</div></svelte:fragment
	>
</Modal>
