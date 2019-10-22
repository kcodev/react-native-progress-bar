import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Easing } from 'react-native';

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
    const { progress } = this.state;
    if (progress > 0) {
      this.animateWidth();
    }
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps.value !== prevProps.progress) {
      if (nextProps.value >= 0 && nextProps.value <= nextProps.maxValue) {
        return nextProps;
      }
      return prevProps;
    }
    return prevProps;
  }

  componentDidUpdate(nextProps, prevProps) {
    const {
      value,
      backgroundColorOnComplete,
      maxValue,
      onComplete,
      barAnimationDuration
    } = this.props;

    if (value !== prevProps.progress) {
      this.setState({
        progress: value
      }, () => {
        this.animateWidth();
      });

      if (backgroundColorOnComplete) {
        if (value === maxValue) {
          this.animateBackground();
        }
      }
    }

    if (prevProps.value === maxValue) {
      // Callback after complete the progress
      const callback = onComplete;
      if (callback) {
        setTimeout(callback, barAnimationDuration);
      }
    }
  }

  animateWidth() {
    const {
      width,
      progress,
      borderWidth,
      barEasing,
      barAnimationDuration
    } = this.props;

    const toValue = ((width * progress) / 100) - borderWidth * 2;

    Animated.timing(this.widthAnimation, {
      easing: Easing[barEasing],
      toValue: toValue > 0 ? toValue : 0,
      duration: barAnimationDuration,
    }).start();
  }

  animateBackground() {
    const {
      backgroundAnimationDuration
    } = this.props;

    Animated.timing(this.backgroundAnimation, {
      toValue: 1,
      duration: backgroundAnimationDuration,
    }).start();
  }

  onPageLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    const { progress } = this.props;
    this.setState({ width }, () => {
      if (progress > 0) {
        this.animateWidth();
      }
    });
  };

  render() {
    const { backgroundColorOnComplete, backgroundColor } = this.props;

    if (backgroundColorOnComplete) {
      this.backgroundInterpolationValue = this.backgroundAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [backgroundColor, backgroundColorOnComplete],
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
