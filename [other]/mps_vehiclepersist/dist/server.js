var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/@overextended+oxmysql@1.3.0/node_modules/@overextended/oxmysql/MySQL.js
var require_MySQL = __commonJS({
  "node_modules/.pnpm/@overextended+oxmysql@1.3.0/node_modules/@overextended/oxmysql/MySQL.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.oxmysql = void 0;
    var QueryStore = [];
    function assert(condition, message) {
      if (!condition)
        throw new TypeError(message);
    }
    __name(assert, "assert");
    var safeArgs = /* @__PURE__ */ __name((query, params, cb, transaction) => {
      if (typeof query === "number")
        query = QueryStore[query];
      if (transaction) {
        assert(typeof query === "object", `First argument expected object, recieved ${typeof query}`);
      } else {
        assert(typeof query === "string", `First argument expected string, received ${typeof query}`);
      }
      if (params) {
        const paramType = typeof params;
        assert(paramType === "object" || paramType === "function", `Second argument expected object or function, received ${paramType}`);
        if (!cb && paramType === "function") {
          cb = params;
          params = void 0;
        }
      }
      if (cb !== void 0)
        assert(typeof cb === "function", `Third argument expected function, received ${typeof cb}`);
      return [query, params, cb];
    }, "safeArgs");
    var exp = global.exports.oxmysql;
    var currentResourceName = GetCurrentResourceName();
    function execute(method, query, params) {
      return new Promise((resolve, reject) => {
        exp[method](query, params, (result, error) => {
          if (error)
            return reject(error);
          resolve(result);
        }, currentResourceName, true);
      });
    }
    __name(execute, "execute");
    exports2.oxmysql = {
      store(query) {
        assert(typeof query !== "string", `Query expects a string, received ${typeof query}`);
        return QueryStore.push(query);
      },
      ready(callback) {
        setImmediate(async () => {
          while (GetResourceState("oxmysql") !== "started")
            await new Promise((resolve) => setTimeout(resolve, 50));
          callback();
        });
      },
      async query(query, params, cb) {
        [query, params, cb] = safeArgs(query, params, cb);
        const result = await execute("query", query, params);
        return cb ? cb(result) : result;
      },
      async single(query, params, cb) {
        [query, params, cb] = safeArgs(query, params, cb);
        const result = await execute("single", query, params);
        return cb ? cb(result) : result;
      },
      async scalar(query, params, cb) {
        [query, params, cb] = safeArgs(query, params, cb);
        const result = await execute("scalar", query, params);
        return cb ? cb(result) : result;
      },
      async update(query, params, cb) {
        [query, params, cb] = safeArgs(query, params, cb);
        const result = await execute("update", query, params);
        return cb ? cb(result) : result;
      },
      async insert(query, params, cb) {
        [query, params, cb] = safeArgs(query, params, cb);
        const result = await execute("insert", query, params);
        return cb ? cb(result) : result;
      },
      async prepare(query, params, cb) {
        [query, params, cb] = safeArgs(query, params, cb);
        const result = await execute("prepare", query, params);
        return cb ? cb(result) : result;
      },
      async rawExecute(query, params, cb) {
        [query, params, cb] = safeArgs(query, params, cb);
        const result = await execute("rawExecute", query, params);
        return cb ? cb(result) : result;
      },
      async transaction(query, params, cb) {
        [query, params, cb] = safeArgs(query, params, cb, true);
        const result = await execute("transaction", query, params);
        return cb ? cb(result) : result;
      },
      isReady() {
        return exp.isReady();
      },
      async awaitConnection() {
        return await exp.awaitConnection();
      }
    };
  }
});

