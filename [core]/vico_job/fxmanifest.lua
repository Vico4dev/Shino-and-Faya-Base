fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Votre Nom'
description 'Système de sélection de métier avec ox_core'
version '1.0.0'

shared_scripts {
    '@ox_lib/init.lua', -- Assurez-vous que ox_lib est chargé
    'shared/config.lua' -- Chargez la configuration en premier
}

client_scripts {
    'client/*.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/*.lua'
}

dependencies {
    'ox_lib',
    'ox_core'
}
