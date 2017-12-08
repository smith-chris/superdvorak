const os = require('os')
const fs = require('fs')
const karabinerBase = require('./karabinerBase')
const superdvorakBase = require('./superdvorakBase')
const {isString} = require('./utils')

let configPath = `${os.homedir()}/.config/karabiner/karabiner.json`

const ENTER = 'return_or_enter'
const DELETE = 'delete_or_backspace'

const LSHIFT = 'left_shift'

const LCONTROL = 'left_control'

const COMMAND = 'right_command'

const LOPTION = 'left_option'

const mod1base = LSHIFT
const mod1mods = [
  'left_command',
  'left_option'
]

const MOD1 = {
  name: 'MOD1',
  keys: mod1mods.concat([mod1base])
}

const MOD2 = {
  name: 'MOD2',
  keys: ['left_option']
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
        description: 'Change caps_lock to command+option+shift.',
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
  }
]

let complexShort = [
  // **SHORTCUTS**
  // undo
  {from: [COMMAND, 'm'], to: [COMMAND, 'slash']},
  // close
  {from: [COMMAND, 'c'], to: [COMMAND, 'comma']},
  {from: [MOD2, 'c'], to: [COMMAND, 'comma']},
  // escape
  {from: [COMMAND, 'x'], to: 'escape'},

  // **IDE SPECIFIC**
  // *Intellij*

  // **MOD1 LAYER
  {from: [MOD1, 'l'], to: 'close_bracket'},
  {from: [MOD1, 'w'], to: 'z'},
  {from: [MOD1, 'r'], to: 'hyphen'},
  {from: [MOD1, 't'], to: 'equal_sign'},
  {from: [MOD1, 'v'], to: 'q'},

  // simple arrows
  {from: [MOD2, 'e'], to: 'up_arrow'},
  {from: [MOD2, 's'], to: 'left_arrow'},
  {from: [MOD2, 'd'], to: 'down_arrow'},
  {from: [MOD2, 'f'], to: 'right_arrow'},

  // navigate desktops
  {from: [MOD2, 'w'], to: [LCONTROL, 'left_arrow']},
  {from: [MOD2, 'r'], to: [LCONTROL, 'right_arrow']},
]

for (let rule of complexShort) {
  let [fromMod, from] = rule.from
  let to, toMod
  if (isString(rule.to)) {
    to = rule.to
  }
  else {
    [toMod, to] = rule.to
  }
  superdvorakBase.complex_modifications.rules.push({
      manipulators: [
        {
          description: `${fromMod.name || fromMod} + ${from} => ${toMod ? toMod + ' + ': ''}${to}`,
          from: {
            key_code: from,
            modifiers: {
              mandatory: isString(fromMod) ? fromMod : fromMod.keys
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

let simpleShort = [
  // **Surroundings**
  ['open_bracket', ENTER],
  ['close_bracket', ENTER],
  ['grave_accent_and_tilde', LSHIFT],

  ['left_command', DELETE],
  ['q', 'tab'],
  ['z', 'b'],
  ['b', 'slash'],
]

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
