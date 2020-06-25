const {exec} = require('child_process');
const {cliArguments} = require('cli-argument-parser')
exec(`npm info ${cliArguments.package} version`, (error, stdout, stderr) => {
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
	const upgradeCommand = `npm version ${version.major}.${version.minor}.${version.patch} --allow-same-version`;
	console.log('Upgrading to ' + upgradeCommand)
	exec(upgradeCommand + ' && npm publish --dry-run', (error, stdout, stderr) => {
		if (error) {
			  console.error(`exec error: ${error}`);
			  return;
		}
		console.log('upgrade done..')
  });
});

