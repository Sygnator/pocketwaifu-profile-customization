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

		// Nickname
		const latoFont: FontFaceObserverOptions = new FontFaceObserver('Lato', {
			weight: 400
		});

		let nX = 27;
		nX += avatarX + tSize;
		const nY = 103;

		await latoFont.load().then(() => {
			console.log('test');

			context.fillStyle = '#a7a7a7';
			const nickFontSize: number = 28;
			context.font = `bold ${nickFontSize}px Lato`;
			context.fillText(nickname, nX, nY + (30 - nickFontSize) / 2 + nickFontSize);

			context.fillStyle = '#7f7f7f';
			const rangFontSize: number = 16;
			context.font = `${rangFontSize}px Lato`;
			context.fillText('Leniwiec', nX, nY + 32 + rangFontSize);
		});
	}

	async function loadProfile(): Promise<void> {
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
	}

	onMount(() => {
		context = canvas.getContext('2d')!;

		loadProfile();
	});
</script>

<svelte:window />

<canvas {width} {height} bind:this={canvas} />
