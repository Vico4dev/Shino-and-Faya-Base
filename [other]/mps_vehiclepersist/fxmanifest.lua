name 'mps_vehiclepersist'
author 'Maximus7474'
version '1.0.3'
repository 'https://github.com/Maximus7474/mps_vehiclepersist.git'
fx_version 'cerulean'
game 'gta5'
server_only 'yes'

dependencies {
	'/server:10230',
	'/onesync',
	'oxmysql',
	'ox_core',
	'ox_lib',
}

server_scripts {
	'dist/server.js',
}
