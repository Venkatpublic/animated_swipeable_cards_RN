import { View,Text,Animated, StyleSheet } from "react-native";
import DATA from "../../utils/data";
import  Ionicons  from 'react-native-vector-icons/Ionicons';
const AnimatedTitle =({ scroll })=>{


    return (
      <View style={styles.headerContainer}>
        <Animated.View style={{ transform: [{ translateY:scroll.interpolate({
      inputRange:[-1, 0, 1],
      outputRange: [70, 0, -70],
    })}] }}>
          {DATA.map((item, index) => {
            return (
              <View key={index} style={styles.subContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.header}
                </Text>
                <View style={styles.subContainerRow}>
                  <Text style={[styles.subTitle]}>
                    <Ionicons
                      name='location-outline'
                      size={16}
                      color='black'
                      style={{ marginRight: 5 }}
                    />
                    {item.address}
                  </Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </View>
            );
          })}
        </Animated.View>
      </View>
    );
  }
  export default AnimatedTitle
  const styles = StyleSheet.create({
   
    title: {
      fontSize: 25,
      fontWeight: '900',
      textTransform: 'uppercase',color:"black"
    },
    subTitle: {
      fontSize: 16,
      color:"black"
    },
    date: {
      fontSize: 12,
      color:"black"
    },
    subContainer: {
      height: 70,
      padding: 17,
    },
    subContainerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerContainer: {
      height: 70,
      overflow: 'hidden',
    },
  });