// node_modules/.pnpm/boolean@3.2.0/node_modules/boolean/build/lib/boolean.js
var require_boolean = __commonJS({
  "node_modules/.pnpm/boolean@3.2.0/node_modules/boolean/build/lib/boolean.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.boolean = void 0;
    var boolean = /* @__PURE__ */ __name(function(value) {
      switch (Object.prototype.toString.call(value)) {
        case "[object String]":
          return ["true", "t", "yes", "y", "on", "1"].includes(value.trim().toLowerCase());
        case "[object Number]":
          return value.valueOf() === 1;
        case "[object Boolean]":
          return value.valueOf();
        default:
          return false;
      }
    }, "boolean");
    exports2.boolean = boolean;
  }
});

// node_modules/.pnpm/boolean@3.2.0/node_modules/boolean/build/lib/isBooleanable.js
var require_isBooleanable = __commonJS({
  "node_modules/.pnpm/boolean@3.2.0/node_modules/boolean/build/lib/isBooleanable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isBooleanable = void 0;
    var isBooleanable = /* @__PURE__ */ __name(function(value) {
      switch (Object.prototype.toString.call(value)) {
        case "[object String]":
          return [
            "true",
            "t",
            "yes",
            "y",
            "on",
            "1",
            "false",
            "f",
            "no",
            "n",
            "off",
            "0"
          ].includes(value.trim().toLowerCase());
        case "[object Number]":
          return [0, 1].includes(value.valueOf());
        case "[object Boolean]":
          return true;
        default:
          return false;
      }
    }, "isBooleanable");
    exports2.isBooleanable = isBooleanable;
  }
});

// node_modules/.pnpm/boolean@3.2.0/node_modules/boolean/build/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/boolean@3.2.0/node_modules/boolean/build/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isBooleanable = exports2.boolean = void 0;
    var boolean_1 = require_boolean();
    Object.defineProperty(exports2, "boolean", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return boolean_1.boolean;
    }, "get") });
    var isBooleanable_1 = require_isBooleanable();
    Object.defineProperty(exports2, "isBooleanable", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return isBooleanable_1.isBooleanable;
    }, "get") });
  }
});

// node_modules/.pnpm/fast-printf@1.6.9/node_modules/fast-printf/dist/src/tokenize.js
var require_tokenize = __commonJS({
  "node_modules/.pnpm/fast-printf@1.6.9/node_modules/fast-printf/dist/src/tokenize.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.tokenize = void 0;
    var TokenRule = /(?:%(?<flag>([+0-]|-\+))?(?<width>\d+)?(?<position>\d+\$)?(?<precision>\.\d+)?(?<conversion>[%BCESb-iosux]))|(\\%)/g;
    var tokenize = /* @__PURE__ */ __name((subject) => {
      let matchResult;
      const tokens = [];
      let argumentIndex = 0;
      let lastIndex = 0;
      let lastToken = null;
      while ((matchResult = TokenRule.exec(subject)) !== null) {
        if (matchResult.index > lastIndex) {
          lastToken = {
            literal: subject.slice(lastIndex, matchResult.index),
            type: "literal"
          };
          tokens.push(lastToken);
        }
        const match = matchResult[0];
        lastIndex = matchResult.index + match.length;
        if (match === "\\%" || match === "%%") {
          if (lastToken && lastToken.type === "literal") {
            lastToken.literal += "%";
          } else {
            lastToken = {
              literal: "%",
              type: "literal"
            };
            tokens.push(lastToken);
          }
        } else if (matchResult.groups) {
          lastToken = {
            conversion: matchResult.groups.conversion,
            flag: matchResult.groups.flag || null,
            placeholder: match,
            position: matchResult.groups.position ? Number.parseInt(matchResult.groups.position, 10) - 1 : argumentIndex++,
            precision: matchResult.groups.precision ? Number.parseInt(matchResult.groups.precision.slice(1), 10) : null,
            type: "placeholder",
            width: matchResult.groups.width ? Number.parseInt(matchResult.groups.width, 10) : null
          };
          tokens.push(lastToken);
        }
      }
      if (lastIndex <= subject.length - 1) {
        if (lastToken && lastToken.type === "literal") {
          lastToken.literal += subject.slice(lastIndex);
        } else {
          tokens.push({
            literal: subject.slice(lastIndex),
            type: "literal"
          });
        }
      }
      return tokens;
    }, "tokenize");
    exports2.tokenize = tokenize;
  }
});

