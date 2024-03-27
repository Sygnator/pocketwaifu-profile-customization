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
		setCardsAmount
	};
}

// basic configuration
export const profileConfig = createProfileConfig({
	profileType: ProfileTypeEnum.ShowCards,
	karma: KarmaState.Angel,
	avatarBorder: AvatarBorder.Crows,
	miniWaifu: false,
	flip: true,
	barTop: false,
	barOpacity: true,
	shadowsOpacity: 0.3,
	levelBorder: false,
	avatarBorderColor: '#ff1122',
	hasRoundAvatar: false,
	cardsStats: true,
	miniGallery: true,
	isSmall: false,
	animeStats: true,
	mangaStats: true,
	cardsAmount: 12
});
