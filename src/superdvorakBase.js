module.exports = {
  "complex_modifications": {
    "parameters": {
      "basic.to_delayed_action_delay_milliseconds": 500,
      "basic.to_if_alone_timeout_milliseconds": 1000
    },
    "rules": []
  },
  "devices": [],
  "fn_function_keys": [
    {
      "from": {
        "key_code": "f1"
      },
      "to": {
        "consumer_key_code": "display_brightness_decrement"
      }
    },
    {
      "from": {
        "key_code": "f2"
      },
      "to": {
        "consumer_key_code": "display_brightness_increment"
      }
    },
    {
      "from": {
        "key_code": "f3"
      },
      "to": {
        "key_code": "mission_control"
      }
    },
    {
      "from": {
        "key_code": "f4"
      },
      "to": {
        "key_code": "launchpad"
      }
    },
    {
      "from": {
        "key_code": "f5"
      },
      "to": {
        "key_code": "illumination_decrement"
      }
    },
    {
      "from": {
        "key_code": "f6"
      },
      "to": {
        "key_code": "illumination_increment"
      }
    },
    {
      "from": {
        "key_code": "f7"
      },
      "to": {
        "consumer_key_code": "rewind"
      }
    },
    {
      "from": {
        "key_code": "f8"
      },
      "to": {
        "consumer_key_code": "play_or_pause"
      }
    },
    {
      "from": {
        "key_code": "f9"
      },
      "to": {
        "consumer_key_code": "fastforward"
      }
    },
    {
      "from": {
        "key_code": "f10"
      },
      "to": {
        "consumer_key_code": "mute"
      }
    },
    {
      "from": {
        "key_code": "f11"
      },
      "to": {
        "consumer_key_code": "volume_decrement"
      }
    },
    {
      "from": {
        "key_code": "f12"
      },
      "to": {
        "consumer_key_code": "volume_increment"
      }
    }
  ],
  "name": "Superdvorak",
  "rules": [],
  "selected": true,
  "simple_modifications": [],
  "virtual_hid_keyboard": {
    "caps_lock_delay_milliseconds": 0,
    "keyboard_type": "iso"
  }
}
