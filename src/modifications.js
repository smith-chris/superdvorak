const os = require('os')
const fs = require('fs')
const karabinerBase = require('./karabinerBase')
const superdvorakBase = require('./superdvorakBase')

let configPath = `${os.homedir()}/.config/karabiner/karabiner.json`;

complex = [{
  "manipulators": [
    {
      "description": "Change caps_lock to command+control+option+shift.",
      "from": {
        "key_code": "caps_lock",
        "modifiers": {
          "optional": [
            "any"
          ]
        }
      },
      "to": [
        {
          "key_code": "left_shift",
          "modifiers": [
            "left_command",
            "left_control",
            "left_option"
          ]
        }
      ],
      "type": "basic"
    }
  ]
}]

for (let rule of complex) {
  superdvorakBase.complex_modifications.rules.push(rule)
}

karabinerBase.profiles.push(superdvorakBase)

fs.writeFileSync(configPath, JSON.stringify(karabinerBase, null, 4))
console.log('Saved')
