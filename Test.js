import React from 'react'
import {SafeAreaView,View, TouchableOpacity, Text, ScrollView, Dimensions, Animated} from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import Icon from 'react-native-vector-icons/Ionicons';
window = Dimensions.get('window');
const draggableRange = {top: window.height * 0.95, bottom: 0}
const animatedValue = new Animated.Value(300)

const styles = {
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dragHandler: {
    alignSelf: 'stretch',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc'
  },
  naviIcon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1
  },
}
class ScrollViewInsidePanel extends React.Component {
  

  render() {

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => this._panel.show(window.height * 0.4)}>
          <View>
            <Text>Show</Text>
          </View>
        </TouchableOpacity>
        <SlidingUpPanel ref={c => (this._panel = c)}
          animatedValue={animatedValue}
          draggableRange={draggableRange}
         snappingPoints={[
         window.height * 0.4,
         window.height * 0.7,
         window.height * 0.85,]}
         
         >
          {dragHandler => (
            <View style={styles.container}>
              <View style={styles.dragHandler} {...dragHandler}>

            <Icon tyle={styles.naviIcon} name="navigate-circle-sharp" size={24} color="blue"/>
                <Text>주차장 이름</Text>
              </View>
              <ScrollView>
                
                <Text>Here is the content inside panel</Text>

              </ScrollView>
            </View>
          )}
        </SlidingUpPanel>
      </SafeAreaView>
    )
  }
}

export default ScrollViewInsidePanel