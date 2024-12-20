-- server/jobs.lua
local function GetPlayerJobs()
    local players = {}
    
    for _, playerId in ipairs(GetPlayers()) do
        local player = exports.ox_core:GetPlayer(tonumber(playerId))
        if player then
            local playerData = {
                id = player.charid,
                source = player.source,
                name = GetPlayerName(player.source),
                identifier = player.identifier,
                job = player.job -- Assurez-vous que c'est la bonne propriété pour le job dans ox_core
            }
            table.insert(players, playerData)
        end
    end
    
    return players
end

-- server/job_server.lua
local function isAdmin(source)
    if source == 0 then return true end -- La console a toujours les droits
    local player = exports.ox_core:GetPlayer(source)
    return player and player.group == 'admin' -- Vérifie si le groupe principal est admin
end

local function addGroup(source, target, groupName)
    -- Vérifier si la source est autorisée
    if not isAdmin(source) then
        return false, "Vous n'avez pas la permission d'utiliser cette commande."
    end

    -- Obtenir le joueur cible
    local targetPlayer = exports.ox_core:GetPlayer(tonumber(target))
    if not targetPlayer then
        return false, "Joueur non trouvé."
    end

    -- Mettre à jour le groupe
    -- Note: La méthode exacte peut varier selon votre version d'ox_core
    if targetPlayer.set then
        targetPlayer.set('group', groupName)
    else
        targetPlayer.group = groupName
    end

    return true, string.format("Groupe %s ajouté au joueur %s", groupName, GetPlayerName(targetPlayer.source))
end

-- Commande pour ajouter un groupe
RegisterCommand('addgroup', function(source, args)
    if #args < 2 then
        if source == 0 then
            print("Usage: addgroup [id] [groupe]")
        else
            TriggerClientEvent('chat:addMessage', source, {
                color = {255, 0, 0},
                args = {'Système', 'Usage: /addgroup [id] [groupe]'}
            })
        end
        return
    end

    local targetId = args[1]
    local groupName = args[2]
    
    local success, message = addGroup(source, targetId, groupName)
    
    if source == 0 then
        print(message)
    else
        TriggerClientEvent('chat:addMessage', source, {
            color = success and {0, 255, 0} or {255, 0, 0},
            args = {'Système', message}
        })
    end
end, true)

-- Commande pour vérifier le groupe d'un joueur
RegisterCommand('checkgroup', function(source, args)
    local target = args[1] and tonumber(args[1]) or source
    local player = exports.ox_core:GetPlayer(target)
    
    if not player then
        if source == 0 then
            print("Joueur non trouvé.")
        else
            TriggerClientEvent('chat:addMessage', source, {
                color = {255, 0, 0},
                args = {'Système', 'Joueur non trouvé.'}
            })
        end
        return
    end
    
    -- Récupérer le groupe du joueur
    local group = player.group or 'user'
    local message = string.format("Groupe de %s: %s", GetPlayerName(target), group)
    
    if source == 0 then
        print(message)
    else
        TriggerClientEvent('chat:addMessage', source, {
            color = {255, 255, 0},
            args = {'Système', message}
        })
    end
end, false)