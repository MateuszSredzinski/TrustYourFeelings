import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path, Text } from 'react-native-svg';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';

const TripleDonutChart = () => {
  const centerX = 175;
  const centerY = 350;
  const radius = [325, 225, 125]; // Radius of each circle

  const outerData = [
    //Zaskoczony, od przestraszony
    { label: '                    Wstrząśnięty', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Skonsternowany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zakłopotany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Rozczarowany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zatrwożony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Ochoczy', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Energiczny', value: `${100/82}`, color: '#66cccc' },

    //Słaby, od zmęczony
    { label: '                    Rozkojarzony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Senny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Tracący kontrolę', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Przytłoczony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Pośpieszany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Pod presją', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Apatyczny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Obojętny', value: `${100/82}`, color: '#66cccc' },

    //Lękliwy, od przestraszony
    { label: '                    Bezsilny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zastraszony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Przytłoczony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zamartwiony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Niewystarczający', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Podrzędny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Bezwartościowy', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Nieistotny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Wyobcowany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Niepasujący', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Nerwowy', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zdemaskowany', value: `${100/82}`, color: '#66cccc' },

    //Rozgniewany, od rozczarowany
    { label: '                    Zdradzony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Urażony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zlekceważony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Ośmieszony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zgorszony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zbeszczeszczony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Niepewny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zazdrosny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Wrogo nastawiony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Sprowokowany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Oburzony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Poirytowany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zamknięty w sobie', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Podejrzliwy', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Sceptyczny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Sarkastyczny', value: `${100/82}`, color: '#66cccc' },

    //Zniesmaczony, od nieprzychylny
    { label: '                    Niechętny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Krytykancki', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zbuntowany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Antypatyczny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Podburzony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Obrzydzony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Czujący odrazę', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Niepewny', value: `${100/82}`, color: '#66cccc' },

    //Smutny, od zraniony
    { label: '                    Zlekceważony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Rozczarowany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Gorszy od innych', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Wyczerpany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Skruszony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zawstydzony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Bezsilny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    W bólu, w żałobie', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Rozczarowany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Słabowity', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Prześladowany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Porzucony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Odizolowany', value: `${100/82}`, color: '#66cccc' },

    //Szczęśliwy, od optymistyczny
    { label: '                    Zainspirowany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Pełen nadziei', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Figlarny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Czuły', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Wdzięwczny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Kochający', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Kreatywny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Odważny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Doceniony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Szanowany', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Pewny siebie', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Ważny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Dociekliwy', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zaciekawiony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Wesoły', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Wolny', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Pobudzony', value: `${100/82}`, color: '#66cccc' },
    { label: '                    Zuchwały', value: `${100/82}`, color: '#66cccc' },
];

  const middleData = [
//od zaskoczony
    { label: 'Przestraszony', value: `${100/36}`, color: '#66cccc' },
    { label: 'Zmieszany', value: `${100/36}`, color: '#66d9e8' },
    { label: 'Zdumiony', value: `${100/36}`, color: '#66c2e0' },
    { label: 'Podekscytowany', value: `${100/36}`, color: '#66b5e6' },
//od slaby
    { label: 'Zmęczony', value: `${100/36}`, color: '#66a8ec' },
    { label: 'Zestresowany', value: `${100/36}`, color: '#669bec' },
    { label: 'Zapracowany', value: `${100/36}`, color: '#668eed' },
    { label: 'Znudzony', value: `${100/36}`, color: '#667ded' },
//od lekliwy
    { label: 'Przestraszony', value: `${100/36}`, color: '#666fed' },
    { label: 'Niespokojny', value: `${100/36}`, color: '#6665ed' },
    { label: 'Niepewny', value: `${100/36}`, color: '#665bed' },
    { label: 'Uległy', value: `${100/36}`, color: '#664ced' },
    { label: 'Odrzucony', value: `${100/36}`, color: '#6630ed' },
    { label: 'Zastraszony', value: `${100/36}`, color: '#6615ed' },
//od rozgniewany
    { label: 'Rozczarowany', value: `${100/36}`, color: '#7d66ed' },
    { label: 'Upokorzony', value: `${100/36}`, color: '#9466ed' },
    { label: 'Nienawistny', value: `${100/36}`, color: '#ae66ed' },
    { label: 'Zagrożony', value: `${100/36}`, color: '#c766ed' },
    { label: 'Agresywny', value: `${100/36}`, color: '#e066ed' },
    { label: 'Sfrustrowany', value: `${100/36}`, color: '#ed66e1' },
    { label: 'Zdystansowany', value: `${100/36}`, color: '#ed66c8' },
    { label: 'Krytyczny', value: `${100/36}`, color: '#ed66ae' },
//od zniesmaczony
    { label: 'Nieprzychylny', value: `${100/36}`, color: '#ed6695' },
    { label: 'Rozczarowany', value: `${100/36}`, color: '#ed667c' },
    { label: 'Czujący się podle', value: `${100/36}`, color: '#ed6663' },
    { label: 'Stroniący', value: `${100/36}`, color: '#ed664a' },
//od smutny
    { label: 'Zraniony', value: `${100/36}`, color: '#ed6631' },
    { label: 'Przygnębiony', value: `${100/36}`, color: '#ed6618' },
    { label: 'Winny', value: `${100/36}`, color: '#ed720e' },
    { label: 'Zrozpaczony', value: `${100/36}`, color: '#ed7f0e' },
    { label: 'Zraniony', value: `${100/36}`, color: '#ed8c0e' },
    { label: 'Samotny', value: `${100/36}`, color: '#ed990e' },
//od szczesliwy
    { label: 'Optymistyczny', value: `${100/36}`, color: '#eda60e' },
    { label: 'Czujący bliskość', value: `${100/36}`, color: '#edb30e' },
    { label: 'Spokojny', value: `${100/36}`, color: '#edc00e' },
    { label: 'Pełen Siły', value: `${100/36}`, color: '#edcd0e' },
    { label: 'Akceptowany', value: `${100/36}`, color: '#edd90e' },
    { label: 'Dumny', value: `${100/36}`, color: '#e5ed0e' },
    { label: 'Zainteresowany', value: `${100/36}`, color: '#d9ed0e' },
    { label: 'Zadowolony', value: `${100/36}`, color: '#cbed0e' },
    { label: 'Żartobliwy', value: `${100/36}`, color: '#b6ed0e' },
];

const innerData = [

  //Emocje główne
  { label: 'Zaskoczony          ', value: `${400/36}`, color: '#66cccc' },
  { label: 'Słaby          ', value: `${400/36}`, color: '#66b2cc' },
  { label: 'Lękliwy          ', value: `${600/36}`, color: '#9966cc' },
  { label: 'Rozgniewany          ', value: `${800/36}`, color: '#cc6666' }, 
  { label: 'Zniesmaczony          ', value: `${400/36}`, color: '#6666cc' },
  { label: 'Smutny          ', value: `${600/36}`, color: '#9966cc' },
  { label: 'Szczęśliwy          ', value: `${900/36}`, color: '#e6e600' }
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
