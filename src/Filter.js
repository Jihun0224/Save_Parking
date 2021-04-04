import React, {Component} from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  View, 
  TouchableOpacity, 
  Text, 
  Dimensions,
} from 'react-native';
import { Input } from 'react-native-elements';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
window = Dimensions.get('window');

export default class Filter extends Component{

  render(){

    return (
      <SafeAreaView style={styles.container}>

      </SafeAreaView>
    )}
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width:window.width,
    height:window.height,
    backgroundColor:'#fff',
  },
});