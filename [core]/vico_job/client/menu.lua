local lib = exports.ox_lib

local function createJobOption(jobId, jobData)
    return {
        title = jobData.label,
        description = jobData.description,
        icon = jobData.icon,
        onSelect = function()
            TriggerServerEvent('jobs:set', jobId)
        end
    }
end

local function openJobMenu()
    local options = {}
    
    if not Config.Jobs or next(Config.Jobs) == nil then
        print('Erreur : Config.Jobs est vide ou nil.')
        return
    end

    for jobId, jobData in pairs(Config.Jobs) do
        if jobData.label and jobData.icon and jobData.description then
            local option = createJobOption(jobId, jobData)
            table.insert(options, option)
        else
            print('Données manquantes pour le métier :', jobId)
        end
    end

    if #options == 0 then
        print('Erreur : Aucune option valide pour le menu.')
        return
    end

    lib.registerContext({
        id = 'job_menu',
        title = 'Sélection du métier',
        options = options
    })
    
    lib.showContext('job_menu')
end


-- Commande pour ouvrir le menu
RegisterCommand('jobs', function()
    openJobMenu()
end)