module.exports = {
	// When building for production, be sure to configure the purge option to remove any unused classes for the smallest file size:
	// purge: [
	// 	'./src/**/*.html',
	// 	'./src/**/*.js',
	// ],
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			backgroundColor: ['active'],
		},
	},
	plugins: [],
}