// node_modules/.pnpm/fast-printf@1.6.9/node_modules/fast-printf/dist/src/createPrintf.js
var require_createPrintf = __commonJS({
  "node_modules/.pnpm/fast-printf@1.6.9/node_modules/fast-printf/dist/src/createPrintf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createPrintf = void 0;
    var boolean_1 = require_lib();
    var tokenize_1 = require_tokenize();
    var formatDefaultUnboundExpression = /* @__PURE__ */ __name((subject, token) => {
      return token.placeholder;
    }, "formatDefaultUnboundExpression");
    var createPrintf = /* @__PURE__ */ __name((configuration) => {
      var _a;
      const padValue = /* @__PURE__ */ __name((value, width, flag) => {
        if (flag === "-") {
          return value.padEnd(width, " ");
        } else if (flag === "-+") {
          return ((Number(value) >= 0 ? "+" : "") + value).padEnd(width, " ");
        } else if (flag === "+") {
          return ((Number(value) >= 0 ? "+" : "") + value).padStart(width, " ");
        } else if (flag === "0") {
          return value.padStart(width, "0");
        } else {
          return value.padStart(width, " ");
        }
      }, "padValue");
      const formatUnboundExpression = (_a = configuration === null || configuration === void 0 ? void 0 : configuration.formatUnboundExpression) !== null && _a !== void 0 ? _a : formatDefaultUnboundExpression;
      const cache2 = {};
      return (subject, ...boundValues) => {
        let tokens = cache2[subject];
        if (!tokens) {
          tokens = cache2[subject] = tokenize_1.tokenize(subject);
        }
        let result = "";
        for (const token of tokens) {
          if (token.type === "literal") {
            result += token.literal;
          } else {
            let boundValue = boundValues[token.position];
            if (boundValue === void 0) {
              result += formatUnboundExpression(subject, token, boundValues);
            } else if (token.conversion === "b") {
              result += boolean_1.boolean(boundValue) ? "true" : "false";
            } else if (token.conversion === "B") {
              result += boolean_1.boolean(boundValue) ? "TRUE" : "FALSE";
            } else if (token.conversion === "c") {
              result += boundValue;
            } else if (token.conversion === "C") {
              result += String(boundValue).toUpperCase();
            } else if (token.conversion === "i" || token.conversion === "d") {
              boundValue = String(Math.trunc(boundValue));
              if (token.width !== null) {
                boundValue = padValue(boundValue, token.width, token.flag);
              }
              result += boundValue;
            } else if (token.conversion === "e") {
              result += Number(boundValue).toExponential();
            } else if (token.conversion === "E") {
              result += Number(boundValue).toExponential().toUpperCase();
            } else if (token.conversion === "f") {
              if (token.precision !== null) {
                boundValue = Number(boundValue).toFixed(token.precision);
              }
              if (token.width !== null) {
                boundValue = padValue(String(boundValue), token.width, token.flag);
              }
              result += boundValue;
            } else if (token.conversion === "o") {
              result += (Number.parseInt(String(boundValue), 10) >>> 0).toString(8);
            } else if (token.conversion === "s") {
              if (token.width !== null) {
                boundValue = padValue(String(boundValue), token.width, token.flag);
              }
              result += boundValue;
            } else if (token.conversion === "S") {
              if (token.width !== null) {
                boundValue = padValue(String(boundValue), token.width, token.flag);
              }
              result += String(boundValue).toUpperCase();
            } else if (token.conversion === "u") {
              result += Number.parseInt(String(boundValue), 10) >>> 0;
            } else if (token.conversion === "x") {
              boundValue = (Number.parseInt(String(boundValue), 10) >>> 0).toString(16);
              if (token.width !== null) {
                boundValue = padValue(String(boundValue), token.width, token.flag);
              }
              result += boundValue;
            } else {
              throw new Error("Unknown format specifier.");
            }
          }
        }
        return result;
      };
    }, "createPrintf");
    exports2.createPrintf = createPrintf;
  }
});

