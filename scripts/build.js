const { build } = require('esbuild');
const sveltePlugin = require('esbuild-svelte');
const sveltePreprocess = require('svelte-preprocess');
const path = require('path');
const fs = require('fs');


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
		entryPoints: ['./src/content.ts'],
		outfile: './dist/content.js'
	});

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

	const toastJob = build({
		...commonConfig,
		entryPoints: ['./src/toast/toast.ts'],
		outbase: './src/toast',
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

	return Promise.all([contentJob, backgroundJob, popupJob, settingsJob, toastJob]).then(
		() => {
			console.log('⚡ inlining');
			inlineCssForComponent('toast').then(() => {
				console.log('⚡ Compiled');

			});
		});
}



async function inlineCssForComponent(componentName) {
    const cssFilePath = path.resolve(path.join("./", 'dist', `${componentName}.css`));
    const jsFilePath = path.resolve(path.join("./", 'dist', `${componentName}.js`));

    if (fs.existsSync(cssFilePath) && fs.existsSync(jsFilePath)) {
        const cssContents = fs.readFileSync(cssFilePath, 'utf-8');
        const jsContents = fs.readFileSync(jsFilePath, 'utf-8');
        
		const cssInjectionCode = `
            (function() {
                const style = document.createElement('style');
                style.innerHTML = \`${cssContents.replace(/`/g, "\\`")}\`; // Ensure backticks in CSS content are escaped
                document.head.appendChild(style);
            })();
        `;

		const updatedJsContents = cssInjectionCode + jsContents;

        fs.writeFileSync(jsFilePath, updatedJsContents);
        fs.unlinkSync(cssFilePath);
		fs.unlinkSync(cssFilePath.replace('.css', '.css.map'));
		 // Optionally delete the CSS file after inlining
    }
}
