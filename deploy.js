const exec = require('await-exec')
const json = require ('./package.json');

(async () => {
    try {
        console.log('starting...')
        const version = await getVersion(json.name)
        console.log(version)
        const response = await exec(`npm version ${version} --allow-same-version && npm publish`);
        console.log(response.stdout)
    } catch (e) {
        // Deal with the fact the chain failed
    }
})();

async function getVersion(packageName) {
    const stdout = (await exec(`npm info ${packageName} version`)).stdout.replace('\n', '');
    const split = stdout.split('.');
	const version = {
		major: parseInt(split[0]),
		minor: parseInt(split[split.length-2]),
		patch: parseInt(split[split.length-1])
	}
	if(version.patch < 9) version.patch++;
	else if(version.patch === 9 && version.minor < 9) {version.patch = 0; version.minor++}
	else if(version.patch === 9 && version.minor === 9 ) {version.patch = 0; version.minor = 0; version.major++;}
	return `${version.major}.${version.minor}.${version.patch}`
}