// node_modules/.pnpm/fast-printf@1.6.9/node_modules/fast-printf/dist/src/printf.js
var require_printf = __commonJS({
  "node_modules/.pnpm/fast-printf@1.6.9/node_modules/fast-printf/dist/src/printf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.printf = exports2.createPrintf = void 0;
    var createPrintf_1 = require_createPrintf();
    Object.defineProperty(exports2, "createPrintf", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return createPrintf_1.createPrintf;
    }, "get") });
    exports2.printf = createPrintf_1.createPrintf();
  }
});

// node_modules/.pnpm/@overextended+ox_core@1.2.0/node_modules/@overextended/ox_core/package/lib/index.js
var Ox = exports.ox_core;

// node_modules/.pnpm/@overextended+ox_core@1.2.0/node_modules/@overextended/ox_core/package/lib/server/account.js
var _AccountInterface = class _AccountInterface {
  constructor(accountId) {
    this.accountId = accountId;
  }
};
__name(_AccountInterface, "AccountInterface");
var AccountInterface = _AccountInterface;
Object.keys(exports.ox_core.GetAccountCalls()).forEach((method) => {
  AccountInterface.prototype[method] = function(...args) {
    return exports.ox_core.CallAccount(this.accountId, method, ...args);
  };
});
AccountInterface.prototype.toString = function() {
  return JSON.stringify(this, null, 2);
};
function CreateAccountInstance(account) {
  if (!account)
    return;
  return new AccountInterface(account.accountId);
}
__name(CreateAccountInstance, "CreateAccountInstance");
async function GetCharacterAccount(charId) {
  const account = await exports.ox_core.GetCharacterAccount(charId);
  return CreateAccountInstance(account);
}
__name(GetCharacterAccount, "GetCharacterAccount");

// node_modules/.pnpm/@overextended+ox_core@1.2.0/node_modules/@overextended/ox_core/package/lib/server/player.js
var _PlayerInterface = class _PlayerInterface {
  constructor(source2, userId, charId, stateId, username, identifier, ped) {
    this.source = source2;
    this.userId = userId;
    this.charId = charId;
    this.stateId = stateId;
    this.username = username;
    this.identifier = identifier;
    this.ped = ped;
    this.source = source2;
    this.userId = userId;
    this.charId = charId;
    this.stateId = stateId;
    this.username = username;
    this.identifier = identifier;
    this.ped = ped;
  }
  getCoords() {
    return GetEntityCoords(this.ped);
  }
  getState() {
    return Player(source).state;
  }
  async getAccount() {
    return this.charId ? GetCharacterAccount(this.charId) : null;
  }
};
__name(_PlayerInterface, "PlayerInterface");
var PlayerInterface = _PlayerInterface;
Object.keys(exports.ox_core.GetPlayerCalls()).forEach((method) => {
  PlayerInterface.prototype[method] = function(...args) {
    return exports.ox_core.CallPlayer(this.source, method, ...args);
  };
});
PlayerInterface.prototype.toString = function() {
  return JSON.stringify(this, null, 2);
};

