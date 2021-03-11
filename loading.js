import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SaveParking</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent:"flex-start",
      paddingHorizontal:30,
      paddingVertical:100,
      backgroundColor: "#FDF6AA",

    },
    text:{
        color:"#2c2c2c",
        fontSize: 30,

    }
  });