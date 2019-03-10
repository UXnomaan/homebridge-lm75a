const I2C = require("raspi-i2c").I2C;

let Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-lm75a", "lm75a", LM75A);
};

class LM75A {
  constructor(log, config) {
    this.log = log;
    this.name = config.name;
    this.unit = config.unit;
    this.debug = config.debug || false;
    this.frequency = config.frequency;
    this.lastChecked = (Date.now() / 1000) | 0;
    this.lastValue = null;
  }

  identify(callback) {
    this.log("Identify requested!");
    callback(null);
  }

  startReading() {
    const callback = () => {
      setTimeout(() => this.getReading(callback), 5000);
    };

    this.getReading(callback);
  }

  getReading(callback) {
    try {
      const i2c = new I2C();
      callback();
      let reading;
      if (
        this.lastChecked + parseInt(this.frequency) <
        ((Date.now() / 1000) | 0)
      ) {
        reading = i2c.readByteSync(0x48);
        if (reading) {
          // switch (this.unit) {
          //     case 'f':
          //         reading = reading * 1.8 + 32;
          //     case 'c':
          //         // it's already in celsius
          //         break;
          //     case 'k':
          //         reading = reading + 273.15;
          //         break;
          // }
          if (this.debug) console.log("current temp:", reading);
          this.lastValue = Math.round(reading);
        } else {
          if (this.debug)
            console.log("didn't get any reading, passing old value");
          reading = this.lastValue;
        }
        this.lastChecked = (Date.now() / 1000) | 0;
        this.currentTemperature = Math.round(reading);
        this.temperatureService.setCharacteristic(
          Characteristic.CurrentTemperature,
          this.currentTemperature
        );
      }
    } catch (err) {
      if (this.debug) console.log("[LM75a]", err);
    }
  }

  getServices() {
    const informationService = new Service.AccessoryInformation();

    informationService
      .setCharacteristic(Characteristic.Manufacturer, "Nomz Lab")
      .setCharacteristic(Characteristic.Model, "Temperature Sensor")
      .setCharacteristic(Characteristic.SerialNumber, "LM75A");

    this.temperatureService = new Service.TemperatureSensor(this.name);

    const TemperatureUnit = Object.freeze({
      Celsius: "celsius",
      Fahrenheit: "fahrenheit"
    });

    this.temperatureService
      .getCharacteristic(Characteristic.TemperatureDisplayUnits)
      .setProps({ unit: TemperatureUnit[this.unit] });

    this.temperatureService
      .getCharacteristic(Characteristic.CurrentTemperature)
      .setProps({
        minValue: -100,
        maxValue: 100
      });

    this.temperatureService
      .getCharacteristic(Characteristic.CurrentTemperature)
      .on("get", callback => {
        callback(null, this.currentTemperature);
      });
    this.temperatureService
      .getCharacteristic(Characteristic.Name)
      .on("get", callback => {
        callback(null, this.name);
      });

    this.startReading();

    return [informationService, this.temperatureService];
  }
}
