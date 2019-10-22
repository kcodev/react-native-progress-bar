import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Animated,
  Easing,
} from 'react-native';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: props.value,
      width: 0
    };

    this.widthAnimation = new Animated.Value(0);
    this.backgroundAnimation = new Animated.Value(0);
    this.backgroundInterpolationValue = null;
  }

  componentDidMount() {
    if (this.state.progress > 0) {
      this.animateWidth();
    }
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps.value !== prevProps.progress) {
      if (nextProps.value >= 0 && nextProps.value <= nextProps.maxValue) {
        return nextProps;
      } else {
        return prevProps;
      }
    } else {
      return prevProps;
    }
  }

  componentDidUpdate(nextProps, prevProps) {
    if (this.props.value !== prevProps.progress) {
      this.setState({
        progress: this.props.value
      }, () => {
        this.animateWidth();
      });

      if (this.props.backgroundColorOnComplete) {
        if (this.props.value === this.props.maxValue) {
          this.animateBackground();
        }
      }
    }

    if (prevProps.value === this.props.maxValue) {
      // Callback after complete the progress
      const callback = this.props.onComplete;
      if (callback) {
        setTimeout(callback, this.props.barAnimationDuration);
      }
    }
  }

  animateWidth() {
    const toValue = ((this.state.width * this.state.progress) / 100) - this.props.borderWidth * 2;

    Animated.timing(this.widthAnimation, {
      easing: Easing[this.props.barEasing],
      toValue: toValue > 0 ? toValue : 0,
      duration: this.props.barAnimationDuration,
    }).start();
  }

  animateBackground() {
    Animated.timing(this.backgroundAnimation, {
      toValue: 1,
      duration: this.props.backgroundAnimationDuration,
    }).start();
  }

  onPageLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({ width, height }, () => {
      if (this.state.progress > 0) {
        this.animateWidth();
      }
    });
  };

  render() {
    if (this.props.backgroundColorOnComplete) {
      this.backgroundInterpolationValue = this.backgroundAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [this.props.backgroundColor, this.props.backgroundColorOnComplete],
      });
    }

    return (
      <View
        onLayout={this.onPageLayout}
      >
        <View style={{
          width: this.state.width,
          height: this.props.height,
          borderWidth: this.props.borderWidth,
          borderColor: this.props.borderColor,
          borderRadius: this.props.borderRadius,
        }}
        >
          <Animated.View style={{
            height: this.props.height - (this.props.borderWidth * 2),
            width: this.widthAnimation,
            backgroundColor: this.backgroundInterpolationValue || this.props.backgroundColor,
            borderRadius: this.props.borderRadius,
          }}
          />
        </View>
      </View>
    );
  }
}

ProgressBar.propTypes = {

  /**
   * Bar values
   */
  value: PropTypes.number,
  maxValue: PropTypes.number,

  /**
   * Animations
   */
  barEasing: PropTypes.oneOf([
    'bounce',
    'cubic',
    'ease',
    'sin',
    'linear',
    'quad',
  ]),
  barAnimationDuration: PropTypes.number,
  backgroundAnimationDuration: PropTypes.number,

  /**
   * StyleSheet props
   */
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  backgroundColorOnComplete: PropTypes.string,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.number,

  /**
   * Callbacks
   */
  onComplete: PropTypes.func,
};

ProgressBar.defaultProps = {
  value: 0,
  maxValue: 100,

  barEasing: 'linear',
  barAnimationDuration: 500,
  backgroundAnimationDuration: 2500,

  height: 15,

  backgroundColor: '#148cF0',
  backgroundColorOnComplete: null,

  borderWidth: 1,
  borderColor: '#C8CCCE',
  borderRadius: 6,

  onComplete: null,
};

export default ProgressBar;
