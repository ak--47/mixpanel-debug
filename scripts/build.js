const { build } = require('esbuild');
const sveltePlugin = require('esbuild-svelte');
const sveltePreprocess = require('svelte-preprocess');
const fs = require('fs');
const path = require('path');



const isProdBuild = process.argv.includes('--prod');

main();

async function main() {
	const commonConfig = {
		outbase: './src',
		platform: 'browser',
		external: [],
		bundle: true,
		sourcemap: !isProdBuild,
		minify: isProdBuild,
		tsconfig: './tsconfig.json',
		drop: isProdBuild ? ['console'] : undefined
	};
	const contentJob = build({
		...commonConfig,
		entryPoints: ['./src/toast.ts'],
		outfile: './dist/toast.js'
	});

	// fs.copyFileSync(path.resolve('./src/toast.css'), path.resolve('./dist/toast.css'));
	// fs.copyFileSync(path.resolve('./public/apercu-regular-pro.woff2'), path.resolve('./dist/apercu-regular-pro.woff2'));

	const backgroundJob = build({
		...commonConfig,
		entryPoints: ['./src/background.ts'],
		outfile: './dist/background.js'
	});

	const popupJob = build({
		...commonConfig,
		entryPoints: ['./src/popup/popup.ts'],
		outbase: './src/popup',
		outdir: './dist',
		mainFields: ['svelte', 'module', 'main', 'browser'],
		plugins: [
			sveltePlugin({
				preprocess: sveltePreprocess()
			})
		]
	});


	const settingsJob = build({
		...commonConfig,
		entryPoints: ['./src/settings/settings.ts'],
		outbase: './src/settings',
		outdir: './dist',
		mainFields: ['svelte', 'module', 'main', 'browser'],
		plugins: [
			sveltePlugin({
				preprocess: sveltePreprocess()
			})
		]
	});

	return Promise.all([contentJob, backgroundJob, popupJob, settingsJob]).then(
		() => {
			console.log('⚡ Compiled');
		});
}



