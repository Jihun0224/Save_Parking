import React, {Component} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";
import Icon from 'react-native-vector-icons/Ionicons';
import Bottomsheet from './bottomsheet';
export default class Main extends Component{
  constructor(){
    super();
    this.state={
        search:'',
        showComponent: false,
    }
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  searchTextInputChanged(text) {
    this.setState({ searchedText: text })
  }
  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }



  render(){
    const currPos = {latitude: this.props.currPos.latitude, longitude: this.props.currPos.longitude};
    return (
      <SafeAreaView style={styles.container}>
            
            <SearchBar style={styles.textinput} 
                      platform="android"
                      onChangeText = {(text) => this.searchTextInputChanged(text)}
                      containerStyle={{borderWidth: 1, borderRadius: 15}}
                      searchIcon={<Icon name="location" size={24} color="gray"/>}
                      placeholder='장소를 입력해 주세요.'/>
           

            <View style={styles.map}>
            <NaverMapView style={{width: '100%', height: '100%'}}
                          showsMyLocationButton={true}
                          center={{...currPos, zoom: 16}}
                          onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
                          onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
                          onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>


            </NaverMapView>
            <Marker coordinate={{ latitude: 128.6402609, longitude:35.2538433 }} onClick={this._onButtonClick}/>
            {this.state.showComponent ?
           <Bottomsheet /> :
           null
        }
            </View>
      </SafeAreaView>
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