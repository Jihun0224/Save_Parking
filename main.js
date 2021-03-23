import React, {Component} from 'react';
import { StyleSheet, SafeAreaView,View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NaverMapView, {Marker} from "react-native-nmap";
import Icon from 'react-native-vector-icons/Ionicons';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MarkerDisplay from './MarkerDisplay';
window = Dimensions.get('window');
const API_KEY = process.env.REACT_APP_KAKAO_KEY;


export default class Main extends Component{
  constructor(){
    super();
    this.state={
        search:'',
        place_name:'',
    }
  }

  searchTextInputChanged(text) {
    this.setState({ searchedText: text })

          fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?y=37.514322572335935&x=127.06283102249932&radius=20000&query=${text}`, {
        headers: {
          Authorization: `KakaoAK ${API_KEY}` 
        }
      })
      .then(response => response.json())
      .then(json => {

        {json.documents.map((document)=>{
            console.log(document.place_name)
        })}


      });

  }
  

  render(){
    const currPos = {latitude: this.props.currPos.latitude, longitude: this.props.currPos.longitude};
    return (
      <SafeAreaView style={styles.container}>
            <SearchBar 
            style="auto"
                      platform="android"
                      onChangeText = {(text) => this.searchTextInputChanged(text)}
                      containerStyle={{borderWidth: 1, borderRadius: 15,}}
                      searchIcon={<Icon name="location" size={24} color="gray"/>}
                      placeholder='장소를 입력해 주세요.'/>

            <View style={styles.map}>
            <NaverMapView style={{width: '100%', height: '100%'}}
                          showsMyLocationButton={true}
                          center={{...currPos, zoom: 16}}
                          >
            
              <Marker coordinate={currPos} onClick={() => this._panel.show(window.height * 0.38)}/>

            </NaverMapView>

        <SlidingUpPanel ref={c => (this._panel = c)}
        backdropOpacity={0}
         snappingPoints={[
         window.height * 0.38,
         window.height * 0.7,
         window.height * 0.85,]}
         
         >
            <View style={styles.container}>
              {/* 여기 마커데이터 전달*/}
            <MarkerDisplay />
            </View>         
        </SlidingUpPanel>
            </View>
            
      </SafeAreaView>
    )}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 1,
      backgroundColor: 'white',
    },
    map:{
      flex:1,
    },

  });