const {exec} = require('child_process');
const {cliArguments} = require('cli-argument-parser')

async () => {
	const version = await getVersion(cliArguments.package);
	console.log(`Attempting to upgrade to version: ${version}`)
	await deploy(version);
}
// console.log()
// exec(`npm info ${cliArguments.package} version`, (error, stdout, stderr) => {
// 	if (error) {
// 	  	console.error(`exec error: ${error}`);
// 	  	return;
// 	}
// 	const split = stdout.split('.');
// 	const version = {
// 		major: parseInt(split[0]),
// 		minor: parseInt(split[split.length-2]),
// 		patch: parseInt(split[split.length-1])
// 	}
// 	if(version.patch < 9) version.patch++;
// 	else if(version.patch === 9 && version.minor < 9) {version.patch = 0; version.minor++}
// 	else if(version.patch === 9 && version.minor === 9 ) {version.patch = 0; version.minor = 0; version.major++;}
// 	const upgradeCommand = `npm version ${version.major}.${version.minor}.${version.patch} --allow-same-version`;
// 	console.log('Upgrading to ' + upgradeCommand)
// 	exec(upgradeCommand + ' && npm publish --dry-run', (error, stdout, stderr) => {
// 		if (error) {
// 			  console.error(`exec error: ${error}`);
// 			  return;
// 		}
// 		console.log('upgrade done..')
//   });
// });


async function getVersion(package) {
	let newVersion = '';
	return new Promise((resolve, reject) => {
		exec(`npm info ${package} version`, (error, stdout, stderr) => {
			if (error) {
				  console.error(`exec error: ${error}`);
				  return;
			}
			const split = stdout.split('.');
			const version = {
				major: parseInt(split[0]),
				minor: parseInt(split[split.length-2]),
				patch: parseInt(split[split.length-1])
			}
			if(version.patch < 9) version.patch++;
			else if(version.patch === 9 && version.minor < 9) {version.patch = 0; version.minor++}
			else if(version.patch === 9 && version.minor === 9 ) {version.patch = 0; version.minor = 0; version.major++;}
			version = `${version.major}.${version.minor}.${version.patch}`
			// const upgradeCommand = `npm version ${version.major}.${version.minor}.${version.patch} --allow-same-version`;
		});
		return newVersion;
	});
}

async function deploy(version) {
	exec(`npm version ${version} --allow-same-version && npm publish --dry-run`, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log('upgrade done..');
	});
}