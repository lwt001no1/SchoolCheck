/**
 * Created by danding on 16/11/13.
 */

import React from 'react';

var {
    Component
} = React;

import {
    Image,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    ActivityIndicator,
    TabBarIOS,
    Dimensions,
    Button,
    ScrollView,
    Alert,
    Modal,
    TouchableOpacity
} from 'react-native';


import {connect} from 'react-redux';

var {height, width} = Dimensions.get('window');
var Platform = require('Platform');
import {loginAction, setTimerAction} from '../action/actionCreator';
import Config from '../../config';
import Register from './Register';
import TRegister from './TRegister';
import Smainpage from './Smainpage';
import Tmainpage from './Tmainpage';

var proxy = require('../proxy/Proxy');
import PreferenceStore from '../utils/PreferenceStore';

var thiz = null;


var Login = React.createClass({

    onLoginPressed: function () {
        var user = this.state.user;
        var username = user.username;
        var password = user.password;
        if (username !== undefined && username !== null && username !== '') {
            if (password !== undefined && password !== null && password !== '') {
                this.setState({showProgress: true});
                if (Platform.OS === 'android') {
                    /*this.timer = setTimeout(
                        function () {
                            this.setState({showProgress: false});
                            alert("登录失败");
                        }.bind(this)
                        ,
                        10000
                    );*/
                    proxy.postes({
                        url: Config.server + '/login',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: {
                            loginName: username,
                            password: password,
                        }
                    }).then((json) => {
                        this.setState({showProgress: false});
                        if (json.message === 1) {
                            if (json.usertype === '1') {

                                this.Smainpage();
                            } else if (json.usertype === '2') {

                                this.Tmainpage();
                            }
                        }else{
                            alert(json.message);
                        }
                    }).catch((err) => {
                        alert("服务错误");
                    })
                }

            } else {
                Alert.alert(
                    '错误',
                    '请填写密码后再点击登录',
                    [
                        {
                            text: 'OK', onPress: () => {
                        }
                        },
                    ]
                );
            }
        } else {
            Alert.alert(
                '错误',
                '请填写用户名后再点击登录',
                [
                    {
                        text: 'OK', onPress: () => {
                    }
                    },
                ]
            );
        }
    },

    Szhuce() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Register',
                component: Register,
                params: {}
            })
        }
    },
    Smainpage() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Smainpage',
                component: Smainpage,
                params: {}
            })
        }
    },
    Tmainpage() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Tmainpage',
                component: Tmainpage,
                params: {}
            })
        }
    },
    Tzhuce() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'TRegister',
                component: TRegister,
                params: {}
            })
        }
    },

    mapage() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Register',
                component: Register,
                params: {}
            })
        }
    },

    showProgress() {
        this.setState({animating: false, querenstate: false});
    },

    getInitialState: function () {
        return ({
            user: {},
            querenstate: false,
            modalVisible: false,
            showProgress: false,
            loginDot: '.....',
            animating: false,
        });
    },


    render: function () {

        const shadowOpt = {
            width: width - 20,
            height: 200,
            color: "#000",
            border: 2,
            radius: 3,
            opacity: 0.2,
            x: 0,
            y: 1.5,
            style: {marginVertical: 5}
        };
        if (Platform.OS === 'android') {
            return (
                <View style={[styles.container]}>

                    <View style={[{
                        backgroundColor: '#6ddbf5',
                        padding: 10,
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }]}>
                        <Text style={{color: '#fff', fontSize: 22}}>SchoolCheck</Text>
                    </View>

                    <View style={{justifyContent: 'center', flexDirection: 'row', padding: 10, marginTop: 10}}>

                        <Text style={{color: '#FF1A23', fontSize: 40}}></Text>

                    </View>

                    <View style={{padding: 10, paddingTop: 2}}>
                        {/*输入用户名*/}
                        <View style={[styles.row, {borderBottomWidth: 0}]}>

                            <View style={{
                                flex: 1,
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: '#ddd',
                                flexDirection: 'row'
                            }}>

                                <View style={{
                                    flex: 2,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    padding: 16,
                                    paddingLeft: 20,
                                    paddingRight: 15,
                                    marginLeft: 10
                                }}>
                                    <Text style={{fontSize: 16, color: '#444'}}>用户名</Text>
                                </View>


                                <View style={{flex: 6, flexDirection: 'row', alignItems: 'center'}}>
                                    <TextInput
                                        style={{
                                            height: 46,
                                            flex: 1,
                                            paddingLeft: 20,
                                            paddingRight: 10,
                                            paddingTop: 2,
                                            paddingBottom: 2,
                                            fontSize: 16
                                        }}
                                        onChangeText={(username) => {

                                            this.state.user.username = username;
                                            this.setState({user: this.state.user});
                                        }}
                                        value={this.state.user.username}
                                        placeholder='在此输入用户名'
                                        placeholderTextColor="#aaa"
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                        </View>


                        {/*输入密码*/}
                        <View style={[styles.row, {borderBottomWidth: 0, borderTopWidth: 0}]}>

                            <View style={{
                                flex: 1,
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: '#ddd',
                                flexDirection: 'row'
                            }}>

                                <View style={{
                                    flex: 2,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    padding: 16,
                                    paddingLeft: 20,
                                    paddingRight: 15,
                                    marginLeft: 10
                                }}>
                                    <Text style={{fontSize: 16, color: '#444'}}>密码</Text>
                                </View>


                                <View style={{flex: 6, flexDirection: 'row', alignItems: 'center'}}>
                                    <TextInput
                                        style={{
                                            height: 46,
                                            flex: 1,
                                            paddingLeft: 20,
                                            paddingRight: 10,
                                            paddingTop: 2,
                                            paddingBottom: 2,
                                            fontSize: 16
                                        }}
                                        onChangeText={(password) => {
                                            this.state.user.password = password;
                                            this.setState({user: this.state.user});
                                        }}
                                        secureTextEntry={true}
                                        value={this.state.user.password}
                                        placeholder='在此输入密码'
                                        placeholderTextColor="#aaa"
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                        </View>

                        {/*登录*/}
                        <View style={[styles.row, {borderBottomWidth: 0, marginTop: 140}]}>

                            <TouchableOpacity style={{
                                flex: 1,
                                backgroundColor: '#6DDBF5',
                                padding: 10,
                                margin: 10,
                                borderRadius: 6,
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }} onPress={() => {
                                this.onLoginPressed()
                            }}>
                                <Text style={{color: '#fff', fontSize: 18}}>登录</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row, {borderBottomWidth: 0, marginTop: 20}]}>

                            <TouchableOpacity style={{
                                flex: 1,
                                backgroundColor: '#6DDBF5',
                                padding: 10,
                                margin: 10,
                                borderRadius: 6,
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }} onPress={() => {
                                this.Szhuce()
                            }}>
                                <Text style={{color: '#fff', fontSize: 18}}>学生注册</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flex: 1,
                                backgroundColor: '#6DDBF5',
                                padding: 10,
                                margin: 10,
                                borderRadius: 6,
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }} onPress={() => {
                                this.Tzhuce()
                            }}>
                                <Text style={{color: '#fff', fontSize: 18}}>教师注册</Text>
                            </TouchableOpacity>
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
                                        登录中
                                    </Text>
                                    <Text style={{color: '#fff', fontSize: 24, alignItems: 'center'}}>
                                        {this.state.loginDot}
                                    </Text>
                                </View>
                            </View>
                        </Modal>

                    </View>

                </View>
            );
        }

    },

    componentDidMount() {

        //fetch username and password
        var username = null;
        var password = null;
        PreferenceStore.get('username').then((val) => {
            username = val;
            return PreferenceStore.get('password');
        }).then((val) => {
            password = val;
            if (username !== undefined && username !== null && username != ''
                && password !== undefined && password !== null && password != '') {
                //TODO:auto-login
                this.setState({
                    user: {
                        username: username,
                        password: password
                    }
                })

            }
        })


    },
});


export default connect(
    (state) => ({
        auth: state.user.auth,

    })
)(Login);


var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
    },
    modalContainerIOS: {
        justifyContent: 'center',
        padding: 8,
    },
    loader: {
        marginTop: 10,

    },
    modalBackgroundStyle: {
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    logo: {
        width: width / 2,
        height: 170
    },
    heading: {
        fontSize: 30,
        marginTop: 10
    },
    input: {
        width: 240,
        justifyContent: 'center',
        height: 42,
        marginTop: 10,
        padding: 4,
        fontSize: 12,
        borderWidth: 1,
        borderColor: '#48bbec',
        color: '#48bbec',
        borderBottomWidth: 0
    },
    title: {
        fontSize: 38,

    },
    button: {
        marginRight: 10
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },

    error: {
        color: 'red',
        paddingTop: 10,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#222'
    }

});
