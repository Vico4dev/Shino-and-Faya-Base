-- client/job_selector.lua
local function refreshJobList()
    -- Déclencher un événement pour demander la liste au serveur
    TriggerServerEvent('vico_job:requestJobs')
end

-- Événement pour recevoir la liste des jobs depuis le serveur
RegisterNetEvent('vico_job:receiveJobs')
AddEventHandler('vico_job:receiveJobs', function(players)
    -- Traitement des données reçues
    for _, player in ipairs(players) do
        print(string.format('Joueur: %s, Job: %s', player.name, player.job or 'Aucun'))
    end
    -- Ici vous pouvez ajouter votre logique d'interface utilisateur
end)

-- Commande pour rafraîchir la liste
RegisterCommand('refreshjobs', function()
    refreshJobList()
end, false)



------------------------
-- client/groups.lua
-- Event pour notifier le client des changements de groupe
RegisterNetEvent('ox:groupChanged')
AddEventHandler('ox:groupChanged', function(group, enabled)
    local message = enabled and 
        string.format("Vous avez reçu le groupe: %s", group) or 
        string.format("Vous avez perdu le groupe: %s", group)
    
    -- Notification au joueur
    TriggerEvent('chat:addMessage', {
        color = enabled and {0, 255, 0} or {255, 0, 0},
        args = {'Système', message}
    })
end)