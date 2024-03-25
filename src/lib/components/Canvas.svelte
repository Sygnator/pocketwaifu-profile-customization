<script lang="ts" context="module">
	export enum ProfileTypeEnum {
		Cards,
		MiniGallery
	}
</script>

<script lang="ts">
	import FontFaceObserver from 'fontfaceobserver';
	import type FontFaceObserverOptions from 'fontfaceobserver';

	import { onMount } from 'svelte';

	export let width = 750;
	export let height = 500;
	export let background = '#313338';
	// export let color = '#7f7f7f';

	let canvas: HTMLCanvasElement;

	let context: CanvasRenderingContext2D;

	function loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = src;
		});
	}

	async function drawImage(
		image: HTMLImageElement,
		dx: number,
		dy: number,
		dw: number,
		dh: number,
		context: CanvasRenderingContext2D
	): Promise<void> {
		await image.decode();
		context.drawImage(image, dx, dy, dw, dh);
	}

	async function drawRoundedImage(
		image: HTMLImageElement,
		dx: number,
		dy: number,
		dw: number,
		dh: number,
		radius: number,
		context: CanvasRenderingContext2D
	): Promise<void> {
		await image.decode();

		context.save();

		context.clearRect(0, 0, 0, 0);

		context.beginPath();
		context.arc(dx + radius, dy + radius, radius, 0, Math.PI * 2);
		context.closePath();
		context.clip();

		context.drawImage(image, dx, dy, dw, dh);

		context.restore();
	}

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
	 * Fills a rounded rectangle.
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

	async function drawAvatar(
		image: HTMLImageElement,
		avatarX: number,
		avatarY: number,
		avatarSize: number,
		avatarBorderColor: string,
		hasRoundAvatar: boolean,
		nickname: string,
		context: CanvasRenderingContext2D
	): Promise<void> {
		const borderSize = 2;
		const tSize = avatarSize + borderSize * 2;
		const gSize = 1;
		const gOff = gSize * 2;
		await image.decode();

		// Avatar back
		hasRoundAvatar
			? await fillRoundedRect(avatarX, avatarY, tSize, tSize, 40, '#3f3f3f', context)
			: await fillRect(avatarX, avatarY, tSize, tSize, '#3f3f3f', context);

		// Avatar border
		hasRoundAvatar
			? await fillRoundedRect(
					avatarX + gSize,
					avatarY + gSize,
					avatarSize + gOff,
					avatarSize + gOff,
					40,
					avatarBorderColor,
					context
				)
			: await fillRect(
					avatarX + gSize,
					avatarY + gSize,
					avatarSize + gOff,
					avatarSize + gOff,
					avatarBorderColor,
					context
				);

		// Avatar image
		hasRoundAvatar
			? await drawRoundedImage(
					image,
					avatarX + borderSize,
					avatarY + borderSize,
					avatarSize,
					avatarSize,
					40,
					context
				)
			: await drawImage(
					image,
					avatarX + borderSize,
					avatarY + borderSize,
					avatarSize,
					avatarSize,
					context
				);

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
			'Leniwiec',
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
		barOpacity: number,
		context: CanvasRenderingContext2D
	): Promise<void> {
		// profile bar background
		await fillRoundedRect(
			25,
			barTop ? -16 : 476,
			700,
			40,
			8,
			`rgba(0, 0, 0, ${barOpacity})`,
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

	async function drawCards(context: CanvasRenderingContext2D): Promise<void> {
		let cardX = 4 + 15;
		let cardY = 19 + 160 - 15;

		for (let i = 1; i <= 12; i++) {
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

	async function drawProfile(
		profileType: ProfileTypeEnum,
		shadowsOpacity: number,
		context: CanvasRenderingContext2D
	): Promise<void> {
		switch (profileType) {
			case ProfileTypeEnum.Cards:
				drawCards(context);
				break;
			case ProfileTypeEnum.MiniGallery:
				drawMiniGallery(context);
				break;
			default:
				break;
		}
	}

	async function loadProfile(): Promise<void> {
		// global opacity
		let shadowsOpacity = 0.4;

		// set background color
		await fillRect(0, 0, width, height, background, context);

		// Image background
		const imgBg = await loadImage('/profile_assets/pbg.png');
		await drawImage(imgBg, 0, 0, width, imgBg.height, context);

		// Image shadow base
		const imgBase = await loadImage('/profile_assets/pbase.png');
		await drawImage(imgBase, 0, 0, imgBase.width, imgBase.height, context);

		// Avatar
		const avatar = await loadImage('/profile_assets/user/avatar.png');

		const avatarX = 52;
		const avatarY = 68;
		const avatarSize = 80;

		const avatarBorderColor = '#ff1122';
		const nickname = 'Testowy user';

		let hasRoundAvatar = false;

		await drawAvatar(
			avatar,
			avatarX,
			avatarY,
			avatarSize,
			avatarBorderColor,
			hasRoundAvatar,
			nickname,
			context
		);

		// mini waifu card
		const imgWaifu = await loadImage('/profile_assets/user/cards/1.webp');
		await fillRoundedRect(618, 30, 85 + 8, 120 + 7, 8, '#00000050', context);
		await drawImage(imgWaifu, 622, 34, 85, 120, context);

		// profile bar
		let barTop = false;
		let barOpacity = 0.75;

		await drawProfileBar(barTop, barOpacity, context);

		// profil type

		let profileType = ProfileTypeEnum.MiniGallery;
		await drawProfile(profileType, shadowsOpacity, context);
	}

	onMount(() => {
		context = canvas.getContext('2d')!;

		loadProfile();
	});
</script>

<svelte:window />

<canvas {width} {height} bind:this={canvas} />
