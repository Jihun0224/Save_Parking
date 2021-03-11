import React, {Component} from 'react';
import { StyleSheet, View,Text } from 'react-native';


export default class Main extends Component{


  render(){
    const currPos = {latitude: this.props.currPos.latitude, longitude: this.props.currPos.longitude};
    return (
      <View style={styles.container}>
            
            <Text>{currPos.latitude}</Text>
            <Text>{currPos.longitude}</Text>

      </View>
    )}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });