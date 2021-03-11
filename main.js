import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";

export default class Main extends Component{
  constructor(){
    super();
    this.state={
        search:'',
    }
  }

  searchTextInputChanged(text) {
    this.setState({ searchedText: text })
  }

  render(){
    const currPos = {latitude: this.props.currPos.latitude, longitude: this.props.currPos.longitude};
    return (
      <View style={styles.container}>
            
            <View style={styles.map}>
            <NaverMapView style={{width: '100%', height: '100%'}}
                          showsMyLocationButton={true}
                          center={{...currPos, zoom: 16}}
                          onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
                          onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
                          onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>

            </NaverMapView>
            </View>
      </View>
    )}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map:{
      flex:1,
    }

  });