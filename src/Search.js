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
import { debounce } from 'lodash';
import AnimatedHideView from 'react-native-animated-hide-view';
import { Input } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
window = Dimensions.get('window');
const API_KEY = "";
const request = debounce(() => {}, 500);

export default class Search extends Component{
  constructor(props){
    super(props);
    this.state={
        searchedText:'',
        searchLoaing:true,
        searchedPlace:{
          longitude:0,
          latitude:0,
        },
        suggestion:[{
          name:'',
          id:'',
          latitude:'',
          longitude:'',
          address_name:'',
        }],
        history:this.props.history,
    }
    this.searchTextInputChanged = this.searchTextInputChanged.bind(this);
    this.PlaceOnpress = this.PlaceOnpress.bind(this);
    this.GoBack = this.GoBack.bind(this);
  }
  debouceRequest = (value) =>{
    request(value)
    ,[]
  }
  searchTextInputChanged(text) {
    this.debouceRequest(text);
    this.setState({ searchedText: text, searchLoaing:true },()=>{
      if(this.state.searchedText != ''){
              fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?y=${parseFloat(this.props.currPos.latitude)}&x=${parseFloat(this.props.currPos.longitude)}&radius=20000&query=${this.state.searchedText}`, {
        headers: {
          Authorization: `KakaoAK ${API_KEY}` 
        }
      })
      .then(response => response.json())
      .then(json => {
        let j;
        if(json.documents.length > 15){
          j = 15;
        }
        else{
          j = json.documents.length
        }
        for(let i = 0; i < j; i++){
          this.setState({
            suggestion:[...this.state.suggestion,
            {name:json.documents[i].place_name, 
            id:json.documents[i].id,
            longitude:parseFloat(json.documents[i].x), 
            latitude:parseFloat(json.documents[i].y),
            address_name:json.documents[i].address_name}],
          })}
      })
      .then(()=>{
        const NewSuggestion = [];
        for (let i = 0; i < this.state.suggestion.length; i++) {
          if (this.state.suggestion[i].name.includes(this.state.searchedText)) {
            NewSuggestion.push(this.state.suggestion[i]);
          }
        }
        this.setState({suggestion:[...new Set(NewSuggestion.map(JSON.stringify))].map(JSON.parse)});
      })
      .then(()=>{
        this.setState({searchLoaing:false});
      })}
      else{
        this.setState({suggestion:[]})
      }
    })
  }
  GoBack(){
    this.setState({searchedText:''},()=>{
      this.props.closeSearch();
    })
  }
  PlaceOnpress(place){
    var HistoryAdd = true;
    for(let i=0; i<this.state.history.length; i++){
          if(this.state.history[i].id == place.id){
            HistoryAdd = false;
            break;
          }
    }
    if(HistoryAdd){
      this.setState(
        {searchedPlace:{longitude:place.longitude, 
                        latitude:place.latitude},
        searchedText:'',
    },()=>{
      this.props.addHistory(place)
      this.props.setSearchedPlace(this.state.searchedPlace);
      this.props.closeSearch();
    })
    }
    else{
      this.setState(
        {searchedPlace:{longitude:place.longitude, 
                        latitude:place.latitude},
        searchedText:'',
    },()=>{
      this.props.setSearchedPlace(this.state.searchedPlace);
      this.props.closeSearch();
    })
    }
  }
  HistoryRemove= (id) => {
      const newData = this.state.history.filter((history) => {
        return history.id != id
      })
      this.setState({history:newData})
      this.props.HistoryRemove(newData)
  }
  renderHeader = () => {
    return (
      <View style={styles.searchHeader}>
        <TouchableOpacity 
          onPress={()=>this.GoBack()}
        >
          <FeatherIcon 
            style={styles.backIcon} 
            name="arrow-left" 
            size={24} 
            color="gray"
          />
        </TouchableOpacity>
          <Input
            value={this.state.searchedText}
            inputContainerStyle={{borderBottomWidth:0, marginTop:5}}
            containerStyle={styles.input}
            onChangeText={text => this.searchTextInputChanged(text)}
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
    const History = ({ place }) => {
      if(this.state.history.length > 1){
        return (
          <View>
            {place.name !=''&&
              <View style={styles.list}>
                <View style={styles.placelist}>
                <TouchableOpacity onPress={()=>this.PlaceOnpress(place)}>
                    <Text style={styles.place_name}>
                        <IoniconsIcon 
                          style={styles.historyClockIcon}
                          name="time-outline" 
                          size={24} 
                          color="gray"
                        />
                        {place.name}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>this.HistoryRemove(place.id)}
                  style={styles.historyXIcon}
                >
                  <FeatherIcon 
                    name="x" 
                    size={24} 
                    color="gray"
                  />
                </TouchableOpacity>  
            </View>
            <Text style={styles.address_name}>
              {place.address_name}  
            </Text>      
          </View>
            }  
      </View>
      )
    }
    else{
      return null
    }
  }
  const Suggestion = ({place}) => {
    if(this.state.suggestion.length > 1){
      return (
        <View>
          {place.name !=''&& this.state.searchLoaing == false &&
            <View style={styles.list}>
              <View style={styles.placelist}>
                <TouchableOpacity onPress={()=>this.PlaceOnpress(place)}>
                  <Text style={styles.place_name}>
                    <IoniconsIcon 
                      name="location" 
                      size={24} 
                      color="gray"
                    />
                    {place.name}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.address_name}>
                {place.address_name}  
              </Text>      
            </View>
          }

        </View>
      )
    }
  else{
    return null
  }
}
  const renderHistory = ({ item }) => (
    <History place={item} />
  );
  const renderSuggestion= ({ item }) => (
    <Suggestion place={item} />
  );
    return (
      <SafeAreaView style={styles.container}>
        <AnimatedHideView
          visible={this.props.isSearchVisible}
          style={styles.search_window}
          >
        {this.state.searchedText == ''
        ?
          <FlatList
            data={this.state.history}
            keyExtractor={item => item.id}
            renderItem={renderHistory}
            ListHeaderComponent={this.renderHeader}
          />
        : <FlatList
            data={this.state.suggestion}
            keyExtractor={item => item.id}
            renderItem={renderSuggestion}
            ListHeaderComponent={this.renderHeader}
          />
        }
        </AnimatedHideView>
      </SafeAreaView>
    )}
}
const styles = StyleSheet.create({
  container:{
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
    paddingTop:15,
    paddingLeft:10
  },
  xIcon:{
    alignItems:'flex-end',
    paddingRight:10,
    paddingTop:15,
  },
  input:{
    width:window.width-75,
  },
  item: {
    paddingTop: 5,
  },
  place_name:{
    fontSize:24,
    paddingStart:15,
    paddingTop:15
  },
  placelist: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyClockIcon:{
    marginRight:10
  },
  historyXIcon:{
    paddingEnd:15,
    paddingTop:15
  },
  address_name:{
    color:"gray",
    fontSize:15,
    paddingLeft:15
  }
});