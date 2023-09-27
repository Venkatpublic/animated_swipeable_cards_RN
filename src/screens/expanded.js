import React, {useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DATA from '../utils/data';
import {SharedElement} from 'react-navigation-shared-element';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const screenheight = Dimensions.get('window').height;
const ExpandedScreen = ({route, navigation}) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const textposition = useRef(new Animated.Value(0)).current;
  const textpositiontwo = useRef(new Animated.Value(0)).current;
  const textpositionthree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
        delay: 500,
      }),

      Animated.timing(textposition, {
        toValue: -50,
        useNativeDriver: true,
        duration: 200,
      }),
      Animated.timing(textpositiontwo, {
        toValue: -50,
        useNativeDriver: true,
        duration: 250,
      }),
      Animated.timing(textpositionthree, {
        toValue: -50,
        useNativeDriver: true,
        duration: 300,
      }),
    ]).start();
  }, []);
  useEffect(()=>  
  {
    navigation.setOptions({
        headerTransparent: true,
        headerTitle: () => {
          return (
            <Animated.Text
              style={{
                opacity: textpositiontwo.interpolate({
                  inputRange: [-50, 0],
                  outputRange: [1, 0],
                }),
                fontSize: 16,
                color: 'black',
                fontWeight: '600',
                transform: [
                  {
                    translateX: textpositiontwo.interpolate({
                      inputRange: [-50, 0],
                      outputRange: [-10, 25],
                    }),
                  },
                ],
              }}>
              Event details
            </Animated.Text>
          );
        },
  
        headerBackImage: () => {
          return (
            <Animated.View
              style={{
                opacity: textposition.interpolate({
                  inputRange: [-50, 0],
                  outputRange: [1, 0],
                }),
                transform: [
                  {
                    translateX: textposition.interpolate({
                      inputRange: [-50, 0],
                      outputRange: [0, 25],
                    }),
                  },
                ],
              }}>
              <MaterialIcons name="arrow-back" size={23} color="black" />
            </Animated.View>
          );
        },
      });
  }
  ,[navigation])

  return (
    <View style={styles.container}>
      <SharedElement
        style={[styles.image]}
        id={`image.${DATA[route?.params?.index].header}.bg`}>
        <Animated.Image
          source={{uri: DATA[route?.params?.index]?.poster}}
          style={[styles.image, {opacity: opacity}]}></Animated.Image>
      </SharedElement>
      <SharedElement
        style={[StyleSheet.absoluteFillObject]}
        id={'bottomsheet.bg'}>
        <View style={[styles.detailsContainer]}>
          <Animated.Text
            style={[
              styles.title,
              {
                transform: [{translateY: textposition}],
                opacity: textposition.interpolate({
                  inputRange: [-50, 0],
                  outputRange: [1, 0],
                }),
              },
            ]}>
            {DATA[route?.params?.index].header}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.subtitle,
              {
                transform: [{translateY: textpositiontwo}],
                opacity: textpositiontwo.interpolate({
                  inputRange: [-50, 0],
                  outputRange: [1, 0],
                }),
              },
            ]}>
            <Ionicons
              name="location-outline"
              size={16}
              color="grey"
              style={{marginRight: 5}}
            />
            {DATA[route?.params?.index].address}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.date,
              {
                transform: [{translateY: textpositionthree}],
                opacity: textpositionthree.interpolate({
                  inputRange: [-50, 0],
                  outputRange: [1, 0],
                }),
              },
            ]}>
            {DATA[route?.params?.index].date}
          </Animated.Text>
        </View>
      </SharedElement>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overlayColor: 'white',
  },
  detailsContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    padding: 20,
    height: '100%',
    width: '100%',
    transform: [{translateY: screenheight * 0.65}],
  },
  title: {
    fontSize: 28,
    color: 'black',
    fontWeight: '700',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: 'grey',
    fontWeight: '600',
    lineHeight: 40,
  },
});

export default ExpandedScreen;
