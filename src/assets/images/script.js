const fs = require('fs');

const imageFileNames = () => {
	const array = fs
		.readdirSync('src/assets/images')
		.filter((file) => file.endsWith('.png'))
		.map((file) => file.replace('@2x.png', '.png').replace('@3x.png', '.png'));
	return Array.from(new Set(array));
};
const generate = () => {
	const properties = imageFileNames()
		.map((name) => {
			const fileNames = name.split('.');
			return `${fileNames[0]}: require('./${name}')`;
		})
		.join(',\n    ');
	const string = `const Images = {
  ${properties}
};
export default Images;
`;
	fs.writeFileSync('src/assets/images/index.js', string, 'utf8');
};
generate();
