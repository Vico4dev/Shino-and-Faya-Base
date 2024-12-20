Config = Config or {}
Config.Jobs = Config.Jobs or {}

Config.Groups = {
    police = {
        label = 'Police',
        grades = {
            { name = 'Cadet', salary = 1000 },
            { name = 'Officier', salary = 1500 },
            { name = 'Capitaine', salary = 2000 }
        }
    },
    ambulance = {
        label = 'Ambulancier',
        grades = {
            { name = 'Stagiaire', salary = 800 },
            { name = 'Secouriste', salary = 1200 },
            { name = 'Médecin', salary = 1800 }
        }
    },
    mechanic = {
        label = 'Mécanicien',
        grades = {
            { name = 'Apprenti', salary = 900 },
            { name = 'Technicien', salary = 1400 },
            { name = 'Chef', salary = 1900 }
        }
    }
}
