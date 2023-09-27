import React, {useRef, useState, useEffect} from 'react';

import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const {height} = Dimensions.get('screen');

import {
  FlingGestureHandler,
  Directions,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import AnimatedTitle from '../components/Header/animatedtitle';
import DATA from '../utils/data';
import {SharedElement} from 'react-navigation-shared-element';

const IMAGEWIDTH = Dimensions.get('screen').width * 0.76;
const IMAGEHEIGHT = IMAGEWIDTH * 1.7;

const HomeScreen = ({navigation}) => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const index = useRef(new Animated.Value(0)).current;

  const scroll = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(scroll, {
      toValue: index,
      useNativeDriver: true,
    }).start();
  }, [index]);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return <Text style={styles.headerTitle}>List</Text>;
      },
    });
  }, [navigation]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <FlingGestureHandler
        onHandlerStateChange={event => {
          if (event.nativeEvent.state === State.END) {
            if (currentIndex === DATA.length - 1) {
              return;
            }
            setcurrentIndex(currentIndex + 1);
            index.setValue(currentIndex + 1);
          }
        }}
        direction={Directions.LEFT}>
        <FlingGestureHandler
          onHandlerStateChange={event => {
            if (event.nativeEvent.state === State.END) {
              if (currentIndex === 0) {
                return;
              }
              setcurrentIndex(currentIndex - 1);
              index.setValue(currentIndex - 1);
            }
          }}
          direction={Directions.RIGHT}>
          <View style={styles.container}>
            <AnimatedTitle scroll={scroll}></AnimatedTitle>
            <FlatList
              contentContainerStyle={styles.flatlistWrapper}
              scrollEnabled={false}
              removeClippedSubviews={false}
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                return (
                  <View
                    style={[style, {zIndex: DATA.length - index}]}
                    index={index}>
                    {children}
                  </View>
                );
              }}
              renderItem={({item, index}) => {
                const translateX = scroll.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [55, 0, -100],
                });
                const scale = scroll.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.8, 1, 1.5],
                });
                const opacity = scroll.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [1, 1, 0],
                });
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      navigation.navigate('Expanded', {
                        index: currentIndex,
                      })
                    }>
                    <Animated.View
                      style={{
                        opacity: opacity,
                        position: 'absolute',
                        left: -IMAGEWIDTH / 2,
                        transform: [{scale}, {translateX}],
                      }}>
                      <SharedElement
                        id={`image.${DATA[index].header}.bg`}
                        style={{height: IMAGEHEIGHT, width: IMAGEWIDTH}}>
                        <Image
                          source={{uri: item.poster}}
                          style={{
                            height: IMAGEHEIGHT,
                            width: IMAGEWIDTH,
                          }}></Image>
                      </SharedElement>
                    </Animated.View>
                  </TouchableOpacity>
                );
              }}
              horizontal={true}
              keyExtractor={(_, index) => `image.${DATA[index].header}.bg`}
              data={DATA}></FlatList>

            <SharedElement
              style={[
                StyleSheet.absoluteFillObject,
                {transform: [{translateY: height}]},
              ]}
              id={'bottomsheet.bg'}>
              <Animated.View style={[styles.detailsContainer]}></Animated.View>
            </SharedElement>
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },
  detailsContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    padding: 20,
    height: '100%',
    width: '100%',
    transform: [{translateY: height}],
  },
  headerTitle: {fontSize: 16, color: 'black', fontWeight: '600'},
  flatlistWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
export default HomeScreen;
