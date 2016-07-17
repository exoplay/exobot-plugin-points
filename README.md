# exobot-exobot-plugin-points

Give and take away points, with and without reasons.

## Usage

```
audrey++
audrey++ for being super cool
exobot score audrey
exobot top 10
```

## Installation

* `npm install --save @exoplay/exobot/exobot-plugin-points`

## A Setup Example

```javascript
import Exobot from '@exoplay/exobot';
import Points from '@exoplay/exobot-plugin-points';

const Bot = new Exobot(BOT_NAME, {
  // ...
  plugins: [
    new Points();
  ],
});
```

## License

LGPL licensed. Copyright 2016 Exoplay, LLC. See LICENSE file for more details.
