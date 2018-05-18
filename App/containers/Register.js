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

import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Config from '../../config';
import ModalDropdown from 'react-native-modal-dropdown';
import PreferenceStore from '../utils/PreferenceStore';

import ActionSheet from 'react-native-actionsheet'


class Register extends Component {

    register() {
        let username = this.state.username;
        let password = this.state.password;
        let studentId = this.state.studentId;
        let studentname = this.state.studentname;
        let studentclass = this.state.sclass;
        let studentdept = this.state.sdept;
        if (username === null || password === null || studentId === null || studentname === null || studentdept === null || studentclass === null) {
            alert("信息填写不完整，注册失败");
            return false;
        }
        //this.setState({conreginst: true});
        proxy.postes({
            url: Config.server + '/reginster',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: username,
                userpwd: password,
                studentname: studentname,
                studentclass: studentclass,
                studentdept: studentdept,
                studentId: studentId,
                usertype: "1",//1是学生

            }
        }).then((json) => {
            this.setState({showProgress: false, conreginst: false});
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
            studentId: null,
            studentname: null,
            conreginst: false,
            sclass: null,
            sdept: null,
            fadeCancel: new Animated.Value(0),
            fadeNickNameCancel: new Animated.Value(0),
            fadePasswordCancel: new Animated.Value(0),
            fadeSportsLevel: new Animated.Value(0)

        }
    }

    showActionSheet() {
        this.ActionSheet.show()
    }

    show(actionSheet) {
        if (actionSheet === 'actionSheet2') {
            if (this.state.sdept !== null) {
                this[actionSheet].show();
            } else {
                alert('请先选择学院');
            }
        } else {
            this[actionSheet].show();
        }
    }

    render() {

        var options = ['取消', '无', '体育本科', '国家一级运动员', '国家二级运动员', '国家三级运动员'];
        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;
        let options1 = ['取消', '计算机学院', '其他学院'];
        let options2 = ['取消', '1班', '2班'];
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
                        <Text style={{color: '#fff', fontSize: 18}}>学生注册</Text>
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
                                <Text>学号：</Text>
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
                                    onChangeText={(studentId) => {
                                        this.setState({studentId: studentId});
                                    }}

                                    value={this.state.studentId}
                                    placeholder='     请输入学号'
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
                                    onChangeText={(studentname) => {
                                        this.setState({studentname: studentname});

                                    }}
                                    value={this.state.studentname}
                                    placeholder='请输入真实姓名'
                                    placeholderTextColor="#aaa"
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View style={{
                                height: 35 * height / 736,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: '#eee',
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderColor: '#eee',
                                }}>
                                    <Text>学院：</Text>
                                    <Text>{this.state.sdept}                         </Text>
                                </View>
                                <View style={{justifyContent: 'flex-end'}}>
                                    <TouchableOpacity
                                        style={{backgroundColor: '#EEEEEE', borderWidth: 1, borderRadius: 3}}
                                        onPress={() => {
                                            this.show('actionSheet1');
                                        }}>
                                        <Text>请点击</Text>

                                        <ActionSheet
                                            ref={(o) => {
                                                this.actionSheet1 = o;
                                            }}
                                            title="请选择学院"
                                            options={options1}
                                            cancelButtonIndex={CANCEL_INDEX}
                                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                            onPress={
                                                (data) => {
                                                    if (data !== 0) {
                                                        this.setState({sdept: options1[data]});
                                                    }
                                                }
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                height: 35 * height / 736,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderColor: '#eee',
                            }}>
                                <Text>班级：</Text>
                                <Text>{this.state.sclass}                         </Text>
                                <View style={{justifyContent: 'flex-end'}}>
                                    <TouchableOpacity
                                        style={{backgroundColor: '#EEEEEE', borderWidth: 1, borderRadius: 3}}
                                        onPress={() => {
                                            this.show('actionSheet2');
                                        }}>
                                        <Text>请点击</Text>

                                        <ActionSheet
                                            ref={(o) => {
                                                this.actionSheet2 = o;
                                            }}
                                            title="请选择班级"
                                            options={options2}
                                            cancelButtonIndex={CANCEL_INDEX}
                                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                            onPress={
                                                (data) => {
                                                    if (data !== 0) {
                                                        this.setState({sclass: options2[data]});
                                                    }
                                                }
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>
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

