name '@overextended/ox_core'
author 'Overextended'
version '1.2.2'
license 'LGPL-3.0-or-later'
repository 'https://github.com/overextended/ox_core.git'
description 'A modern FiveM framework.'
fx_version 'cerulean'
game 'gta5'

files {
	'lib/init.lua',
	'lib/client/**.lua',
	'locales/*.json',
	'common/data/*.json',
}

dependencies {
	'/server:7290',
	'/onesync',
}

client_scripts {
	'dist/client.js',
}

server_scripts {
	'dist/server.js',
}
