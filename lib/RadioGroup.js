import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Circle from "./Circle";
import { I18nManager } from "react-native";

class RadioGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptionId: props.activeButtonId,
    };
  }

  static propTypes = {
    options: PropTypes.arrayOf({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      labelView: PropTypes.element,
    }).isRequired,
    horizontal: PropTypes.bool,
    circleStyle: PropTypes.object,
    activeButtonId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    horizontal: false,
  };

  onPress = (option) => () => {
    if (option.id === this.state.selectedOptionId) {
      return;
    }

    this.setState({ selectedOptionId: option.id });
    this.props.onChange && this.props.onChange(option);
  };

  render() {
    const { options, horizontal, circleStyle, isHebrew } = this.props;
    return (
      <View
        style={[
          styles.container,
          horizontal && {
            flexDirection: !isHebrew ? "row" : "row-reverse",
            justifyContent: !isHebrew ? "flex-start" : "flex-end",
          },
        ]}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={{
              ...styles.radio,
              flexDirection: !isHebrew ? "row" : "row-reverse",
            }}
            onPress={this.onPress(option)}
          >
            <Circle
              active={this.state.selectedOptionId === option.id}
              circleStyle={circleStyle}
            />
            {option.label && (
              <Text style={{ marginRight: 10 }}>{option.label}</Text>
            )}
            {!option.label && option.labelView}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
  },
});

export default RadioGroup;
