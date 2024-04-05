import { writable } from 'svelte/store';
import { ProfileTypeEnum, KarmaState, AvatarBorder, type LevelBorderType } from '$lib/index';

export type ProfileConfigType = {
	profileType: ProfileTypeEnum;
	karma: KarmaState;
	avatarBorder: AvatarBorder;
	miniWaifu: boolean;
	flip: boolean;
	barTop: boolean;
	barOpacity: boolean;
	shadowsOpacity: number;
	levelBorder: LevelBorderType;
	avatarBorderColor: string;
	hasRoundAvatar: boolean;
	cardsStats: boolean;
	miniGallery: boolean;
	isSmall: boolean;
	animeStats: boolean;
	mangaStats: boolean;
	cardsAmount: number;
	image: string;
	background: string;
	overlay: string;
	premiumOverlay: string;
};

export function createProfileConfig(profileConfig: ProfileConfigType) {
	const { subscribe, set, update } = writable(profileConfig);

	function setProfileConfig(config: ProfileConfigType) {
		set(config);
	}

	function setProfileType(profileType: ProfileTypeEnum) {
		update((profileConfig) => ({ ...profileConfig, profileType: profileType }));
	}

	function setKarma(karma: KarmaState) {
		update((profileConfig) => ({ ...profileConfig, karma: karma }));
	}

	function setAvatarBorder(avatarBorder: AvatarBorder) {
		update((profileConfig) => ({ ...profileConfig, avatarBorder: avatarBorder }));
	}

	function switchMiniWaifu() {
		update((profileConfig) => ({ ...profileConfig, miniWaifu: !profileConfig.miniWaifu }));
	}

	function switchFlip() {
		update((profileConfig) => ({ ...profileConfig, flip: !profileConfig.flip }));
	}

	function switchBarTop() {
		update((profileConfig) => ({ ...profileConfig, barTop: !profileConfig.barTop }));
	}

	function switchBarOpacity() {
		update((profileConfig) => ({ ...profileConfig, barOpacity: !profileConfig.barOpacity }));
	}

	function setShadowsOpacity(shadowsOpacity: number) {
		update((profileConfig) => ({ ...profileConfig, shadowsOpacity: shadowsOpacity }));
	}

	function setLevelBorder(levelBorder: LevelBorderType) {
		update((profileConfig) => ({ ...profileConfig, levelBorder: levelBorder }));
	}

	function setAvatarBorderColor(avatarBorderColor: string) {
		update((profileConfig) => ({ ...profileConfig, avatarBorderColor: avatarBorderColor }));
	}

	function switchRoundAvatar() {
		update((profileConfig) => ({
			...profileConfig,
			hasRoundAvatar: !profileConfig.hasRoundAvatar
		}));
	}

	function switchMiniGallery() {
		update((profileConfig) => ({ ...profileConfig, miniGallery: !profileConfig.miniGallery }));
	}

	function switchCardsStats() {
		update((profileConfig) => ({ ...profileConfig, cardsStats: !profileConfig.cardsStats }));
	}

	function switchIsSmall() {
		update((profileConfig) => ({ ...profileConfig, isSmall: !profileConfig.isSmall }));
	}

	function switchAnimeStats() {
		update((profileConfig) => ({ ...profileConfig, animeStats: !profileConfig.animeStats }));
	}

	function switchMangaStats() {
		update((profileConfig) => ({ ...profileConfig, mangaStats: !profileConfig.mangaStats }));
	}

	function setCardsAmount(cardsAmount: number) {
		update((profileConfig) => ({ ...profileConfig, cardsAmount: cardsAmount }));
	}

	function setImage(image: string) {
		update((profileConfig) => ({ ...profileConfig, image: image }));
	}

	function setBackground(background: string) {
		update((profileConfig) => ({ ...profileConfig, background: background }));
	}

	function setOverlay(overlay: string) {
		update((profileConfig) => ({ ...profileConfig, overlay: overlay }));
	}

	function setPremiumOverlay(premiumOverlay: string) {
		update((profileConfig) => ({ ...profileConfig, premiumOverlay: premiumOverlay }));
	}

	return {
		subscribe,
		setProfileConfig,
		setProfileType,
		setKarma,
		setAvatarBorder,
		switchMiniWaifu,
		switchFlip,
		switchBarTop,
		switchBarOpacity,
		setShadowsOpacity,
		setLevelBorder,
		setAvatarBorderColor,
		switchRoundAvatar,
		switchMiniGallery,
		switchCardsStats,
		switchIsSmall,
		switchAnimeStats,
		switchMangaStats,
		setCardsAmount,
		setImage,
		setBackground,
		setOverlay,
		setPremiumOverlay
	};
}

// basic configuration
export const profileConfig = createProfileConfig({
	profileType: ProfileTypeEnum.Stats,
	karma: KarmaState.Angel,
	avatarBorder: AvatarBorder.None,
	miniWaifu: false,
	flip: false,
	barTop: false,
	barOpacity: false,
	shadowsOpacity: 0.3,
	levelBorder: false,
	avatarBorderColor: '#5f83ff',
	hasRoundAvatar: false,
	cardsStats: true,
	miniGallery: true,
	isSmall: false,
	animeStats: true,
	mangaStats: true,
	cardsAmount: 12,
	image: '',
	background: '',
	overlay: '',
	premiumOverlay: ''
});
