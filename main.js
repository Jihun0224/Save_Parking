import React, {Component} from 'react';
import { StyleSheet, SafeAreaView,View, TouchableOpacity, Text, Dimensions } from 'react-native';
import NaverMapView, {Marker} from "react-native-nmap";
import SlidingUpPanel from 'rn-sliding-up-panel';
import MarkerDisplay from './MarkerDisplay';
import Search from './Search';
window = Dimensions.get('window');


export default class Main extends Component{
  constructor(){
    super();
    this.state={

    }
  }

  render(){
    const currPos = {latitude: this.props.currPos.latitude, longitude: this.props.currPos.longitude};
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchbar}>
          <Search/>
        </View>
            

            <View style={styles.map}>
              <NaverMapView style={{width: '100%', height: '100%'}}
                            showsMyLocationButton={true}
                            center={{...currPos, zoom: 16}}
                            >
              
                <Marker coordinate={currPos} onClick={() => this._panel.show(window.height * 0.38)}/>

              </NaverMapView>
        
            <SlidingUpPanel 
            ref={c => (this._panel = c)}
            style={styles.panel}
            backdropOpacity={0}
            snappingPoints={[
            window.height * 0.38,
            window.height * 0.7,
            window.height * 0.85,]}
            >              
                  {/* 여기 마커데이터 전달*/}
                <MarkerDisplay />
            </SlidingUpPanel>

        </View>
            
      </SafeAreaView>
    )}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      
    },
    map:{
      flex:1,
    },
    searchbar:{
      zIndex:3,
      position:"absolute",
      top:10,
      left:10,
      width:window.width-20,
      
    },
    panel:{
      zIndex:2,
    }
  });