import { writable } from 'svelte/store';
import { ProfileTypeEnum, KarmaState, AvatarBorder, type LevelBorderType } from '$lib/index';

export type ProfileConfigType = {
	profileType: ProfileTypeEnum;
	karma: KarmaState;
	avatarBorder: AvatarBorder;
	miniWaifu: boolean;
	flip: boolean;
	barTop: boolean;
	barOpacity: number;
	shadowsOpacity: number;
	levelBorder: LevelBorderType;
	avatarBorderColor: string;
	hasRoundAvatar: boolean;
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

	function setBarOpacity(barOpacity: number) {
		update((profileConfig) => ({ ...profileConfig, barOpacity: barOpacity }));
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

	return {
		subscribe,
		setProfileConfig,
		setProfileType,
		setKarma,
		setAvatarBorder,
		switchMiniWaifu,
		switchFlip,
		switchBarTop,
		setBarOpacity,
		setShadowsOpacity,
		setLevelBorder,
		setAvatarBorderColor,
		switchRoundAvatar
	};
}

// basic configuration
export const profileConfig = createProfileConfig({
	profileType: ProfileTypeEnum.MiniGallery,
	karma: KarmaState.Angel,
	avatarBorder: AvatarBorder.Crows,
	miniWaifu: false,
	flip: true,
	barTop: false,
	barOpacity: 0.75,
	shadowsOpacity: 0.3,
	levelBorder: false,
	avatarBorderColor: '#ff1122',
	hasRoundAvatar: false
});
