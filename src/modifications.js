// To overwrite key repeat
/*
defaults write -g InitialKeyRepeat -int 9 # normal minimum is 15 (225 ms)
defaults write -g KeyRepeat -int 5 # normal minimum is 2 (30 ms)
*/

const os = require('os')
const fs = require('fs')
const karabinerBase = require('./karabinerBase')
const superdvorakBase = require('./superdvorakBase')
const {isString, isObject} = require('./utils')

let configPath = `${os.homedir()}/.config/karabiner/karabiner.json`

const CAPSLOCK = 'caps_lock'

const ENTER = 'return_or_enter'
const DELETE = 'delete_or_backspace'
const TAB = 'tab'

const RSHIFT = 'right_shift'
const LSHIFT = 'left_shift'
const SHIFT = RSHIFT

const LCONTROL = 'left_control'
const RCONTROL = 'right_control'
const CONTROL = RCONTROL

const LCOMMAND = 'left_command'
const RCOMMAND = 'right_command'
const COMMAND = RCOMMAND

const ROPTION = 'right_option'
const LOPTION = 'left_option'
const OPTION = LOPTION

const FN = 'fn'

const UP = 'up_arrow'
const DOWN = 'down_arrow'
const LEFT = 'left_arrow'
const RIGHT = 'right_arrow'

const mod1base = LSHIFT
const mod1mods = [FN]

const MOD1 = {
  name: 'MOD1',
  keys: mod1mods.concat([mod1base])
}

const MOD2 = {
  name: 'MOD2',
  keys: [LOPTION]
}

const mod3base = COMMAND
const mod3mods = MOD2.keys
// MOD3 is either ROPTION or CMD + LOPTION
const MOD3 = {
  name: 'MOD3',
  keys: mod3mods.concat([mod3base])
}


const mod4base = RCONTROL
const mod4mods = [LSHIFT, FN]

const MOD4 = {
  name: 'MOD4',
  keys: mod4mods.concat([mod4base])
}

// CONDITIONS
const INTELLIJ = {
  type: "frontmost_application_if",
  bundle_identifiers: [
    '^com\\.jetbrains\\.',
  ]
}

const INTELLIJ_UBUNTU = {
  type: "frontmost_application_if",
  bundle_identifiers: [
    '^com\\.jetbrains\\.',
    '^com\\.parallels\\.desktop\\.console',
  ]
}

const CHROME = {
  type: "frontmost_application_if",
  bundle_identifiers: [
    '^com\\.google\\.Chrome$',
  ]
}

const FINDER = {
  type: "frontmost_application_if",
  bundle_identifiers: [
    '^com\\.apple\\.finder$',
  ]
}

const ATOM = {
  type: "frontmost_application_if",
  bundle_identifiers: [
    '^com\\.github\\.atom',
  ]
}

const VSCODE = {
  type: "frontmost_application_if",
  bundle_identifiers: [
    '^com\\.microsoft\\.VSCode',
  ]
}

const VSCODE_UBUNTU = {
  type: "frontmost_application_if",
  bundle_identifiers: [
    '^com\\.microsoft\\.VSCode',
    // '^com\\.parallels\\.desktop\\.console',
  ]
}

const UBUNTU = {
  type: "frontmost_application_if",
  bundle_identifiers: [
    '^com\\.parallels\\.desktop\\.console',
  ]
}

// const msKeyboardID = {
//   "vendor_id": 1118,
//   "product_id": 1957,
//   "description": "MS_KEYBOARD"
// }
const msKeyboardID = {
  "vendor_id": 1118,
  "product_id": 219,
  "description": "MS_KEYBOARD"
}

const MS_KEYBOARD = {
  "type": "device_if",
  "identifiers": [
    msKeyboardID
  ]
}

const NOT_MS_KEYBOARD = {
  "type": "device_unless",
  "identifiers": [
    msKeyboardID
  ]
}

let complex = []

