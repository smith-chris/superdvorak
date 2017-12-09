const os = require('os')
const fs = require('fs')
const karabinerBase = require('./karabinerBase')
const superdvorakBase = require('./superdvorakBase')
const {isString, isObject} = require('./utils')

let configPath = `${os.homedir()}/.config/karabiner/karabiner.json`

const ENTER = 'return_or_enter'
const DELETE = 'delete_or_backspace'
const TAB = 'tab'

const RSHIFT = 'right_shift'
const LSHIFT = 'left_shift'
const SHIFT = RSHIFT

const LCONTROL = 'left_control'
const CONTROL = LCONTROL

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
const mod1mods = [
  LCOMMAND,
  LOPTION,
  FN
]

const MOD1 = {
  name: 'MOD1',
  keys: mod1mods.concat([mod1base])
}

const MOD2 = {
  name: 'MOD2',
  keys: ['left_option']
}

const CMD_MOD2 = {
  name: 'command + MOD2',
  keys: MOD2.keys.concat(COMMAND)
}

const mod3base = RSHIFT
const mod3mods = [
  ROPTION,
  RCOMMAND,
  FN
]

const MOD3 = {
  name: mod3base,
  keys: mod3mods.concat([mod3base])
}

// CONDITIONS
const INTELLIJ = {
  type: "frontmost_application_if",
  bundle_identifiers: [
    '^com\\.jetbrains\\.pycharm$',
  ]
}

const CHROME = {
  type: "frontmost_application_if",
  bundle_identifiers: [
    '^com\\.google\\.Chrome$',
  ]
}


let complex = [
  {
    manipulators: [
      {
        description: 'Change caps_lock to command+option+shift.',
        from: {
          key_code: 'caps_lock',
          modifiers: {
            optional: [
              'any'
            ]
          }
        },
        to: [
          {
            key_code: mod1base,
            modifiers: mod1mods
          }
        ],
        type: 'basic'
      }
    ]
  },
  {
    manipulators: [
      {
        description: 'Change caps_lock to control+command+option.',
        from: {
          key_code: 'quote',
          modifiers: {
            optional: [
              'any'
            ]
          }
        },
        to: [
          {
            key_code: mod1base,
            modifiers: mod1mods
          }
        ],
        type: 'basic'
      }
    ]
  },
  {
    manipulators: [
      {
        description: 'Change caps_lock to control+command+option.',
        from: {
          key_code: 'backslash',
          modifiers: {
            optional: [
              'any'
            ]
          }
        },
        to: [
          {
            key_code: mod1base,
            modifiers: mod1mods
          }
        ],
        type: 'basic'
      }
    ]
  },
  {
    manipulators: [
      {
        description: 'Change right option to command+option+shift.',
        from: {
          key_code: ROPTION,
          modifiers: {
            optional: [
              'any'
            ]
          }
        },
        to: [
          {
            key_code: mod3base,
            modifiers: mod3mods
          }
        ],
        type: 'basic'
      }
    ]
  }
]

