## homebridge-lm75a

A Temperature plugin for [HomeBridge](https://github.com/nfarina/homebridge) to read from an [LM75A](http://www.ti.com/product/LM75A) sensor.

## Preparation

### Enable I2C bus

By default I2C is not enabled on the raspberry pi. You can run `raspi-config` and selecting `Interfacing Options`, then `P5 I2C`. After it's enabled, reboot.

### Connect sensor

Depending on your Pi board version, you need to find SCL and SDA, usually 3 (SDA) and 5 (SCL). Connect your sensor to the board.

### Find sensor address

This library has the address hard-coded to `0x48` for now so you need to modify the board to use this plugin.

Install `i2c-tools`:

```
sudo apt-get install i2c-tools
```

Then run:

```
i2cdetect -y 1
```

The output will look like this:

```
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- 48 -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --

```

## Installation

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

- Accessory: must be "lm75a"
- Name: can be anything
- Unit: Temperature unit (c or f)
- Frequency: Seconds between each reading
- Debug: if set to `true` there will be logging for debugging purposes

## Support

Please create issue on github.
