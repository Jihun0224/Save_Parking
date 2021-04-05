import React,{Component} from 'react';
import { TouchableOpacity } from 'react-native';
import {SafeAreaView, View, Text, Modal, Button} from 'react-native';
import { colors } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';


class PathDisplay extends Component {
    constructor(props){
      super(props);
      this.state={
          ModalVisible: this.props.ModalVisible,
    }

    }

    render(){

    return(
        <View style={styles.container}>
            <Modal 
            animationType='slide'
            transparent={true}
            visible={this.state.ModalVisible}
            >
                <View style={styles.modalView}>
                    <View style={styles.close_button}>
                        <TouchableOpacity onPress={() => this.setState({ModalVisible:false})}>
                            <Text>
                                 <FeatherIcon style={styles.backIcon} name="arrow-left" size={24} color="gray"/>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cctv}>
                        <Text style={styles.cctv_text}>CCTV</Text>
                    </View>
                    <View style={styles.time}>
                        <Text style={styles.time_text}>단속시간 07:15</Text>
                    </View>
                    <View style={styles.numbersoftime}>
                        <Text style={styles.numbersoftime_text}>다수</Text>
                    </View>
                    <View style={styles.address}>
                        <Text style={styles.address_text}>경상남도 창원시 의창구 사림동 8-15</Text>
                    </View>
                </View>
            </Modal>     
        </View>
    )
    }
}
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    close_button:{
        position: 'absolute',
        top: 10,
        left: 10
    },
    modalView:{
        width: '100%',
        height: 120,
        top: 615,
        borderRadius:25,
        backgroundColor:'white'
      },
    cctv:{
        position: 'absolute',
        width: '50%',
        left: 50,
        top: 25,
    },
    cctv_text:{
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue',
    },
    numbersoftime:{
        position: 'absolute',
        width:40,
        left: 50,
        top: 80,
    },
    numbersoftime_text:{
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold'
    },
    time:{
        width:'50%',
        top: 35,
        left: 160,
    },
    time_text:{
        fontSize: 17,
        fontWeight: 'bold',
        color: 'grey',
    },
    address:{
        left: 110,
        top: 60,
        left_border: 'black',
    },
    address_text:{
        fontSize: 16
    }
}
 
export default PathDisplay;