// node_modules/.pnpm/@overextended+ox_core@1.2.0/node_modules/@overextended/ox_core/package/lib/server/vehicle.js
var _VehicleInterface = class _VehicleInterface {
  constructor(entity, netId, script, plate, model, make, id, vin, owner, group) {
    this.entity = entity;
    this.netId = netId;
    this.script = script;
    this.plate = plate;
    this.model = model;
    this.make = make;
    this.id = id;
    this.vin = vin;
    this.owner = owner;
    this.group = group;
    this.entity = entity;
    this.netId = netId;
    this.script = script;
    this.plate = plate;
    this.model = model;
    this.make = make;
    this.id = id;
    this.vin = vin;
    this.owner = owner;
    this.group = group;
  }
  getCoords() {
    return GetEntityCoords(this.entity);
  }
  getState() {
    return Entity(this.entity).state;
  }
};
__name(_VehicleInterface, "VehicleInterface");
var VehicleInterface = _VehicleInterface;
Object.keys(exports.ox_core.GetVehicleCalls()).forEach((method) => {
  VehicleInterface.prototype[method] = function(...args) {
    return exports.ox_core.CallVehicle(this.entity, method, ...args);
  };
});
VehicleInterface.prototype.toString = function() {
  return JSON.stringify(this, null, 2);
};
function CreateVehicleInstance(vehicle) {
  if (!vehicle)
    return;
  return new VehicleInterface(vehicle.entity, vehicle.netId, vehicle.script, vehicle.plate, vehicle.model, vehicle.make, vehicle.id, vehicle.vin, vehicle.owner, vehicle.group);
}
__name(CreateVehicleInstance, "CreateVehicleInstance");
function GetVehicle(entityId) {
  return CreateVehicleInstance(exports.ox_core.GetVehicle(entityId));
}
__name(GetVehicle, "GetVehicle");
async function SpawnVehicle(dbId, coords, heading) {
  return CreateVehicleInstance(await exports.ox_core.SpawnVehicle(dbId, coords, heading));
}
__name(SpawnVehicle, "SpawnVehicle");

// src/server/index.ts
var import_oxmysql = __toESM(require_MySQL(), 1);

// node_modules/.pnpm/@overextended+ox_lib@3.25.0/node_modules/@overextended/ox_lib/shared/resource/cache/index.js
var cacheEvents = {};
var cache = new Proxy({
  resource: GetCurrentResourceName(),
  game: GetGameName()
}, {
  get(target, key) {
    const result = key ? target[key] : target;
    if (result !== void 0)
      return result;
    cacheEvents[key] = [];
    AddEventHandler(`ox_lib:cache:${key}`, (value) => {
      const oldValue = target[key];
      const events = cacheEvents[key];
      events.forEach((cb) => cb(value, oldValue));
      target[key] = value;
    });
    target[key] = exports.ox_lib.cache(key) || false;
    return target[key];
  }
});

// node_modules/.pnpm/@overextended+ox_lib@3.25.0/node_modules/@overextended/ox_lib/shared/resource/locale/index.js
var import_fast_printf = __toESM(require_printf());
var dict = {};
function flattenDict(source2, target, prefix) {
  for (const key in source2) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = source2[key];
    if (typeof value === "object")
      flattenDict(value, target, fullKey);
    else
      target[fullKey] = String(value);
  }
  return target;
}
__name(flattenDict, "flattenDict");
function loadLocale(key) {
  const data = LoadResourceFile(cache.resource, `locales/${key}.json`);
  if (!data)
    console.warn(`could not load 'locales/${key}.json'`);
  return JSON.parse(data) || {};
}
__name(loadLocale, "loadLocale");
var initLocale = /* @__PURE__ */ __name((key) => {
  const lang = key || exports.ox_lib.getLocaleKey();
  let locales = loadLocale("en");
  if (lang !== "en")
    Object.assign(locales, loadLocale(lang));
  const flattened = flattenDict(locales, {});
  for (let [k, v] of Object.entries(flattened)) {
    if (typeof v === "string") {
      const regExp = new RegExp(/\$\{([^}]+)\}/g);
      const matches = v.match(regExp);
      if (matches) {
        for (const match of matches) {
          if (!match)
            break;
          const variable = match.substring(2, match.length - 1);
          let locale = flattened[variable];
          if (locale) {
            v = v.replace(match, locale);
          }
        }
      }
    }
    dict[k] = v;
  }
}, "initLocale");
initLocale();

// node_modules/.pnpm/@overextended+ox_lib@3.25.0/node_modules/@overextended/ox_lib/server/resource/callback/index.js
var pendingCallbacks = {};
var callbackTimeout = GetConvarInt("ox:callbackTimeout", 6e4);
onNet(`__ox_cb_${cache.resource}`, (key, ...args) => {
  const resolve = pendingCallbacks[key];
  delete pendingCallbacks[key];
  return resolve && resolve(...args);
});