// UBUNTU is for pycharm eclipse keymap
let complexShort = [
  // TODO: ** MS KEYBOARD **

  // Fix the annoying MSKEYBOARD bug
  {when: MS_KEYBOARD, from: [[LOPTION, RCOMMAND], LEFT], to: 'a'},
  {when: MS_KEYBOARD, from: [[LOPTION, RCOMMAND], RIGHT], to: 'a'},

  // In place of L and R COMMAND is L and R OPTION
  {when: MS_KEYBOARD, from: ROPTION, to: RCOMMAND},
  {when: MS_KEYBOARD, from: LOPTION, to: DELETE},
  // In place of ROPTION is 'application'
  {when: MS_KEYBOARD, from: 'application', to: [mod3mods, mod3base]},
  // In place of LOPTION is LCOMMAND
  {when: MS_KEYBOARD, from: LCOMMAND, to: LOPTION},
  // `(non_us_backslash, top) and §(grave_accent_and_tilde, bottom) are swapped
  {when: MS_KEYBOARD, from: 'non_us_backslash', to: SHIFT},


  // TODO: ** UNIVERSAL SHORTCUTS**

  // * Universal shortcuts
  // undo
  {from: [[COMMAND, SHIFT], 'm'], to: [[COMMAND, SHIFT], 'slash']},
  {from: [COMMAND, 'm'], to: [COMMAND, 'slash']},
  // close
  {when: UBUNTU, from: [MOD2, 'c'], to: [CONTROL, 'comma']},
  {from: [COMMAND, 'c'], to: [COMMAND, 'comma']},
  {from: [MOD2, 'c'], to: [COMMAND, 'comma']},
  // preferences/settings
  {from: [MOD2, 'a'], to: [COMMAND, 'w']},
  // escape
  {from: [COMMAND, 'x'], to: 'escape'},
  // cut
  {from: [COMMAND, 'n'], to: [COMMAND, 'b']},
  // toggle fullscreen mode
  {from: [MOD2, 'x'], to: [[COMMAND, CONTROL], 'y']},

  // * Universal programming shortcuts

  // comment with line comment
  {from: [COMMAND, 'comma'], to: [COMMAND, 'open_bracket']},

  // * Utility shortcuts
  // delete whole word
  {when: NOT_MS_KEYBOARD, from: [MOD1, LCOMMAND], to: [OPTION, DELETE]},
  {when: MS_KEYBOARD, from: [MOD1, LOPTION], to: [OPTION, DELETE]},
  // delete whole line
  {when: NOT_MS_KEYBOARD, from: [COMMAND, LCOMMAND], to: [COMMAND, DELETE]},
  {when: MS_KEYBOARD, from: [COMMAND, LOPTION], to: [COMMAND, DELETE]},


  // TODO: ** ARROWS **

  // go to beggining of line
  // go to end of line
  // jump words
  {from: [MOD4, 'd'], to: [COMMAND, LEFT]},
  {from: [MOD4, 's'], to: [OPTION, LEFT]},
  {from: [MOD4, 'e'], to: [COMMAND, RIGHT]},
  {from: [MOD4, 'f'], to: [OPTION, RIGHT]},

  // MOD1 - Arrows - select text
  {from: [MOD3, 'e'], to: [SHIFT, UP]},
  {from: [MOD3, 's'], to: [SHIFT, LEFT]},
  {from: [MOD3, 'd'], to: [SHIFT, DOWN]},
  {from: [MOD3, 'f'], to: [SHIFT, RIGHT]},

  // clone caret (empty shortcut by default in intellij)
  {when: INTELLIJ_UBUNTU, from: [MOD1, 'e'], to: [[ROPTION, FN, LSHIFT], '1']},
  {when: INTELLIJ_UBUNTU, from: [MOD1, 'd'], to: [[ROPTION, FN, LSHIFT], '2']},
  {when: VSCODE_UBUNTU, from: [MOD1, 'e'], to: [[OPTION, COMMAND], UP]},
  {when: VSCODE_UBUNTU, from: [MOD1, 'd'], to: [[OPTION, COMMAND], DOWN]},


  // switcher/traverse chrome tabs
  {when: ATOM, from: [COMMAND, 'j'], to: [[COMMAND, OPTION], RIGHT]},
  {when: ATOM, from: [MOD3, 'j'], to: [[COMMAND, OPTION], LEFT]},
  // switcher/traverse chrome tabs
  {from: [COMMAND, 'j'], to: [CONTROL, TAB]},
  {from: [MOD3, 'j'], to: [[CONTROL, SHIFT], TAB]},

  // MOD1 + CMD + KARROWS - placeholder
  {from: [[MOD1, COMMAND], 'e'], to: 'a'},
  {from: [[MOD1, COMMAND], 'd'], to: 'a'},

  {from: [[MOD1, COMMAND], 's'], to: 'a'},
  {from: [[MOD1, COMMAND], 'f'], to: 'a'},


  // **APP SPECIFIC**

  // TODO: INTELLIJ
  // move line up
  {when: INTELLIJ, from: [COMMAND, 'e'], to: [[OPTION, SHIFT], UP]},
  {when: UBUNTU, from: [COMMAND, 'e'], to: [[COMMAND, SHIFT], UP]},
  // move line down
  {when: INTELLIJ, from: [COMMAND, 'd'], to: [[OPTION, SHIFT], DOWN]},
  {when: UBUNTU, from: [COMMAND, 'd'], to: [[COMMAND, SHIFT], DOWN]},
  // open terminal
  {when: INTELLIJ_UBUNTU, from: [MOD3, 'k'], to: [[OPTION, FN], 'f12']},
  // go to declaration
  {when: INTELLIJ, from: [COMMAND, 'q'], to: [COMMAND, 'n']},
  {when: UBUNTU, from: [COMMAND, 'q'], to: [FN, 'f3']},
  // refactor this..
  {when: INTELLIJ, from: [COMMAND, 'p'], to: [CONTROL, 'k']},
  {when: UBUNTU, from: [COMMAND, 'p'], to: [[CONTROL, OPTION, SHIFT], 'k']},
  // projects
  {when: INTELLIJ, from: [COMMAND, 'f'], to: [COMMAND, '1']},
  {when: UBUNTU, from: [COMMAND, 'f'], to: [OPTION, '1']},
  // new..
  {when: INTELLIJ_UBUNTU, from: [COMMAND, 'v'], to: [COMMAND, 'l']},
  // reformat code
  {when: INTELLIJ, from: [COMMAND, 'b'], to: [[COMMAND, OPTION], 'p']},
  {when: UBUNTU, from: [COMMAND, 'b'], to: [[COMMAND, SHIFT], 'y']},
  // navigate/go to file
  {when: INTELLIJ, from: [COMMAND, 'l'], to: [[COMMAND, SHIFT], 's']},
  {when: UBUNTU, from: [COMMAND, 'l'], to: [[COMMAND, SHIFT], 'o']},
  // duplicate line
  // {when: UBUNTU, from: [COMMAND, 'h'], to: [[CONTROL, OPTION], DOWN]},

  // TODO: CHROME
  // open terminal/inspector
  {when: CHROME, from: [MOD3, 'k'], to: [[OPTION, COMMAND], 'c']},

  // TODO: FINDER
  // new folder
  // {when: FINDER, from: [[SHIFT, COMMAND], 'l'], to: [] },

  // TODO: ATOM and INTELLIJ
  // extend selection
  {when: [INTELLIJ, ATOM], from: [COMMAND, 'w'], to: [OPTION, UP]},
  {when: UBUNTU, from: [COMMAND, 'w'], to: [[OPTION, SHIFT], UP]},

  // shrink selection
  {when: [INTELLIJ, ATOM], from: [COMMAND, 's'], to: [OPTION, DOWN]},
  {when: UBUNTU, from: [COMMAND, 's'], to: [[OPTION, SHIFT], DOWN]},

  // TODO: ATOM
  // duplicate line
  {when: ATOM, from: [COMMAND, 'h'], to: [[COMMAND, SHIFT], 'h']},
  // move line up (disabled: adds unnecessary modifiers)
  // {when: ATOM, from: [COMMAND, 'e'], to: [[COMMAND, CONTROL], UP]},
  // move line down (disabled: adds unnecessary modifiers)
  // {when: ATOM, from: [COMMAND, 'd'], to: [[COMMAND, CONTROL], DOWN]},
  // project explorer/pane
  {when: ATOM, from: [COMMAND, 'f'], to: [COMMAND, 'backslash']},
  // open atoms dev-tools/inspector
  {when: ATOM, from: [MOD3, 'l'], to: [[COMMAND, OPTION], 'g']},
  // create new file/dir
  {when: ATOM, from: [COMMAND, 'v'], to: [[COMMAND, OPTION], 's']},
  // jump to definition/go to declaration
  {when: ATOM, from: [COMMAND, 'q'], to: [[COMMAND, OPTION], ENTER]},
  // refactor/rename
  {when: ATOM, from: [COMMAND, 'p'], to: [[CONTROL, OPTION], 'o']},

  // {when: VSCODE, from: 'a', to: 'b'},

  // TODO: VSCODE & ATOM

  // open terminal
  // {when: [VSCC_UBUNTU], from: [MOD3, 'k'], to: [CONTROL, 'grave_accent_and_tilde']},
  {when: [ATOM, VSCODE], from: [MOD3, 'k'], to: [CONTROL, 'non_us_backslash']},
  // command palette
  {when: [ATOM, VSCODE_UBUNTU], from: [COMMAND, 'r'], to: [[COMMAND, SHIFT], 'r']},
  // file/fuzzy search / navigate to
  {when: [ATOM, VSCODE_UBUNTU], from: [COMMAND, 'l'], to: [COMMAND, 'r']},

  // TODO: VSCODE
  {when: VSCODE_UBUNTU, from: [COMMAND, 'k'], to: [COMMAND, 'v']},

  // Extend/shrink selection
  {when: VSCODE_UBUNTU, from: [COMMAND, 'w'], to: [[CONTROL, SHIFT, COMMAND], RIGHT]},
  {when: VSCODE_UBUNTU, from: [COMMAND, 's'], to: [[CONTROL, SHIFT, COMMAND], LEFT]},
  // Toggle project pane
  {when: VSCODE_UBUNTU, from: [COMMAND, 'f'], to: [COMMAND, 'n']},
  // Move line up/down
  {when: VSCODE_UBUNTU, from: [COMMAND, 'e'], to: [OPTION, UP]},
  {when: VSCODE_UBUNTU, from: [COMMAND, 'd'], to: [OPTION, DOWN]},
  // Rename
  {when: VSCODE_UBUNTU, from: [COMMAND, 'p'], to: [FN, 'f2']},
  // Replace
  {when: VSCODE_UBUNTU, from: [COMMAND, 'o'], to: [[COMMAND, OPTION], 'y']},
  // Reformat code
  {when: VSCODE_UBUNTU, from: [COMMAND, 'b'], to: [[SHIFT, OPTION], 'y']},
  // New file
  {when: VSCODE_UBUNTU, from: [COMMAND, 'v'], to: [COMMAND, 'm']},
  {when: VSCODE_UBUNTU, from: [MOD3, 'v'], to: [[COMMAND, SHIFT], 'm']},
  // Duplicate line
  {when: VSCODE_UBUNTU, from: [COMMAND, 'h'], to: [[OPTION, SHIFT], DOWN]},


  // Definition/Declaration
  {when: VSCODE_UBUNTU, from: [COMMAND, 'q'], to: [FN, 'f12']},


  // TODO: ** MOD1 LAYER **

  // Placeholders - no use for now
  {from: [MOD1, 's'], to: 'a'},
  {from: [MOD1, 'f'], to: 'a'},

  {from: [MOD1, 'q'], to: [SHIFT, 'backslash']},
  {from: [MOD1, 'w'], to: 'z'},
  {from: [MOD1, 'r'], to: 'hyphen'},
  {from: [MOD1, 't'], to: 'equal_sign'},
  {from: [MOD1, 'a'], to: [SHIFT, '2']},

  {from: [MOD1, 'g'], to: [SHIFT, 'quote']},

  {from: [MOD1, 'z'], to: [SHIFT, '4']},
  {from: [MOD1, 'x'], to: [SHIFT, '1']},
  {from: [MOD1, 'c'], to: [SHIFT, 'open_bracket']},
  // Modulo/percent
  {from: [MOD1, 'v'], to: [SHIFT, '5']},
  {from: [MOD1, 'b'], to: [SHIFT, '7']},

  // Double quote
  {from: [MOD1, 'y'], to: [SHIFT, 'q']},
  {from: [MOD1, 'u'], to: [SHIFT, 'equal_sign']},
  {from: [MOD1, 'i'], to: [SHIFT, '0']},
  // Single quote
  {from: [MOD1, 'o'], to: 'q'},
  {from: [MOD1, 'p'], to: [SHIFT, 'close_bracket']},

  {from: [MOD1, 'h'], to: [SHIFT, 'z']},
  {from: [MOD1, 'j'], to: [SHIFT, 'hyphen']},
  {from: [MOD1, 'k'], to: [SHIFT, '9']},
  {from: [MOD1, 'l'], to: 'close_bracket'},
  {from: [MOD1, 'semicolon'], to: 'quote'},

  {from: [MOD1, 'n'], to: [SHIFT, '8']},
  {from: [MOD1, 'm'], to: 'open_bracket'},
  {from: [MOD1, 'comma'], to: [SHIFT, 'w']},
  {from: [MOD1, 'period'], to: [SHIFT, 'e']},




  // MOD1 + RIGHT SHIFT = '`'
  {when: UBUNTU, from: [MOD1, 'slash'], to: 'grave_accent_and_tilde'},
  {from: [MOD1, 'slash'], to: 'non_us_backslash'},


  // TODO: ** MOD2 LAYER **

  // Ubuntu - same as MS_KB has 'non_us_backslash' and 'grave_accent_and_tilde' swapped
  {when: UBUNTU, from: [MOD2, 'y'], to: [SHIFT, 'grave_accent_and_tilde']},
  {from: [MOD2, 'y'], to: [SHIFT, 'non_us_backslash']},

  {from: [MOD2, 'n'], to: [SHIFT, '3']},
  {from: [MOD2, 'comma'], to: 'backslash'},
  {from: [MOD2, 'period'], to: [SHIFT, '6']},

  // MOD2 - numbers
  {from: [MOD2, 'h'], to: '0'},
  {from: [MOD2, 'u'], to: '1'},
  {from: [MOD2, 'j'], to: '2'},
  {from: [MOD2, 'i'], to: '3'},
  {from: [MOD2, 'k'], to: '4'},
  {from: [MOD2, 'o'], to: '5'},
  {from: [MOD2, 'l'], to: '6'},
  {from: [MOD2, 'p'], to: '7'},
  {from: [MOD2, 'semicolon'], to: '8'},
  {from: [MOD2, 'm'], to: '9'},

  // simple arrows
  {from: [MOD2, 'e'], to: UP},
  {from: [MOD2, 's'], to: LEFT},
  {from: [MOD2, 'd'], to: DOWN},
  {from: [MOD2, 'f'], to: RIGHT},


  // navigate desktops
  {from: [MOD2, 'w'], to: [LCONTROL, LEFT]},
  {from: [MOD2, 'r'], to: [LCONTROL, RIGHT]},


  // **Surroundings**
  // fixes - fix shifts not properly firing shortcuts (eg CMD+SHIFT+T)
  {from: [COMMAND, 'grave_accent_and_tilde'], to: [COMMAND, SHIFT]},
  // does not work :( {when: MS_KEYBOARD, from: [ROPTION, 'non_us_backslash'], to: [COMMAND, SHIFT]},
  {from: [COMMAND, 'slash'], to: [COMMAND, SHIFT]},

  // intellij - solve problem lightbulb ??
  {from: [MOD1, 'open_bracket'], to: [OPTION, ENTER]},
  {from: [SHIFT, 'open_bracket'], to: [SHIFT, ENTER]},
  {from: [SHIFT, 'open_bracket'], to: [SHIFT, ENTER]},
  {from: 'grave_accent_and_tilde', to: SHIFT},
  ['open_bracket', ENTER],
  ['close_bracket', ENTER],
  [LCOMMAND, DELETE],
  ['q', TAB],
  {from: TAB, to: [LSHIFT, TAB]},
  ['slash', SHIFT],

  // always right shift is pressed
  [LSHIFT, SHIFT],

  // TODO: **** SWAPS ****
  ['z', 'b'],
  {from: [SHIFT, 'z'], to: [SHIFT, 'b']},
  ['b', 'slash'],
  {from: [SHIFT, 'b'], to: [SHIFT, 'slash']},


  // TODO: **** MODIFIERS ****

  // MOD1
  {from: CAPSLOCK, to: [mod1mods, mod1base]},
  {from: 'quote', to: [mod1mods, mod1base]},
  {from: 'backslash', to: [mod1mods, mod1base]},

  // MOD3
  {from: ROPTION, to: [mod3mods, mod3base]},

  // MOD4
  {from: [LOPTION, 'spacebar'], to: [mod4mods, mod4base]},

  // // TODO: **** UBUNTU ****
  // {from: [LOPTION], to: ['a']},
]

