local createdEvidence = {}

CreateThread(function()
    while true do
        Wait(1000)

        if next(createdEvidence) then
            TriggerServerEvent('ox_police:distributeEvidence', createdEvidence)

            table.wipe(createdEvidence)
        end
    end
end)

local ammo
local glm = require 'glm'

local function createNode(item, coords, entity)
    if entity then
        coords = glm.snap(GetOffsetFromEntityGivenWorldCoords(entity, coords.x, coords.y, coords.z), vec3(1 / 2 ^ 4))
        coords = vec4(coords, NetworkGetNetworkIdFromEntity(entity))
    else
        coords = glm.snap(coords, vec3(1 / 2 ^ 4))
    end

    local entry = {
        [item] = {
            [ammo] = 1
        }
    }

    if createdEvidence[coords] then
        table.merge(createdEvidence[coords], entry)
    else
        createdEvidence[coords] = entry
    end
end

local activeLoop = false

AddEventHandler('ox_inventory:currentWeapon', function(weaponData)
    ammo = weaponData?.ammo

    if ammo and not activeLoop then
        activeLoop = true

        while true do
            Wait(0)

            if IsPedShooting(cache.ped) then
                local hit, entityHit, endCoords = lib.raycast.cam(tonumber('000111111', 2), 7, 50)

                if hit then
                    if GetEntityType(entityHit) == 0 then
                        createNode('slug', endCoords)
                    elseif NetworkGetEntityIsNetworked(entityHit) then
                        createNode('slug', endCoords, entityHit)
                    end

                    Wait(100)

                    local pedCoords = GetEntityCoords(cache.ped)
                    local direction = math.rad(math.random(360))
                    local magnitude = math.random(100) / 20

                    local coords = vec3(pedCoords.x + math.sin(direction) * magnitude, pedCoords.y + math.cos(direction) * magnitude, pedCoords.z)

                    local success, impactZ = GetGroundZFor_3dCoord(coords.x, coords.y, coords.z, true)

                    if success then
                        createNode('case', vector3(coords.xy, impactZ))
                    end
                end
            end

            if not ammo then
                activeLoop = false
                break
            end
        end
    end
end)

local evidence = {}

local function removeNode(coords)
    if evidence[coords] then
        if coords.w then
            exports.ox_target:removeEntity(coords.w, ('evidence_%s'):format(coords))
        else
            exports.ox_target:removeZone(evidence[coords])
        end

        evidence[coords] = nil
    end
end

local evidenceOption

CreateThread(function()
    while true do
        Wait(0)

        evidenceOption = nil
    end
end)

RegisterNetEvent('ox_police:updateEvidence', function(addEvidence, clearEvidence)
    for coords in pairs(addEvidence) do
        if not evidence[coords] then
            local target = {
                coords = coords,
                radius = 1 / 2 ^ 4,
                drawSprite = true,
                options = {
                    {
                        name = ('evidence_%s'):format(coords),
                        icon = 'fa-solid fa-magnifying-glass',
                        label = 'Collect evidence',
                        offsetSize = 1 / 2 ^ 3,
                        absoluteOffset = true,
                        offset = coords.w and coords.xyz,
                        canInteract = function(entity, distance, coords, name, bone)
                            if evidenceOption then
                                return false
                            else
                                evidenceOption = true
                                return true
                            end
                        end,
                        onSelect = function(data)
                            local nodes = {}
                            local targetCoords = data.coords

                            for k in pairs(evidence) do
                                if #(targetCoords - (k.w and GetOffsetFromEntityInWorldCoords(NetworkGetEntityFromNetworkId(k.w), k.x, k.y, k.z) or k)) < 1 then
                                    removeNode(k)
                                    nodes[#nodes + 1] = k
                                end
                            end

                            TriggerServerEvent('ox_police:collectEvidence', nodes)
                        end
                    }
                }
            }

            if coords.w then
                exports.ox_target:addEntity(coords.w, target.options)
                evidence[coords] = coords
            else
                evidence[coords] = exports.ox_target:addSphereZone(target)
            end
        end
    end

    for coords in pairs(clearEvidence) do
        removeNode(coords)
    end
end)
