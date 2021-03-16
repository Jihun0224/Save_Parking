import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Button,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

export default class Bottom_Sheet extends React.Component {
  state = {
    opacity: new Animated.Value(0),
    isOpen: this.props.isOpen,
  };
  bs = React.createRef(null);
  window = Dimensions.get('window');

  renderHeader = name => (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        height: 40,

      }}>
      <Text style={{ textAlign: 'center', fontSize: 20, padding: 5 }}>
        장소명
      </Text>
    </View>
  );

  renderInner = () => (
    <View
    style={{
      width: '100%',
      backgroundColor: 'white',
      height: '100%',

    }}>
      <Text style={{ textAlign: 'center', fontSize: 20, padding: 5 }}> 
      이놈인가
      </Text>
    </View>
  );

  onClose = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
    this.bs.current.snapTo(0);
    setTimeout(() => {
      this.setState({ isOpen: false });
    }, 50);
  };

  onOpen = () => {
    this.setState({ isOpen: true });
    this.bs.current.snapTo(1);
    Animated.timing(this.state.opacity, {
      toValue: 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  renderBackDrop = () => (
    <Animated.View
      style={{
        opacity: this.state.opacity,
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
      <TouchableOpacity
        style={{
          width: this.window.width,
          height: this.window.height,
          backgroundColor: 'transparent',
        }}
        activeOpacity={1}
        onPress={this.onClose}
      />
    </Animated.View>
  );

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.wow} onPress={this.onOpen}>
          <Text>Press me </Text>
        </TouchableOpacity>
        {this.state.isOpen && this.renderBackDrop()}
        <BottomSheet
          ref={this.bs}
          snapPoints={[
            '-10%',
            this.window.height * 0.5,
            this.window.height * 0.7,
            this.window.height * 0.85,
          ]}
          initialSnap={0}
          renderHeader={this.renderHeader}
          renderContent={this.renderInner}
          onCloseEnd={this.onClose}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  wow: {
    backgroundColor: 'red',
    margin: 50,
    padding: 10,
    width: 100,
  },
});