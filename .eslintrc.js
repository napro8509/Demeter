module.exports = {
	root: true,
	extends: [
		'@react-native-community',
		'plugin:prettier/recommended',
		'plugin:react-native/all',
		'plugin:react-hooks/recommended',
	],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'prettier/prettier': [
			2,
			{
				endOfLine: 'auto',
				printWidth: 100,
				jsxSingleQuote: true,
				singleQuote: true,
				useTabs: true,
				tabWidth: 4,
			},
		],
		'react-native/sort-styles': 'off',
	},
};
