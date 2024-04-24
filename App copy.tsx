obraca sie o 1 stopien

import React, { useRef, useState } from 'react';
import { PanResponder, View } from 'react-native';
import Svg, { Circle, G, Path, Text } from 'react-native-svg';

const TripleDonutChart = () => {


  const svgRef = useRef(); // Referencja do SVG
  const [angle, setAngle] = useState(0); // Początkowy kąt obrotu
  const [previousAngle, setPreviousAngle] = useState(0); // Poprzedni kąt obrotu

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      // Obliczenie różnicy kąta pomiędzy aktualnym i poprzednim położeniem palca
      const angleDiff = Math.atan2(gesture.moveY - 150, gesture.moveX - 150) - Math.atan2(gesture.y0 - 150, gesture.x0 - 150);
      // Aktualizacja kąta obrotu na podstawie różnicy kąta
      setAngle(previousAngle + angleDiff);
    },
    onPanResponderRelease: () => {
      // Zapisanie poprzedniego kąta po zwolnieniu palca
      setPreviousAngle(angle);
    },
  });






  const outerData = [
    { label: 'A', value: 50, color: 'blue' },
    { label: 'B', value: 30, color: 'green' },
    { label: 'C', value: 20, color: 'orange' },
  ];

  const middleData = [
    { label: 'X', value: 40, color: 'red' },
    { label: 'Y', value: 30, color: 'purple' },
    { label: 'Z', value: 30, color: 'yellow' },
  ];

  const innerData = [
    { label: 'I', value: 20, color: 'cyan' },
    { label: 'II', value: 30, color: 'magenta' },
    { label: 'III', value: 50, color: 'lime' },
  ];

  const renderDonut = (data, radius, centerX, centerY) => {
    const donuts = [];
    let startAngle = 0;

    data.forEach((item, index) => {
      const endAngle = startAngle + (item.value / 100) * 360;

      const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

      const largeArcFlag = item.value > 50 ? 1 : 0;

      const path = `M${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} L${centerX},${centerY} Z`;

      const angle = (startAngle + endAngle) / 2; // Średni kąt łuku

      const textRotation = angle > 90 && angle < 270 ? angle - 180 : angle; // Obrót tekstu na górze koła

      const textX = centerX + radius * 0.7 * Math.cos((angle * Math.PI) / 180); // Współrzędna x tekstu
      const textY = centerY + radius * 0.7 * Math.sin((angle * Math.PI) / 180); // Współrzędna y tekstu

      donuts.push(
        <Path key={`donut-${index}`} d={path} fill={item.color} />,
        <Text
          key={`text-${index}`}
          x={textX}
          y={textY}
          fill="black"
          fontSize="12"
          textAnchor="middle"
          alignmentBaseline="middle"
          transform={`rotate(${textRotation},${textX},${textY})`}>
          {item.label}
        </Text>
      );

      startAngle = endAngle;
    });

    return donuts;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width="300" height="300" {...panResponder.panHandlers}>
      <G transform={`rotate(${angle}, 150, 150)`}>
        {/* Outer Donut */}
        {renderDonut(outerData, 150, 150, 150)}
        {/* Middle Donut */}
        {renderDonut(middleData, 100, 150, 150)}
        {/* Inner Donut */}
        {renderDonut(innerData, 50, 150, 150)}
        {/* Center Circle */}
        <Circle cx="150" cy="150" r="15" fill="white" />
        </G>
      </Svg>
    </View>
  );
};

export default TripleDonutChart;
