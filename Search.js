import React, {Component} from 'react';
import { StyleSheet, SafeAreaView,View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
window = Dimensions.get('window');
// const API_KEY = process.env.REACT_APP_KAKAO_KEY;
const API_KEY = "";


export default class Search extends Component{
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
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar 
            style="auto"
            platform="android"
            onChangeText = {(text) => this.searchTextInputChanged(text)}
            containerStyle={{borderWidth: 1, borderRadius: 15}}
            searchIcon={<Icon name="location" size={24} color="gray"/>}
            placeholder='장소를 입력해 주세요.'/>

      </SafeAreaView>
    )}
}
const styles = StyleSheet.create({

    
  });