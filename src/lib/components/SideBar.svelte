<script lang="ts">
	import {
		Sidebar,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Toggle,
		Range,
		FloatingLabelInput,
		Label
	} from 'flowbite-svelte';
	import { GridSolid } from 'flowbite-svelte-icons';
	import ChooseCustomBorder from './ChooseCustomBorder.svelte';
	import { profileConfig } from '$lib/profileConfig';
	import { KarmaState, ProfileTypeEnum } from '$lib';
	let spanClass = 'flex-1 ms-3 whitespace-nowrap';
	let openModal = false;

	let cardsAmount = 1;
	let shadowsOpacity = 30;

	function changeKarma() {
		if ($profileConfig.karma == KarmaState.Angel) {
			profileConfig.setKarma(KarmaState.Neutral);
		} else if ($profileConfig.karma == KarmaState.Demon) {
			profileConfig.setKarma(KarmaState.Angel);
		} else {
			profileConfig.setKarma(KarmaState.Demon);
		}
	}
</script>

<Sidebar asideClass="float-left">
	<SidebarWrapper
		style="height: 100%"
		divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800 float-left pb-20"
	>
		<SidebarGroup>
			<SidebarDropdownWrapper label="Styl profilu">
				<svelte:fragment slot="icon">
					<GridSolid
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				</svelte:fragment>
				<SidebarDropdownItem
					label="Statystyki"
					active={$profileConfig.profileType == ProfileTypeEnum.Stats}
					on:click={() => profileConfig.setProfileType(ProfileTypeEnum.Stats)}
				/>
				<SidebarDropdownItem
					label="Duża galeria"
					active={$profileConfig.profileType == ProfileTypeEnum.Cards}
					on:click={() => profileConfig.setProfileType(ProfileTypeEnum.Cards)}
				/>
				<SidebarDropdownItem
					label="Obrazek"
					active={$profileConfig.profileType == ProfileTypeEnum.Img}
					on:click={() => profileConfig.setProfileType(ProfileTypeEnum.Img)}
				/>
				<SidebarDropdownItem
					label="Karcianka"
					active={$profileConfig.profileType == ProfileTypeEnum.ShowCards}
					on:click={() => profileConfig.setProfileType(ProfileTypeEnum.ShowCards)}
				/>
			</SidebarDropdownWrapper>
			<SidebarItem label="Ramka Avatara" {spanClass} on:click={() => (openModal = true)}>
				<svelte:fragment slot="icon">
					<GridSolid
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>

		<SidebarGroup border>
			<Toggle checked={$profileConfig.miniWaifu} on:change={profileConfig.switchMiniWaifu}
				>Pokaż Mini Waifu</Toggle
			>
			<Toggle checked={$profileConfig.barTop} on:change={profileConfig.switchBarTop}
				>Położenie paska</Toggle
			>
			<Toggle checked={$profileConfig.barOpacity} on:change={profileConfig.switchBarOpacity}
				>Przeźroczystość paska</Toggle
			>
			<Label>
				Cienie: {`${shadowsOpacity < 10 ? '  ' : shadowsOpacity < 100 ? ' ' : ''}${shadowsOpacity + '%'}`}
				<Range
					min="0"
					max="100"
					step="1"
					bind:value={shadowsOpacity}
					on:change={() => profileConfig.setShadowsOpacity(shadowsOpacity / 100)}
				></Range>
			</Label>
		</SidebarGroup>

		<SidebarGroup border>
			<FloatingLabelInput
				size="small"
				style="filled"
				type="text"
				on:change={(e) => profileConfig.setBackground(e.target.value)}
				>Tło profilu</FloatingLabelInput
			>
			<FloatingLabelInput
				size="small"
				style="filled"
				type="text"
				on:change={(e) => profileConfig.setImage(e.target.value)}>Obrazek</FloatingLabelInput
			>
			<FloatingLabelInput
				size="small"
				style="filled"
				type="text"
				on:change={(e) => profileConfig.setOverlay(e.target.value)}>Nakładka</FloatingLabelInput
			>
			<FloatingLabelInput
				size="small"
				style="filled"
				type="text"
				on:change={(e) => profileConfig.setPremiumOverlay(e.target.value)}
			>
				Ultra nakładka
			</FloatingLabelInput>
		</SidebarGroup>

		{#if $profileConfig.profileType == ProfileTypeEnum.Stats}
			<SidebarGroup border>
				<Toggle checked={$profileConfig.animeStats} on:change={profileConfig.switchAnimeStats}
					>Pokaż Statystyki Anime</Toggle
				>
				<Toggle checked={$profileConfig.mangaStats} on:change={profileConfig.switchMangaStats}
					>Pokaż Statystyki Mangi</Toggle
				>
				<Toggle checked={$profileConfig.flip} on:change={profileConfig.switchFlip}
					>Odwróć układ</Toggle
				>
			</SidebarGroup>
		{/if}

		{#if $profileConfig.profileType == ProfileTypeEnum.ShowCards}
			<SidebarGroup border>
				<Toggle checked={$profileConfig.cardsStats} on:change={profileConfig.switchCardsStats}
					>Pokaż Karciankę</Toggle
				>
				<Toggle checked={$profileConfig.miniGallery} on:change={profileConfig.switchMiniGallery}
					>Pokaż mini galerię</Toggle
				>
				<Toggle checked={$profileConfig.isSmall} on:change={profileConfig.switchIsSmall}
					>Ilość kart</Toggle
				>
				<Toggle checked={$profileConfig.flip} on:change={profileConfig.switchFlip}
					>Odwróć układ</Toggle
				>
				<SidebarItem label="Karma" {spanClass} on:click={changeKarma}>
					<svelte:fragment slot="icon">
						<img src={`/profile_assets/${$profileConfig.karma}.png`} alt="karma" />
					</svelte:fragment>
					<svelte:fragment slot="subtext">
						<span
							class="ms-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
						>
							{#if $profileConfig.karma == KarmaState.Angel}
								Dodatnia
							{:else if $profileConfig.karma == KarmaState.Demon}
								Ujemna
							{:else}
								Neutralna
							{/if}
						</span>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		{/if}

		{#if $profileConfig.profileType == ProfileTypeEnum.Cards}
			<SidebarGroup border>
				<Label>
					Ilość kart: {cardsAmount < 10 ? '0' + cardsAmount : cardsAmount}
					<Range
						min="0"
						max="12"
						step="1"
						bind:value={cardsAmount}
						on:change={() => profileConfig.setCardsAmount(cardsAmount)}
					></Range>
				</Label>
			</SidebarGroup>
		{/if}
	</SidebarWrapper>
</Sidebar>
<ChooseCustomBorder bind:openModal />
