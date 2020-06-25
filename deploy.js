const {exec} = require('child_process');
let upgradeCommand = '';
exec('npm info dmock-server version', (error, stdout, stderr) => {
	if (error) {
	  	console.error(`exec error: ${error}`);
	  	return;
	}
	const split = stdout.split('.');
	if(parseInt(split[split.length-1]) < 9) upgradeCommand = 'npm version patch';
	else upgradeCommand = 'npm version minor';
	exec(upgradeCommand, (error, stdout, stderr) => {
		if (error) {
			  console.error(`exec error: ${error}`);
			  return;
		}
		console.log('upgrade done..')
  });
});

