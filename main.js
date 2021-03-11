import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
// import Icon from 'react-native-vector-icons/Ionicons';

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
  
//   componentDidMount(){
//     var queryParams = '?' + encodeURIComponent('ServiceKey') + '=서비스키'; /* Service Key*/
//         queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /*타입*/
//         queryParams += '&' + encodeURIComponent('institutionNm') + '=' + encodeURIComponent(''); /**/


//   } 

  render(){
    const currPos = {latitude: this.props.currPos.latitude, longitude: this.props.currPos.longitude};
    return (
      <View style={styles.container}>
            
            <SearchBar style={styles.textinput} 
                      platform="android"
                      onChangeText = {(text) => this.searchTextInputChanged(text)}
                      containerStyle={{borderWidth: 1, borderRadius: 15}}
                    //   searchIcon={<Icon name="location" size={24} color="gray"/>}
                      placeholder='장소를 입력해 주세요.'/>
           

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