let complexShort = [
  // **SHORTCUTS**
  // * Universal shortcuts
  // undo
  {from: [[COMMAND, SHIFT], 'm'], to: [[COMMAND, SHIFT], 'slash']},
  {from: [COMMAND, 'm'], to: [COMMAND, 'slash']},
  // close
  {from: [COMMAND, 'c'], to: [COMMAND, 'comma']},
  {from: [MOD2, 'c'], to: [COMMAND, 'comma']},
  // preferences/settings
  {from: [MOD2, 'a'], to: [COMMAND, 'w']},
  // escape
  {from: [COMMAND, 'x'], to: 'escape'},
  // cut
  {from: [COMMAND, 'n'], to: [COMMAND, 'b']},

  // comment with line comment
  {from: [COMMAND, 'comma'], to: [COMMAND, 'keypad_slash']},

  // * Utility shortcuts
  // delete whole word
  {from: [MOD1, LCOMMAND], to: [OPTION, DELETE]},
  // delete whole line
  {from: [COMMAND, LCOMMAND], to: [COMMAND, DELETE]},
  // go to beggining of line
  {from: [[MOD1, COMMAND], 's'], to: [COMMAND, LEFT]},
  // go to end of line
  {from: [[MOD1, COMMAND], 'f'], to: [COMMAND, RIGHT]},
  // switcher/traverse chrome tabs
  {from: [COMMAND, 'j'], to: [CONTROL, TAB]},
  {from: [MOD3, 'j'], to: [[CONTROL, SHIFT], TAB]},



  // **APP SPECIFIC**
  // INTELLIJ
  // extend selection
  {when: INTELLIJ, from: [COMMAND, 'w'], to: [OPTION, UP]},
  // move line up
  {when: INTELLIJ, from: [COMMAND, 'e'], to: [[OPTION, SHIFT], UP]},
  // move line down
  {when: INTELLIJ, from: [COMMAND, 'd'], to: [[OPTION, SHIFT], DOWN]},
  // INTELLIJ - open terminal
  {when: INTELLIJ, from: [MOD3, 'k'], to: [[OPTION, FN], 'f12']},
  {when: INTELLIJ, from: [CMD_MOD2, 'k'], to: [[OPTION, FN], 'f12']},
  // CHROME - open terminal/inspector
  {when: CHROME, from: [MOD3, 'k'], to: [[OPTION, COMMAND], 'c']},
  {when: CHROME, from: [CMD_MOD2, 'k'], to: [[OPTION, COMMAND], 'c']},

  // **MOD1 LAYER**
  {from: [MOD1, 'q'], to: [SHIFT, 'backslash']},
  {from: [MOD1, 'w'], to: 'z'},
  {from: [MOD1, 'r'], to: 'hyphen'},
  {from: [MOD1, 't'], to: 'equal_sign'},
  {from: [MOD1, 'a'], to: [SHIFT, '2']},

  {from: [MOD1, 'g'], to: [SHIFT, 'quote']},

  {from: [MOD1, 'z'], to: [SHIFT, '4']},
  {from: [MOD1, 'x'], to: [SHIFT, '1']},
  {from: [MOD1, 'c'], to: [SHIFT, 'open_bracket']},
  {from: [MOD1, 'v'], to: 'q'},
  {from: [MOD1, 'b'], to: [SHIFT, '7']},

  {from: [MOD1, 'y'], to: [SHIFT, '5']},
  {from: [MOD1, 'u'], to: [SHIFT, 'equal_sign']},
  {from: [MOD1, 'i'], to: [SHIFT, '0']},
  {from: [MOD1, 'o'], to: [SHIFT, 'q']},
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


  // **MOD2 LAYER**
  {from: [MOD2, 'y'], to: [SHIFT, 'grave_accent_and_tilde']},
  {from: [MOD2, 't'], to: 'f2'},
  {from: [MOD2, 'h'], to: '0'},
  {from: [MOD2, 'u'], to: '1'},
  {from: [MOD2, 'j'], to: '2'},
  {from: [MOD2, 'i'], to: '3'},
  {from: [MOD2, 'k'], to: '4'},
  {from: [MOD2, 'o'], to: '5'},
  {from: [MOD2, 'l'], to: '6'},
  {from: [MOD2, 'p'], to: '7'},
  {from: [MOD2, 'semicolon'], to: '8'},
  {from: [MOD2, 'n'], to: [SHIFT, '3']},
  {from: [MOD2, 'm'], to: '9'},
  {from: [MOD2, 'comma'], to: 'backslash'},
  {from: [MOD2, 'period'], to: [SHIFT, '6']},


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
  {from: [COMMAND, 'slash'], to: [COMMAND, SHIFT]},

  // intellij - solve problem lightbulb
  {from: [MOD1, 'open_bracket'], to: [OPTION, ENTER]},
  {from: [SHIFT, 'open_bracket'], to: [SHIFT, ENTER]},
  {from: [SHIFT, 'open_bracket'], to: [SHIFT, ENTER]},
  ['grave_accent_and_tilde', SHIFT],
  ['open_bracket', ENTER],
  ['close_bracket', ENTER],
  [LCOMMAND, DELETE],
  ['q', TAB],
  {from: TAB, to: [LSHIFT, TAB]},
  ['slash', SHIFT],

  // always right shift is pressed
  [LSHIFT, SHIFT],

  // **SWAPS**
  ['z', 'b'],
  {from: [SHIFT, 'z'], to: [SHIFT, 'b']},
  ['b', 'slash'],
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

for (let rule of complexShort) {
  if (Array.isArray(rule)) {
    let [from, to] = rule
    superdvorakBase.complex_modifications.rules.push({
      manipulators: [
        {
          description: `${from} => ${to}`,
          from: {key_code: from},
          to: [{key_code: to}],
          type: 'basic'
        }
      ]
    })
    continue
  }
  let from, fromMod = {}
  if (isString(rule.from)) {
    from = rule.from
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
  when = when ? (Array.isArray(when) ? when : [when]) : undefined
  superdvorakBase.complex_modifications.rules.push({
      manipulators: [
        {
          description: `${fromMod.name || fromMod} + ${from} => ${toMod ? toMod + ' + ' : ''}${to}`,
          conditions: when,
          from: {
            key_code: from,
            modifiers: {
              mandatory: fromMod.hasOwnProperty('keys') ? fromMod.keys : fromMod
            }
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
  )
}


let a = {
  description: 'Change right_command+hjkl to arrow keys',
  manipulators: [
    {
      from: {
        key_code: 'h',
        modifiers: {
          mandatory: [
            'right_command'
          ],
          optional: [
            'any'
          ]
        }
      },
      to: [
        {
          key_code: 'left_arrow'
        }
      ],
      type: 'basic'
    },
    {
      from: {
        key_code: 'j',
        modifiers: {
          mandatory: [
            'right_command'
          ],
          optional: [
            'any'
          ]
        }
      },
      to: [
        {
          key_code: 'down_arrow'
        }
      ],
      type: 'basic'
    },
    {
      from: {
        key_code: 'k',
        modifiers: {
          mandatory: [
            'right_command'
          ],
          optional: [
            'any'
          ]
        }
      },
      to: [
        {
          key_code: 'up_arrow'
        }
      ],
      type: 'basic'
    },
    {
      from: {
        key_code: 'l',
        modifiers: {
          mandatory: [
            'right_command'
          ],
          optional: [
            'any'
          ]
        }
      },
      to: [
        {
          key_code: 'right_arrow'
        }
      ],
      type: 'basic'
    }
  ]
}

let simpleShort = []

let simple = []

for (let rule of complex) {
  superdvorakBase.complex_modifications.rules.push(rule)
}

for (let rule of simple) {
  superdvorakBase.simple_modifications.push(rule)
}

for (let rule of simpleShort) {
  let [from, to] = rule
  superdvorakBase.simple_modifications.push({
    from: {
      key_code: from
    },
    to: {
      key_code: to
    }
  })
}

karabinerBase.profiles.push(superdvorakBase)

fs.writeFileSync(configPath, JSON.stringify(karabinerBase, null, 4))

let d = new Date()
console.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} - Saved`)
