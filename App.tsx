import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path, Text } from 'react-native-svg';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';

const TripleDonutChart = () => {
  const centerX = 175;
  const centerY = 350;
  const radius = [325, 225, 125]; // Radius of each circle

  const outerData = [
    { label: 'A', value: 50, color: 'blue' },
    { label: 'B', value: 30, color: 'green' },
    { label: 'C', value: 20, color: 'orange' },
  ];

  const middleData = [
    { label: 'A', value: 40, color: 'red' },
    { label: 'B', value: 30, color: 'purple' },
    { label: 'C', value: 30, color: 'yellow' },
  ];

  const innerData = [
    { label: 'Zaskoczony', value: `${100/7}`, color: 'cyan' },
    { label: 'Słaby', value: `${100/7}`, color: 'purple' },
    { label: 'Lękliwy', value: `${100/7}`, color: 'grey' },
    { label: 'Rozgniewany', value: `${100/7}`, color: 'red' },
    { label: 'Zniesmaczony', value: `${100/7}`, color: 'purple' },
    { label: 'Smutny', value: `${100/7}`, color: 'grey' },
    { label: 'Sczęśliwy', value: `${100/7}`, color: 'yellow' }
  ];

  const renderDonut = (data, radius, startAngle) => {
    let currentAngle = startAngle;
    return data.map((item, index) => {
      const endAngle = currentAngle + (item.value / 100) * 360;
      const largeArcFlag = item.value > 50 ? 1 : 0;
      const x1 = centerX + radius * Math.cos((currentAngle * Math.PI) / 180);
      const y1 = centerY + radius * Math.sin((currentAngle * Math.PI) / 180);
      const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
      const path = `M${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} L${centerX},${centerY} Z`;
      const angle = (currentAngle + endAngle) / 2;
      const textX = centerX + radius * 0.7 * Math.cos((angle * Math.PI) / 180);
      const textY = centerY + radius * 0.7 * Math.sin((angle * Math.PI) / 180);
      // const textRotation = angle > 90 && angle < 270 ? angle - 180 : angle;
      const textRotation = angle
      currentAngle = endAngle;
      return (
        <React.Fragment key={index}>
          <Path d={path} fill={item.color} />
          <Text
            x={textX}
            y={textY}
            fill="black"
            fontSize="12"
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={`rotate(${textRotation},${textX},${textY})`}>
            {item.label}
          </Text>
        </React.Fragment>
      );
    });
  };

  const onGestureEvent = (event) => {
    const { nativeEvent } = event;
    const { state, translationX, translationY } = nativeEvent;
    if (state === State.ACTIVE) {
      const newAngle = Math.atan2(translationY, translationX) * (180 / Math.PI);
      setAngle(newAngle);
    }
  };

  const onHandlerStateChange = (event) => {
    const { nativeEvent } = event;
    const { state } = nativeEvent;
    if (state === State.END) {
      setStartAngle(angle);
    }
  };

  const [angle, setAngle] = React.useState(0);
  const [startAngle, setStartAngle] = React.useState(0);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Svg width="700" height="700">
          {/* Outer Donut */}
          <G transform={`rotate(${angle},${centerX},${centerY})`}>
            {renderDonut(outerData, radius[0], startAngle)}
          </G>
          {/* Middle Donut */}
          <G transform={`rotate(${angle},${centerX},${centerY})`}>
            {renderDonut(middleData, radius[1], startAngle)}
          </G>
          {/* Inner Donut */}
          <G transform={`rotate(${angle},${centerX},${centerY})`}>
            {renderDonut(innerData, radius[2], startAngle)}
          </G>
          {/* Center Circle */}
          <Circle cx={centerX} cy={centerY} r="15" fill="white" />
        </Svg>
        <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
          <View style={styles.touchArea} />
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchArea: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default TripleDonutChart;
