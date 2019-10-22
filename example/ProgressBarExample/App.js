import React, { Component } from 'react';
import { View } from 'react-native';

import ProgressBar from './ProgressBar';

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
