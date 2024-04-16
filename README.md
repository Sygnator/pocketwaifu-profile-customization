# Profilator

[![Made with SvelteKit](https://img.shields.io/badge/Made%20with-SvelteKit-orange)](https://kit.svelte.dev/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-blue)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Yes-blue)](https://www.typescriptlang.org/)
[![Formatted with Prettier](https://img.shields.io/badge/Formatted%20with-Prettier-ff69b4)](https://prettier.io/)
[![Linted with ESLint](https://img.shields.io/badge/Linted%20with-ESLint-4B32C3)](https://eslint.org/)

This is a sanakan profile customization and preview page.
Written in SvelteKit using Canvas.
Allows users to customize their profiles for the PocketWaifu display on discord.

Reference:

- [Sanakan](https://github.com/MZKNEK/sanakan)
- [PocketWaifu](https://github.com/Sygnator/waifu-site)

## Developing

1. Clone git repository

   ```sh
   git clone git@github.com:Sygnator/pocketwaifu-profile-customization.git
   ```

1. Install dependencies

   ```sh
   pnpm Install
   ```

1. Start a development server

   ```sh
   pnpm dev
   ```

### Additional Scripts

1. To check for linting issues

   ```sh
   pnpm run lint
   ```

1. To format the code

   ```sh
   pnpm run format
   ```

## Building

To create a production version of your app:

```sh
pnpm run build
```

You can preview the production build with `pnpm run preview`.

The `master` branch is automatically deployed to the server upon any changes.

## Contributions are welcome!

1. Fork the repository.
1. Create a new branch (`git checkout -b feature/improvement`)
1. Commit your changes (`git commit -m 'Add some feature'`)
1. Push to the branch (`git push origin feature/improvement`)
1. Create a new Pull Request.
