import React, {Component} from 'react';
import {
    NetInfo,
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    Image,
    Text,
    TextInput,
    ListView,
    ActivityIndicator,
    View,
    Alert,
    Modal,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import Config from '../../config';
import {connect} from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box'
import PopupDialog from 'react-native-popup-dialog';
import Camera from 'react-native-camera';

var Dimensions = require('Dimensions');
var {height, width} = Dimensions.get('window');
var proxy = require('../proxy/Proxy');
var Popover = require('react-native-popover');
import Quary from './Query';
import {setGoodsInfo} from "../action/actionCreator";

class Tmainpage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            infoList: null,
            sortList: null,
            orderType: 0,
            wait: false,
            start: 0,
            limit: 20,
            arrlong: 0,
            first: 1,
            lastend: 0,
            check: {name:null,check:false},
            checklist:[],
            classs: this.props.classs,
            dept: this.props.dept,
        };
    }

    navigatorQuary() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
            if (this.props.reset)
                this.props.reset();
        }
    }

    goBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
            if (this.props.reset)
                this.props.reset();
        }

    }

    getPriceDText_2() {
        let classs = this.state.classs;
        let dept = this.state.dept;
        this.setState({showProgress: true,infoList:[]});
        let checklist = this.state.checklist;
        let check=this.state.check;
        proxy.postes({
            url: Config.server + "/getnamelist",
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                classs: classs,
                dept: dept,
            }
        }).then((json) => {
            let classlist = json.data;
            if (classlist !== null) {
                for (let i = 0; i < classlist.length; i++) {
                    check.name=classlist;
                    check.check=false;
                    checklist.push(check);
                }
                alert(checklist);
                this.setState({checklist: checklist, infoList: classlist, showProgress: false});
            }
            else {
                this.state.infoList = [];
            }
        }).catch((err) => {
            alert(err);
        });
    }


    renderRow(rowData, rowId) {
        let row =
            <View>
                <TouchableOpacity onPress={() => {
                        this.checkjudge(rowData);
                }}>
                    <View style={{
                        flex: 1, padding: 10, borderBottomWidth: 1, borderColor: '#ddd',
                        justifyContent: 'flex-start', backgroundColor: '#fff'
                    }}>
                        <View style={{paddingTop: 5, flexDirection: 'row'}}>
                            <Text style={{flex: 1}}>{rowData}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>;
        return row;
    }

    checkjudge(){

    }

    navigatorclass() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Register',
                component: Register,
                params: {}
            })
        }
    }

    sortchangeorder() {
        var orderType = this.state.orderType;
        if (orderType === 0) {
            this.state.orderType = 1;
        }
        else {
            this.state.orderType = 0;
        }
        this.state.infoList = [];
        this.state.start = 0;
        this.state.first = 1;
        this.getPriceDText_2();
    }


    render() {

        var listView = null;
        var wait = this.state.wait;
        var infoList = this.state.infoList;
        if (infoList !== undefined && infoList !== null) {
            var data = infoList;
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            listView =
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(data)}
                    renderRow={this.renderRow.bind(this)}
                />
        } else {
            //this.state.infoList = [];
            this.getPriceDText_2();
        }
        return (
            <View style={{flex: 1}}>
                {/* header bar */}
                <View style={[{
                    backgroundColor: '#6ddbf5',
                    height: 55,
                    padding: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }, styles.card]}>

                    <TouchableOpacity style={{marginRight: 20}}
                                      onPress={() => {
                                          this.goBack();
                                      }}>
                        <Icon name="chevron-left" color="#fff" size={25}/>
                    </TouchableOpacity>

                    <Text style={{fontSize: 20, flex: 3, color: '#fff'}}>
                        人员列表
                    </Text>
                </View>
                {/*nei rong*/}
                <View style={{flex: 1}}>
                    <View style={{flex: 7, borderBottomWidth: 1, borderColor: '#ddd'}}>
                        {listView}
                    </View>
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.showProgress}
                        onRequestClose={() => {
                            this.setState({showProgress: false})
                        }}
                    >
                        <View style={[styles.modalContainer, styles.modalBackgroundStyle]}>
                            <ActivityIndicator
                                animating={true}
                                style={[styles.loader, {height: 80}]}
                                size="large"
                                color="#fff"
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <Text style={{color: '#fff', fontSize: 18, alignItems: 'center'}}>
                                    正在获取数据..
                                </Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}


var styles = StyleSheet.create({
    card: {
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2,},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    table: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#343434',
        //marginBottom: 10,
        marginRight: 10,
        marginTop: 15,
        marginLeft: 10,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    modalBackgroundStyle: {
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    box: {
        position: 'absolute',
        right: 1 / 2 * width - 100,
        top: 1 / 2 * height - 100,
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#387ef5',
        backgroundColor: 'transparent'
    },
    loader: {
        marginTop: 10
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    dropdown: {
        flex: 1,
        paddingRight: 10,
        backgroundColor: 'transparent',
        borderLeftWidth: 1,
        borderLeftColor: '#ddd',
    },
    dropdown_dropdownTextStyle: {
        width: 200,
        borderWidth: 1,
        paddingLeft: 5,
        borderColor: '#20C3DD'
    },
    dropdown_3_dropdownTextHighlightStyle: {
        backgroundColor: '#fff',
        color: '#000'
    },
});


module.exports = connect(state => ({})
)(Tmainpage);