// node_modules/.pnpm/@overextended+ox_lib@3.25.0/node_modules/@overextended/ox_lib/server/resource/version/index.js
var versionCheck = /* @__PURE__ */ __name((repository) => exports.ox_lib.versionCheck(repository), "versionCheck");

// node_modules/.pnpm/@overextended+ox_lib@3.25.0/node_modules/@overextended/ox_lib/server/resource/addCommand/index.js
var registeredCommmands = [];
var shouldSendCommands = false;
setTimeout(() => {
  shouldSendCommands = true;
  emitNet("chat:addSuggestions", -1, registeredCommmands);
}, 1e3);
on("playerJoining", () => {
  emitNet("chat:addSuggestions", source, registeredCommmands);
});

// src/server/index.ts
var dev = GetConvarInt("ox:debug", 0) === 1;
var doVersionCheck = GetConvarInt("persistvehicles:versioncheck", 1) === 1;
var DEBUG = /* @__PURE__ */ __name((...args) => {
  if (!dev) return;
  console.log(`[^4${GetCurrentResourceName()}^7]`, ...args);
}, "DEBUG");
var SaveAllVehicles = /* @__PURE__ */ __name(async () => {
  const vehicles = GetAllVehicles();
  let saved = 0;
  for (const entityId of vehicles) {
    const vehicle = GetVehicle(entityId);
    if (!vehicle) continue;
    const coords = GetEntityCoords(entityId);
    const rotation = GetEntityRotation(entityId);
    const health = GetEntityHealth(entityId);
    if (health >= 50) {
      try {
        import_oxmysql.oxmysql.insert("INSERT INTO `vehicles_persist` (id, location_x, location_y, location_z, rotation_x, rotation_y, rotation_z) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
          vehicle.id,
          coords[0],
          coords[1],
          coords[2],
          rotation[0],
          rotation[1],
          rotation[2]
        ], DEBUG);
        vehicle.setStored("parked");
        saved++;
      } catch (err) {
        DEBUG("Unable to save", vehicle.id, vehicle.plate, "to DB", err.message);
      }
    }
    vehicle.despawn(true);
  }
  ;
  console.log(`Saved ${saved} vehicles to the DB`);
}, "SaveAllVehicles");
var useTxAdminEvent = GetConvarInt("persistvehicles:useTxAdminEvent", 1) === 1;
on(useTxAdminEvent ? "txAdmin:events:serverShuttingDown" : "onResourceStop", (resource) => {
  if (resource !== GetCurrentResourceName()) return;
  SaveAllVehicles();
});
setTimeout(async () => {
  DEBUG(`Respawning vehicles`);
  import_oxmysql.oxmysql.query("SELECT * FROM `vehicles_persist`", async (vehicles) => {
    DEBUG("Respawning", vehicles.length, "vehicles");
    vehicles.forEach(async (vehicleData) => {
      const { id, location_x, location_y, location_z, rotation_x, rotation_y, rotation_z } = vehicleData;
      SpawnVehicle(id, [location_x, location_y, location_z + 0.98], rotation_z).then((vehicle) => {
        if (!vehicle) return DEBUG(`Vehicle ${id} was not created!`);
        SetEntityRotation(vehicle.entity, rotation_x, rotation_y, rotation_z, 0, false);
      });
    });
    import_oxmysql.oxmysql.update("DELETE FROM `vehicles_persist`");
    DEBUG(`Respawned all vehicles`);
  });
}, 1e3);
if (dev) RegisterCommand("saveallvehicles", (src) => {
  if (!IsPlayerAceAllowed(src, "group.admin")) return;
  SaveAllVehicles();
}, false);
if (doVersionCheck) {
  const repository = GetResourceMetadata(GetCurrentResourceName(), "repository", 0);
  versionCheck(repository.match(/github\.com\/([^/]+\/[^.]+)/)[1]);
}
