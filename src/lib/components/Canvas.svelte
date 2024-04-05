<script lang="ts">
	import {
		ProfileTypeEnum,
		KarmaState,
		CardRarity,
		AvatarBorder,
		type LevelBorderType
	} from '$lib/index';

	import FontFaceObserver from 'fontfaceobserver';
	import type FontFaceObserverOptions from 'fontfaceobserver';

	import { onMount } from 'svelte';

	import { profileConfig } from '$lib/profileConfig';

	export let width = 750;
	export let height = 500;
	export let background = '#313338';

	let canvas: HTMLCanvasElement;

	let context: CanvasRenderingContext2D;

	/**
	 * Load an image from the specified source.
	 *
	 * @param source The URL or path to the image.
	 * @returns *HTMLImageElement* when the image is loaded successfully.
	 */
	function loadImage(source: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = () => resolve(image);
			image.onerror = reject;
			image.src = source;
		});
	}

	/**
	 * Draw an image.
	 *
	 * @param image The *HTML image element* to be drawn.
	 * @param x The X coordinate of the top left corner of the image.
	 * @param y The Y coordinate of the top left corner of the image.
	 * @param w The width of the image.
	 * @param h The height of the image.
	 * @param context The canvas rendering context.
	 */
	async function drawImage(
		image: HTMLImageElement,
		x: number,
		y: number,
		w: number,
		h: number,
		context: CanvasRenderingContext2D
	): Promise<void> {
		await image.decode();
		context.drawImage(image, x, y, w, h);
	}

	/**
	 * Draw a **rounded** image.
	 *
	 * @param image The *HTML image element* to be drawn.
	 * @param x The X coordinate of the top left corner of the image.
	 * @param y The Y coordinate of the top left corner of the image.
	 * @param w The width of the image.
	 * @param h The height of the image.
	 * @param radius The radius of the rounded corners. **Specified in pixels.**
	 * @param context The canvas rendering context.
	 */
	async function drawRoundedImage(
		image: HTMLImageElement,
		x: number,
		y: number,
		w: number,
		h: number,
		radius: number,
		context: CanvasRenderingContext2D
	): Promise<void> {
		await image.decode();

		context.save();

		context.clearRect(0, 0, 0, 0);

		context.beginPath();
		context.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
		context.closePath();
		context.clip();

		context.drawImage(image, x, y, w, h);

		context.restore();
	}

	/**
	 * Fills a rectangle.
	 *
	 * @param x The X coordinate of the top left corner of the rectangle.
	 * @param y The Y coordinate of the top left corner of the rectangle.
	 * @param w The width of the rectangle.
	 * @param h The height of the rectangle.
	 * @param color The fill color in hexadecimal format (#RRGGBB).
	 * @param context The canvas rendering context.
	 */
	async function fillRect(
		x: number,
		y: number,
		w: number,
		h: number,
		color: string,
		context: CanvasRenderingContext2D
	): Promise<void> {
		context.fillStyle = color;
		context.fillRect(x, y, w, h);
	}

	/**
	 * Fills a **rounded** rectangle.
	 *
	 * @param x The X coordinate of the top left corner of the rectangle.
	 * @param y The Y coordinate of the top left corner of the rectangle.
	 * @param w The width of the rectangle.
	 * @param h The height of the rectangle.
	 * @param radius The radius of the rounded corners. **Specified in pixels.**
	 * @param color The fill color in hexadecimal format (#RRGGBB).
	 * @param context The canvas rendering context.
	 */
	async function fillRoundedRect(
		x: number,
		y: number,
		w: number,
		h: number,
		radius: number,
		color: string,
		context: CanvasRenderingContext2D
	): Promise<void> {
		context.beginPath();
		context.moveTo(x, y + radius);
		context.arcTo(x, y, x + radius, y, radius);
		context.lineTo(x + w - radius, y);
		context.arcTo(x + w, y, x + w, y + radius, radius);
		context.lineTo(x + w, y + h - radius);
		context.arcTo(x + w, y + h, x + w - radius, y + h, radius);
		context.lineTo(x + radius, y + h);
		context.arcTo(x, y + h, x, y + h - radius, radius);
		context.closePath();

		context.fillStyle = color;
		context.fill();
	}

	/**
	 * Draw text onto the canvas.
	 *
	 * @param text The text to be drawn.
	 * @param x The X coordinate of the starting point for the text.
	 * @param y The Y coordinate of the starting point for the text.
	 * @param context The canvas rendering context.
	 * @param color The color of the text in hexadecimal format (#RRGGBB).
	 * @param size The size of the text (in pixels).
	 * @param font The font family for the text.
	 * @param fontStyle The style of the font (**bold**, *italic*, or nothing).
	 * @param weight The font weight (100, 300, 400, 700, or 900).
	 */
	async function drawText(
		text: string,
		x: number,
		y: number,
		context: CanvasRenderingContext2D,
		color: string = '#a7a7a7',
		size: number = 16,
		font: string = 'Lato',
		fontStyle: 'bold' | 'italic' | '' = '',
		weight: 100 | 300 | 400 | 700 | 900 = 400
	): Promise<void> {
		const usedFont: FontFaceObserverOptions = new FontFaceObserver(font, {
			weight: weight
		});

		await usedFont.load().then(() => {
			context.fillStyle = color;
			context.font = `${fontStyle} ${size}px ${font}`;
			context.fillText(text, x, y);
		});
	}

	async function drawProfileAvatarBorder(
		avatarBorder: AvatarBorder,
		levelBorder: LevelBorderType,
		context: CanvasRenderingContext2D
	): Promise<void> {
		let avatarBorderImage: HTMLImageElement;
		if (avatarBorder === AvatarBorder.Base && levelBorder) {
			avatarBorderImage = await loadImage(`/profile_assets/avatar_border/level/${levelBorder}.png`);
		} else {
			avatarBorderImage = await loadImage(`/profile_assets/avatar_border/${avatarBorder}.png`);
		}

		let position = { x: 24, y: 39 };

		// get position of specific avatar border
		switch (avatarBorder) {
			case AvatarBorder.Bow:
				position = { x: 26, y: 48 };
				break;
			case AvatarBorder.Dzedai:
				position = { x: 23, y: 38 };
				break;
			case AvatarBorder.Water:
				position = { x: 35, y: 58 };
				break;
			case AvatarBorder.Base:
				position = { x: 43, y: 59 };
				break;
			case AvatarBorder.Crows:
				position = { x: 25, y: 42 };
				break;
			case AvatarBorder.Metal:
				position = { x: 49, y: 65 };
				break;
			case AvatarBorder.RedThinLeaves:
				position = { x: 30, y: 44 };
				break;
			case AvatarBorder.Skull:
				position = { x: 28, y: 47 };
				break;
			case AvatarBorder.Fire:
				position = { x: 45, y: 60 };
				break;
			case AvatarBorder.Promium:
				position = { x: 38, y: 53 };
				break;
			case AvatarBorder.Ice:
				position = { x: 44, y: 61 };
				break;
			case AvatarBorder.Gold:
				position = { x: 18, y: 33 };
				break;
			case AvatarBorder.Red:
				position = { x: 40, y: 58 };
				break;
			case AvatarBorder.Rainbow:
				position = { x: 44, y: 60 };
				break;
			case AvatarBorder.Pink:
				position = { x: 38, y: 53 };
				break;
			case AvatarBorder.Simple:
				position = { x: 36, y: 53 };
				break;
			default:
				position = { x: 24, y: 39 };
				break;
		}

		drawImage(
			avatarBorderImage,
			position.x,
			position.y,
			avatarBorderImage.width,
			avatarBorderImage.height,
			context
		);
	}

	async function drawAvatar(
		image: HTMLImageElement,
		avatarX: number,
		avatarY: number,
		avatarSize: number,
		avatarBorderColor: string,
		hasRoundAvatar: boolean,
		context: CanvasRenderingContext2D,
		avatarBorder: AvatarBorder = AvatarBorder.None,
		levelBorder: LevelBorderType = false
	): Promise<void> {
		const borderSize = 2;
		const tSize = avatarSize + borderSize * 2;
		const gSize = 1;
		const gOff = gSize * 2;
		await image.decode();

		let hasAvatarBorder = avatarBorder === AvatarBorder.None ? false : true;

		if (hasAvatarBorder) hasRoundAvatar = true;
		let radius = 40;

		// Avatar back
		if (hasRoundAvatar) {
			await fillRoundedRect(avatarX, avatarY, tSize, tSize, radius, '#3f3f3f', context);
		} else {
			await fillRect(avatarX, avatarY, tSize, tSize, '#3f3f3f', context);
		}

		// Avatar border
		if (hasRoundAvatar) {
			await fillRoundedRect(
				avatarX + gSize,
				avatarY + gSize,
				avatarSize + gOff,
				avatarSize + gOff,
				radius,
				avatarBorderColor,
				context
			);
		} else {
			await fillRect(
				avatarX + gSize,
				avatarY + gSize,
				avatarSize + gOff,
				avatarSize + gOff,
				avatarBorderColor,
				context
			);
		}

		// Avatar image
		if (hasRoundAvatar) {
			await drawRoundedImage(
				image,
				avatarX + borderSize,
				avatarY + borderSize,
				avatarSize,
				avatarSize,
				radius,
				context
			);
		} else {
			await drawImage(
				image,
				avatarX + borderSize,
				avatarY + borderSize,
				avatarSize,
				avatarSize,
				context
			);
		}

		// custom avatar border
		if (hasAvatarBorder) {
			drawProfileAvatarBorder(avatarBorder, levelBorder, context);
		}
	}

	async function drawNickAndRank(
		avatarX: number,
		avatarSize: number,
		nickname: string,
		rank: string,
		context: CanvasRenderingContext2D
	) {
		const tSize = avatarSize + 2 * 2;

		// Nickname & rank
		let nickX = 27;
		nickX += avatarX + tSize;
		const nickY = 103;
		const nickFontSize = 28;
		await drawText(
			nickname,
			nickX,
			nickY + (30 - nickFontSize) / 2 + nickFontSize,
			context,
			'#a7a7a7',
			nickFontSize,
			'Lato',
			'bold'
		);
		const rankFontSize = 16;
		await drawText(
			rank,
			nickX,
			nickY + 32 + rankFontSize,
			context,
			'#7f7f7f',
			rankFontSize,
			'Lato'
		);
	}

	async function GetCurrencyImage(
		source: string,
		x: number,
		y: number,
		context: CanvasRenderingContext2D,
		text: string = '100M'
	): Promise<void> {
		const img = await loadImage(`/profile_assets/${source}.png`);
		await drawImage(img, x, y, 16, 16, context);
		await drawText(text, x + 16 + 3.5, y + 14, context);
	}

	async function GetTopLevelImage(
		x: number,
		y: number,
		context: CanvasRenderingContext2D
	): Promise<void> {
		GetCurrencyImage('mtop', x, y, context, '0');
		GetCurrencyImage('mlvl', x + 60, y, context, '999');

		// level
		let expOnLvl = 12239;
		let lvlExp = 16319;

		// background
		const barH = 14;
		await fillRoundedRect(x + 114, y + 1, 74, barH, 2, '#3f3f3f', context);

		// progress bar
		let progressBarLength = 72 * (expOnLvl / lvlExp);
		if (progressBarLength > 0) {
			await fillRoundedRect(x + 115, y + 2, progressBarLength, barH - 2, 2, '#145DA0', context);
		}

		// bar text
		await drawText(
			`${expOnLvl} / ${lvlExp}`,
			x + 115 + 3,
			y + 9 + 3,
			context,
			'#FFFFFF',
			10,
			'Lato',
			'bold'
		);
	}

	async function drawProfileBar(
		barTop: boolean,
		barOpacity: boolean,
		context: CanvasRenderingContext2D,
		shadowsOpacity: number = 0.7
	): Promise<void> {
		// profile bar background
		await fillRoundedRect(
			25,
			barTop ? -16 : 476,
			700,
			40,
			8,
			`rgba(0, 0, 0, ${barOpacity ? shadowsOpacity : '0.75'})`,
			context
		);

		const topBarY = barTop ? 3 : 480;
		GetTopLevelImage(32, topBarY, context);

		// coins
		const coinOff = 84;
		let coinX = 227 - coinOff;
		// message icon
		GetCurrencyImage('mmsg', (coinX += coinOff), topBarY, context);

		// sc icon
		GetCurrencyImage('msc', (coinX += coinOff), topBarY, context);

		// tc icon
		GetCurrencyImage('mtc', (coinX += coinOff), topBarY, context);

		// ac icon
		GetCurrencyImage('mac', (coinX += coinOff), topBarY, context);

		// ct icon
		GetCurrencyImage('mct', (coinX += coinOff), topBarY, context);

		// pc icon
		GetCurrencyImage('mpc', (coinX += coinOff), topBarY, context);
	}

	async function drawCards(context: CanvasRenderingContext2D, cardsAmount: number): Promise<void> {
		let cardX = 4 + 15;
		let cardY = 19 + 160 - 15;

		if (cardsAmount > 12 || cardsAmount < 0) {
			cardsAmount = 12;
		}

		for (let i = 1; i <= cardsAmount; i++) {
			const cardImg = await loadImage(`/profile_assets/user/cards/${i}.webp`);
			drawImage(cardImg, cardX, cardY, 107, 150, context);
			cardX += 121;
			if (cardX > 730) {
				cardX = 19;
				cardY += 155;
			}
		}
	}

	async function drawMiniGallery(
		context: CanvasRenderingContext2D,
		isSmall: boolean = false,
		isOnImg: boolean = false,
		shadowsOpacity: number = 0.75,
		flip: boolean = false
	): Promise<void> {
		let statsX = flip ? 407 : 16;
		let statsY = 24 + 160;

		if (isOnImg) {
			await fillRoundedRect(
				statsX - 3,
				statsY - 3,
				331,
				275,
				8,
				`rgba(0, 0, 0, ${shadowsOpacity})`,
				context
			);
		}

		const startX = statsX + (isSmall ? 6 : 12);
		const cardGap = isSmall ? 160 : 104;
		const cardSizeW = isSmall ? 152 : 93;
		const cardSizeH = isSmall ? 215 : 131;
		let cardY = statsY + (isSmall ? 26 : 2);
		let cardX = startX;

		for (let i = 1; i <= (isSmall ? 2 : 6); i++) {
			const cardImg = await loadImage(`/profile_assets/user/cards/${i}.webp`);
			drawImage(cardImg, cardX, cardY, cardSizeW, cardSizeH, context);
			cardX += cardGap;
			if (cardX > cardGap * 2 + startX) {
				cardX = startX;
				cardY += 135;
			}
		}
	}

	async function drawWaifuProfile(
		context: CanvasRenderingContext2D,
		isOnImg: boolean = false,
		shadowsOpacity: number = 0.75,
		flip: boolean = false,
		karma: KarmaState = KarmaState.Angel
	): Promise<void> {
		let statsX = flip ? 407 - 391 : 16 + 352;
		let statsY = 24 + 160;

		if (isOnImg) {
			await fillRoundedRect(
				statsX - 3,
				statsY - 3,
				370,
				275,
				8,
				`rgba(0, 0, 0, ${shadowsOpacity})`,
				context
			);
		}

		// waifu card
		const cardImage = await loadImage('/profile_assets/user/cards/1.webp');
		await drawImage(cardImage, statsX + 10, statsY + 4, 185, 260, context);

		// top stats
		const fontColor = '#a7a7a7';

		let oGap = 60;
		let startX = statsX + 213;
		let startY = statsY + 18;
		await drawText('Posiadane', startX, startY + 8 - 10, context, '#7f7f7f', 9, 'Lato', 'bold');
		await drawText('Limit', startX + oGap, startY + 8 - 10, context, '#7f7f7f', 9, 'Lato', 'bold');
		await drawText('20691', startX, startY + 15, context, fontColor, 16, 'Lato', 'bold');
		await drawText('99999', startX + oGap, startY + 15, context, fontColor, 16, 'Lato', 'bold');

		// karma
		const karmaImg = await loadImage(`/profile_assets/${karma}.png`);
		drawImage(karmaImg, statsX + 330, startY - 6, 22, 21, context);

		// cards stats
		startY += 29;
		let cGap = 38;
		let jumpY = 24;

		for (const r of Object.values(CardRarity)) {
			const cImg = await loadImage(`/profile_assets/r${r}.png`);
			drawImage(cImg, startX, startY, 33, 20, context);
			drawText(
				`${Math.abs((startY - 257) * 36)}`,
				startX + cGap,
				startY + 16,
				context,
				fontColor,
				17,
				'Lato',
				'bold'
			);
			startY += jumpY;
		}

		startY = statsY + 246;
		const sGap = 84;

		// scalpel
		await GetCurrencyImage('mscal', startX, startY, context, '99');

		// scissors
		await GetCurrencyImage('mbor', startX + sGap, startY, context, '10');
	}

	async function drawStats(
		context: CanvasRenderingContext2D,
		isOnImg: boolean = false,
		shadowsOpacity: number = 0.75,
		showAnime: boolean = true,
		showManga: boolean = true,
		flip: boolean = false
	): Promise<void> {
		let statsX = flip ? 407 : 16;
		let statsY = 24 + 160;

		if (showAnime) {
			if (isOnImg) {
				await fillRoundedRect(
					statsX - 3,
					statsY - 3,
					325 + 6,
					122 + 6,
					8,
					`rgba(0, 0, 0, ${shadowsOpacity})`,
					context
				);
			}
			const animeImg = await loadImage('/profile_assets/user/statsAnimePlaceholder.png');
			drawImage(animeImg, statsX, statsY, 325, 122, context);
			statsY += 147;
		}
		if (showManga) {
			if (isOnImg) {
				await fillRoundedRect(
					statsX - 3,
					statsY - 3,
					325 + 6,
					122 + 6,
					8,
					`rgba(0, 0, 0, ${shadowsOpacity})`,
					context
				);
			}
			const mangaImg = await loadImage('/profile_assets/user/statsMangaPlaceholder.png');
			drawImage(mangaImg, statsX, statsY, 325, 122, context);
		}
	}

	async function drawProfile(
		profileType: ProfileTypeEnum,
		shadowsOpacity: number,
		context: CanvasRenderingContext2D,
		flip: boolean = false
	): Promise<void> {
		let isOnImg =
			profileType === ProfileTypeEnum.StatsOnImg ||
			profileType === ProfileTypeEnum.MiniGalleryOnImg;
		switch (profileType) {
			case ProfileTypeEnum.Cards:
			case ProfileTypeEnum.CardsOnImg:
				await drawCards(context, $profileConfig.cardsAmount);
				break;
			case ProfileTypeEnum.MiniGallery:
			case ProfileTypeEnum.MiniGalleryOnImg:
				if ($profileConfig.miniGallery)
					await drawMiniGallery(context, $profileConfig.isSmall, isOnImg, shadowsOpacity, flip);

				if ($profileConfig.cardsStats)
					await drawWaifuProfile(context, isOnImg, shadowsOpacity, flip, $profileConfig.karma);
				break;
			case ProfileTypeEnum.Stats:
			case ProfileTypeEnum.StatsOnImg:
			case ProfileTypeEnum.StatsWithImg:
				await drawStats(
					context,
					isOnImg,
					shadowsOpacity,
					$profileConfig.animeStats,
					$profileConfig.mangaStats,
					$profileConfig.flip
				);

				if ($profileConfig.cardsStats)
					await drawWaifuProfile(context, isOnImg, shadowsOpacity, flip, $profileConfig.karma);

				if ($profileConfig.image && profileType === ProfileTypeEnum.StatsWithImg) {
					const profileImage = await loadImage($profileConfig.image);
					await drawImage(profileImage, 0, 160, 750, 340, context);
				}
				break;
			case ProfileTypeEnum.Img:
			default:
				break;
		}
	}

	async function loadProfile(): Promise<void> {
		// set background color
		await fillRect(0, 0, width, height, background, context);

		// Image background
		const imgBg = await loadImage(
			$profileConfig.background ? $profileConfig.background : '/profile_assets/pbg.png'
		);
		await drawImage(imgBg, 0, 0, width, 160, context);

		// Image shadow base
		const imgBase = await loadImage('/profile_assets/pbase.png');
		await drawImage(imgBase, 0, 0, imgBase.width, imgBase.height, context);

		// Image profile
		if (
			$profileConfig.image &&
			$profileConfig.profileType != ProfileTypeEnum.Stats &&
			$profileConfig.profileType != ProfileTypeEnum.StatsWithImg &&
			$profileConfig.profileType != ProfileTypeEnum.Cards &&
			$profileConfig.profileType != ProfileTypeEnum.MiniGallery
		) {
			const profileImage = await loadImage($profileConfig.image);
			await drawImage(profileImage, 0, 160, 750, 340, context);
		}

		// mini waifu card
		if ($profileConfig.miniWaifu) {
			const imgWaifu = await loadImage('/profile_assets/user/cards/1.webp');
			await fillRoundedRect(618, 30, 85 + 8, 120 + 7, 8, '#00000050', context);
			await drawImage(imgWaifu, 622, 34, 85, 120, context);
		}

		// profil type
		await drawProfile(
			$profileConfig.profileType,
			$profileConfig.shadowsOpacity,
			context,
			$profileConfig.flip
		);

		// profile bar
		await drawProfileBar(
			$profileConfig.barTop,
			$profileConfig.barOpacity,
			context,
			$profileConfig.shadowsOpacity
		);

		// nickname and rank
		const avatarX = 52;
		const avatarY = 68;
		const avatarSize = 80;

		await drawNickAndRank(avatarX, avatarSize, 'Użytkownik', 'Testowy', context);

		// overlay
		if ($profileConfig.overlay) {
			const overlay = await loadImage($profileConfig.overlay);
			await drawImage(overlay, 0, 98, 750, 402, context);
		}

		// Avatar
		const avatar = await loadImage('/profile_assets/user/avatar.png');

		await drawAvatar(
			avatar,
			avatarX,
			avatarY,
			avatarSize,
			$profileConfig.avatarBorderColor,
			$profileConfig.hasRoundAvatar,
			context,
			$profileConfig.avatarBorder,
			$profileConfig.levelBorder
		);

		// premium overlay
		if ($profileConfig.premiumOverlay) {
			const premiumOverlay = await loadImage($profileConfig.premiumOverlay);
			await drawImage(premiumOverlay, 0, 0, 750, 500, context);
		}
	}

	onMount(() => {
		context = canvas.getContext('2d')!;

		profileConfig.subscribe(() => {
			loadProfile();
		});
	});
</script>

<svelte:window />

<canvas {width} {height} bind:this={canvas} />
