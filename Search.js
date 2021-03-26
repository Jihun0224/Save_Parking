import React, {Component} from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
  View, 
  TouchableOpacity, 
  Text, 
  Dimensions,
  FlatList,
} from 'react-native';
import { Input } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
window = Dimensions.get('window');
const API_KEY = "";


export default class Search extends Component{
  constructor(props){
    super(props);
    this.state={
      searchedText:'',
      place_name:'',
    }
  }

  searchTextInputChanged(text) {
    this.setState({ searchedText: text })

      //     fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?y=37.514322572335935&x=127.06283102249932&radius=20000&query=${text}`, {
      //   headers: {
      //     Authorization: `KakaoAK ${API_KEY}` 
      //   }
      // })
      // .then(response => response.json())
      // .then(json => {
      //   {json.documents.map((document)=>{
      //       console.log(document.place_name)
      //   })}
      // });
  }
  renderHeader = () => {
    return (
      <View style={styles.searchHeader}>
        <TouchableOpacity 
          onPress={this.props.closeSearch}
        >
          <FeatherIcon 
            style={styles.backIcon} 
            name="arrow-left" 
            size={24} 
            color="gray"
          />
        </TouchableOpacity>
          <Input
            inputContainerStyle={{borderBottomWidth:0, marginTop:5}}
            containerStyle={styles.input}
            onChangeText={text => this.setState({searchedText:text})}
            autoCorrect={false}
            autoCapitalize = "none"
            placeholder="장소를 입력해주세요."
          />
          {this.state.searchedText != ''&&
            <TouchableOpacity 
              onPress={()=>{this.setState({searchedText:''})}}
            >
              <FeatherIcon 
                style={styles.xIcon} 
                name="x" 
                size={24} 
                color="gray"
              />
          </TouchableOpacity>  
        }          
      </View>
    );
  };

  render(){
    return (
      <SafeAreaView style={styles.container}>
            <FlatList

              ListHeaderComponent={this.renderHeader}
            />
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
  searchHeader:{
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor:'gray',
    height:60
  },
  backIcon:{
    alignItems:'flex-start',
    paddingTop:13,
    paddingLeft:10
  },
  xIcon:{
    alignItems:'flex-end',
    paddingRight:10,
    paddingTop:13,
  },
  input:{
    width:window.width-75,
  }
  });