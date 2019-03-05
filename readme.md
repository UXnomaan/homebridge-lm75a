## Installation

A Temprature plugin for [https://github.com/nfarina/homebridge](HomeBridge) to read from an [http://www.ti.com/product/LM75A](LM75A) sensor.

1. Install homebridge `sudo npm install -g --unsafe-perm homebridge`
2. Install this plugin with `npm install -g --unsafe-perm homebridge-lm75a`
3. Update your `config.json`.

```
"accessories": [
    {
        "accessory": "lm75a",
        "name": "Temperature",
        "unit": "c",
        "frequency": "10",
        "debug": true
    }
]
```

## Fields:

- Accesory: must be "lm75a"
- Name: can be anything
- Unit: Temperature unit (c or f)
- Frequncy: Seconds between each reading
- Debug: if set to `ture` there will be logging for debugging purposes

## GPIO:

TODO
