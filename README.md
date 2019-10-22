# react-native-progress-bar

React native Simple, customizable and animated progress bar for React Native

## Features

- Flexible style
- Plain simple and flexible API
- Listeners for actions
## Setup

`npm install --save @kcodev/react-native-progress-bar`

## Usage

```javascript
import React, { Component } from 'react';
import { View } from 'react-native';

import ProgressBar from '@kcodev/react-native-progress-bar';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ProgressBar
            value={70}
            maxValue={100}
            backgroundColorOnComplete="#123123"
            backgroundColor="#987987"
          />
        </View>
      </View>
    );
  }
}

export default App;
```



## Available props

| Name | Type| Default | Description |
| --- | --- | --- | --- |
| value | number | 0 | Progress value |
| maxValue | number | 500 | Max percentage bar can have |
| barEasing | string | 'linear' | Easing animation type(bounce, cubic, ease, sin, linear, quad) |
| height | number | 16 | Height of bar |
| backgroundColor | string | #148cF0 | Color that will complete the bar |
| borderWidth | number | 1 | Style prop |
| borderColor | string | '#148cF0' | Style prop |
| borderRadius | number | 8 | Style prop |
| onComplete | function | null | Callback after bar reach the max value prop |