let findDuplicates = array => {
  let uniq = array
    .map(name => ({count: 1, name}))
    .reduce((a, b) => {
        a[b.name] = (a[b.name] || 0) + b.count
        return a
      }, {}
    )

  return Object.keys(uniq).filter((a) => uniq[a] > 1)
}

let transformRule = rule => {
  if (Array.isArray(rule)) {
    let [from, to] = rule
    return {
      manipulators: [
        {
          description: `${from} => ${to}`,
          from: {key_code: from},
          to: [{key_code: to}],
          type: 'basic'
        }
      ]
    }
  }
  let from, fromMod = {}
  if (isString(rule.from)) {
    from = rule.from
  }
  else if (Array.isArray(rule.from) && rule.from.length === 1) {
    from = rule.from[0]
  }
  else {
    [fromMod, from] = rule.from

    if (Array.isArray(fromMod) && fromMod.length > 1 && fromMod.filter(isObject).length > 0) {
      // In case of use MODX and regular mods at the same time as fromMods
      let newFromMod = []
      for (let mod of fromMod) {
        if (mod.hasOwnProperty('keys')) {
          newFromMod = newFromMod.concat(mod.keys)
        }
        else if (isString(mod)) {
          newFromMod.push(mod)
        }
        else {
          throw new Error(`Unknown mod type: ${mod}`)
        }
      }
      let duplicates = findDuplicates(newFromMod)
      if (duplicates.length > 0) {
        throw new Error(`Duplicate modifiers in from: ${JSON.stringify(fromMod)}`)
      }
      fromMod = newFromMod
    }
  }
  let to, toMod
  if (isString(rule.to)) {
    to = rule.to
  }
  else {
    [toMod, to] = rule.to
  }
  let when = rule.when
  if (Array.isArray(when)) {
    let bundle_identifiers = []
    for (let elem of when) {
      bundle_identifiers = bundle_identifiers.concat(elem.bundle_identifiers)
    }
    when = {
      type: when[0].type,
      bundle_identifiers
    }
  }
  when = when ? [when] : undefined
  let modifiers = {}
  let mandatoryMods = fromMod.hasOwnProperty('keys') ? fromMod.keys : fromMod
  if (isObject(mandatoryMods) && Object.keys(mandatoryMods).length === 0) {
    modifiers.optional = 'any'
  }
  else {
    modifiers.mandatory = mandatoryMods
  }
  return {
    manipulators: [
      {
        description: `${fromMod.name || fromMod} + ${from} => ${toMod ? toMod + ' + ' : ''}${to}`,
        conditions: when,
        from: {
          key_code: from,
          modifiers
        },
        to: [
          {
            key_code: to,
            modifiers: toMod
          }
        ],
        type: 'basic'
      }
    ]
  }

}

for (let rule of complexShort) {
  let ruleTransformed = transformRule(rule)
  if (rule.debug) {
    console.log('----')
    console.log(JSON.stringify(rule, null, 2))
    console.log('=')
    console.log(JSON.stringify(ruleTransformed, null, 2))
    console.log('/---')
  }
  superdvorakBase.complex_modifications.rules.push(ruleTransformed)
}

for (let rule of complex) {
  superdvorakBase.complex_modifications.rules.push(rule)
}

karabinerBase.profiles.push(superdvorakBase)

fs.writeFileSync(configPath, JSON.stringify(karabinerBase, null, 4))

let d = new Date()
console.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} - Saved`)
