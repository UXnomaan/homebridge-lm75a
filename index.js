const I2C = require('raspi-i2c').I2C;

const readTemperature = (unit) => {
    const i2c = new I2C();

    let reading = i2c.readByteSync(0x48, 0x00);
	
    switch (unit) {
        case 'f':
            reading = (reading * 1.8 + 32)
            break;
        case 'c':
            // it's already in celsius
            break;
        case 'k':
            reading = reading + 273.15;
            break;
    }

    return Math.round(reading);
};

const e = readTemperature('f');
console.log(e);
