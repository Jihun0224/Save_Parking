import React,{Component} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ActivityIndicator, 
  Dimensions 
} from 'react-native';
window = Dimensions.get('window');

export default class Loading extends Component{
  render(){
    return (
      <View style={styles.container}>
        <ActivityIndicator 
          style={styles.indicator}
          size="large" 
          color="#fff" 
        />
      </View>
    );
}
}
const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent:"flex-start",
      paddingHorizontal:30,
      paddingVertical:100,
      backgroundColor: "#1a2c54",

    },
    indicator:{
      position:'absolute',
      top:window.height/2,
      left:window.width/2
    }
  });