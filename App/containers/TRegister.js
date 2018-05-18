import React, {Component} from 'react';
import {
    Alert,
    Dimensions,
    TextInput,
    ListView,
    ScrollView,
    Image,
    View,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    Modal
} from 'react-native';

import {connect} from 'react-redux';

var {height, width} = Dimensions.get('window');
var proxy = require('../proxy/Proxy');
import Config from '../../config';

import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import PreferenceStore from '../utils/PreferenceStore';

import ActionSheet from 'react-native-actionsheet'


class Register extends Component {
//2是教师
    register() {
        let username = this.state.username;
        let password = this.state.password;
        let teachername = this.state.teachername;
        let teacherId = this.state.teacherId;
        if (this.state.incode !== "admin") {
            alert("内部码错误不能注册");
            return false;
        }
        if (username === null || password === null || teacherId === null || teachername === null) {
            alert("信息填写不完整，注册失败");
            return false;
        }
        this.setState({conreginst:true});
        proxy.postes({
            url: Config.server + '/reginster',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: username,
                userpwd: password,
                usertype: "2",
                teachername:teachername,
                teacherId:teacherId,
            }
        }).then((json) => {
            this.setState({showProgress: false,conreginst:false});
            if (json.message === 1) {
                alert("注册成功");
                this.goback();
            }

        }).catch((err) => {

        })
    }

    goback() {
        //TODO:dispatch a action
        const {navigator} = this.props;

        if (navigator) {
            navigator.pop();
            if (this.props.reset)
                this.props.reset();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            portrait: null,
            teachername: null,
            teacherId: null,
            conreginst:false,
            fadeCancel: new Animated.Value(0),
            fadeNickNameCancel: new Animated.Value(0),
            fadePasswordCancel: new Animated.Value(0),
            fadeSportsLevel: new Animated.Value(0)

        }
    }

    showActionSheet() {
        this.ActionSheet.show()
    }

    render() {

        var options = ['取消', '无', '体育本科', '国家一级运动员', '国家二级运动员', '国家三级运动员'];
        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{
                    height: 55,
                    width: width,
                    paddingTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#6ddbf5',
                    borderBottomWidth: 1,
                    borderColor: '#ddd'
                }}>
                    <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}
                                      onPress={() => {
                                          this.goback();
                                      }}>
                        <Icon name={'angle-left'} size={30} color="#fff"/>
                    </TouchableOpacity>
                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{color: '#fff', fontSize: 18}}>教师注册</Text>
                    </View>
                    <View style={{flex: 1}}/>

                </View>

                <View style={{flex: 1, backgroundColor: '#eee', paddingTop: 15, paddingBottom: 10}}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                        backgroundColor: '#fff', marginTop: 15
                    }}>
                        <View style={{flex: 3, padding: 5,}}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: '#eee'
                            }}>
                                <Text>工号：</Text>
                                <TextInput
                                    style={{
                                        height: 35 * height / 736,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                        fontSize: 13
                                    }}
                                    onChangeText={(teacherId) => {
                                        this.setState({teacherId: teacherId});
                                    }}

                                    value={this.state.teacherId}
                                    placeholder='     请输入工号'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />

                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: '#eee'
                            }}>
                                <Text>用户名：</Text>
                                <TextInput
                                    style={{
                                        height: 35 * height / 736,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                        fontSize: 13
                                    }}
                                    onChangeText={(username) => {
                                        this.setState({username: username});
                                    }}

                                    value={this.state.username}
                                    placeholder=' 请输入用户名'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />

                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: '#eee',
                            }}>
                                <Text>密码：</Text>
                                <TextInput
                                    style={{
                                        height: 35 * height / 736,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                        fontSize: 13
                                    }}
                                    onChangeText={(password) => {
                                        this.setState({password: password});

                                    }}
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    placeholder='     请输入密码 '
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: '#eee',
                            }}>
                                <Text>真实姓名：</Text>
                                <TextInput
                                    style={{
                                        height: 35 * height / 736,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                        fontSize: 13
                                    }}
                                    onChangeText={(teachername) => {
                                        this.setState({teachername: teachername});

                                    }}

                                    value={this.state.teachername}
                                    placeholder='请输入真实姓名'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: '#eee',
                            }}>
                                <Text>内部码：</Text>
                                <TextInput
                                    style={{
                                        height: 35 * height / 736,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 4,
                                        paddingBottom: 4,
                                        fontSize: 13
                                    }}
                                    onChangeText={(incode) => {
                                        this.setState({incode: incode});

                                    }}
                                    secureTextEntry={true}
                                    value={this.state.incode}
                                    placeholder='     请输入内部码'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{
                        height: 30,
                        width: width * 0.4,
                        marginLeft: width * 0.3,
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 3,
                        backgroundColor: '#66CDAA'
                    }}
                                      disabled={this.state.conreginst}
                                      onPress={() => {
                                          this.register();
                                      }}>
                        <Text style={{color: '#fff', fontSize: 13}}>完成</Text>
                    </TouchableOpacity>
                </View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'选择运动水平'}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={(i) => {
                        if (i != 0 && i != 1) {
                            this.setState({
                                sportLevelStr: options[i],
                                info: Object.assign(this.state.info, {sportLevel: i - 1})
                            })
                        } else if (i == 1) {
                            this.setState({
                                sportLevelStr: null,
                                info: Object.assign(this.state.info, {sportLevel: null,})
                            })
                        } else {
                        }
                    }}
                />
            </View>
        );
    }

}

var styles = StyleSheet.create({

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    typeButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    buttonsSpace: {
        width: 10,
    },
    imageStyle: {
        width: 70,
        height: 70,
        marginTop: 10,
        borderWidth: 2,
    },
});

const mapStateToProps = (state, ownProps) => {

    const props = {}
    return props
}

//export default connect(mapStateToProps)(Register);
module.exports = connect(state => ({})
)(Register);

