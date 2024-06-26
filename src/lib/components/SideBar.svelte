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
	import Tooltip from '$lib/components/Tooltip.svelte';
	let spanClass = 'flex-1 ms-3 whitespace-nowrap';
	let openModal = false;

	let imageUrl = '';

	let cardsAmount = 12;
	let shadowsOpacity = 70;

	function changeKarma() {
		if ($profileConfig.karma == KarmaState.Angel) {
			profileConfig.setKarma(KarmaState.Neutral);
		} else if ($profileConfig.karma == KarmaState.Demon) {
			profileConfig.setKarma(KarmaState.Angel);
		} else {
			profileConfig.setKarma(KarmaState.Demon);
		}
	}

	const isImageLink = (str: string): boolean => {
		const regex = /^(http|https):\/\/\S+\.(jpg|jpeg|png|gif)$/;
		return regex.test(str);
	};

	const handleChange = (configSetter: (value: string) => void) => {
		return (event: Event) => {
			const value = (event.target as HTMLInputElement).value;
			if (!value) configSetter('');
			if (isImageLink(value)) configSetter(value);
		};
	};
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
					label="Obrazek"
					active={$profileConfig.profileType == ProfileTypeEnum.Img}
					on:click={() => profileConfig.setProfileType(ProfileTypeEnum.Img)}
				/>
				<SidebarDropdownItem
					label="Obrazek na statystykach"
					active={$profileConfig.profileType == ProfileTypeEnum.StatsWithImg}
					on:click={() => profileConfig.setProfileType(ProfileTypeEnum.StatsWithImg)}
				/>
				<SidebarDropdownItem
					label="Duża galeria"
					active={$profileConfig.profileType == ProfileTypeEnum.Cards}
					on:click={() => profileConfig.setProfileType(ProfileTypeEnum.Cards)}
				/>
				<SidebarDropdownItem
					label="Duża galeria na obrazku"
					active={$profileConfig.profileType == ProfileTypeEnum.CardsOnImg}
					on:click={() => profileConfig.setProfileType(ProfileTypeEnum.CardsOnImg)}
				/>
				<SidebarDropdownItem
					label="Statystyki na obrazku"
					active={$profileConfig.profileType == ProfileTypeEnum.StatsOnImg}
					on:click={() => profileConfig.setProfileType(ProfileTypeEnum.StatsOnImg)}
				/>
				<SidebarDropdownItem
					label="Galeria z karcianką"
					active={$profileConfig.profileType == ProfileTypeEnum.MiniGallery}
					on:click={() => profileConfig.setProfileType(ProfileTypeEnum.MiniGallery)}
				/>
				<SidebarDropdownItem
					label="Galeria z karcianką na obrazku"
					active={$profileConfig.profileType == ProfileTypeEnum.MiniGalleryOnImg}
					on:click={() => profileConfig.setProfileType(ProfileTypeEnum.MiniGalleryOnImg)}
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
			{#if $profileConfig.profileType == ProfileTypeEnum.StatsOnImg || $profileConfig.profileType == ProfileTypeEnum.StatsWithImg || $profileConfig.profileType == ProfileTypeEnum.CardsOnImg || $profileConfig.profileType == ProfileTypeEnum.MiniGalleryOnImg}
				<Toggle checked={$profileConfig.barOpacity} on:change={profileConfig.switchBarOpacity}
					>Przeźroczystość paska</Toggle
				>
				<Label>
					Przeźroczystość cieni: {`${shadowsOpacity < 10 ? '  ' : shadowsOpacity < 100 ? ' ' : ''}${shadowsOpacity + '%'}`}
					<Range
						min="0"
						max="100"
						step="1"
						bind:value={shadowsOpacity}
						on:change={() => profileConfig.setShadowsOpacity((100 - shadowsOpacity) / 100)}
					></Range>
				</Label>
			{/if}
		</SidebarGroup>

		<SidebarGroup border>
			<FloatingLabelInput
				size="small"
				style="filled"
				type="text"
				id="b1"
				on:change={handleChange(profileConfig.setBackground)}
			>
				Tło profilu
			</FloatingLabelInput>
			<Tooltip content="Rozmiar tła 750×160 px" placement="left" type="auto" trigger="click" />

			<FloatingLabelInput
				size="small"
				style="filled"
				type="text"
				on:change={handleChange(profileConfig.setOverlay)}
			>
				Nakładka
			</FloatingLabelInput>
			<Tooltip content="Rozmiar nakładki 750×402 px" placement="left" type="auto" trigger="click" />

			<FloatingLabelInput
				size="small"
				style="filled"
				type="text"
				on:change={handleChange(profileConfig.setPremiumOverlay)}
			>
				Ultra nakładka
			</FloatingLabelInput>
			<Tooltip content="Rozmiar nakładki 750×500 px" placement="left" type="auto" trigger="click" />

			{#if $profileConfig.profileType == ProfileTypeEnum.Img || $profileConfig.profileType == ProfileTypeEnum.StatsOnImg || $profileConfig.profileType == ProfileTypeEnum.StatsWithImg || $profileConfig.profileType == ProfileTypeEnum.CardsOnImg || $profileConfig.profileType == ProfileTypeEnum.MiniGalleryOnImg}
				<FloatingLabelInput
					size="small"
					style="filled"
					type="text"
					bind:value={imageUrl}
					on:change={handleChange(profileConfig.setImage)}
				>
					Obrazek
				</FloatingLabelInput>
				<Tooltip
					content="Rozmiar obrazka 750×340 px"
					placement="left"
					type="auto"
					trigger="click"
				/>
			{/if}
		</SidebarGroup>

		<SidebarGroup border>
			{#if $profileConfig.profileType == ProfileTypeEnum.Stats || $profileConfig.profileType == ProfileTypeEnum.StatsOnImg || $profileConfig.profileType == ProfileTypeEnum.StatsWithImg}
				<Toggle checked={$profileConfig.animeStats} on:change={profileConfig.switchAnimeStats}>
					Pokaż Statystyki Anime
				</Toggle>
				<Toggle checked={$profileConfig.mangaStats} on:change={profileConfig.switchMangaStats}>
					Pokaż Statystyki Mangi
				</Toggle>
			{/if}

			{#if $profileConfig.profileType == ProfileTypeEnum.MiniGallery || $profileConfig.profileType == ProfileTypeEnum.MiniGalleryOnImg}
				<Toggle checked={$profileConfig.miniGallery} on:change={profileConfig.switchMiniGallery}>
					Pokaż mini galerię
				</Toggle>
				<Toggle
					disabled={$profileConfig.miniGallery == false}
					class={`dark:text-gray-${$profileConfig.miniGallery ? '300' : '500'}`}
					checked={$profileConfig.isSmall}
					on:change={profileConfig.switchIsSmall}
				>
					Ilość kart
				</Toggle>
				<Tooltip content="Ilość kart w minigalerii - 6 lub 2" placement="left" type="auto" />
			{/if}

			{#if $profileConfig.profileType != ProfileTypeEnum.Img && $profileConfig.profileType != ProfileTypeEnum.Cards && $profileConfig.profileType != ProfileTypeEnum.CardsOnImg}
				<Toggle checked={$profileConfig.cardsStats} on:change={profileConfig.switchCardsStats}>
					Pokaż Karciankę
				</Toggle>
				<Toggle checked={$profileConfig.flip} on:change={profileConfig.switchFlip}>
					Odwróć układ
				</Toggle>
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
			{/if}

			{#if $profileConfig.profileType == ProfileTypeEnum.Cards || $profileConfig.profileType == ProfileTypeEnum.CardsOnImg}
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
			{/if}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
<ChooseCustomBorder bind:openModal />
