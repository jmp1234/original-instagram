import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import {f, auth, database} from './config/config.js';
// import { Facebook } from 'expo';
import * as Expo from 'expo';
// import * as Facebook from 'expo-facebook'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      pass: '',
      email: '',
      emailloginView: false

    };
    // this.registerUser('testemail@yahoo.com', 'fakepassword');

    // auth.signOut().then(() => {
    //   console.log('logged out...')
    // }).catch(error => {
    //   console.log('error: ', error)
    // })

    var that = this;
    f.auth().onAuthStateChanged(function(user) {
      if(user) {
        //logged in
        that.setState({
          loggedin: true
        })
        console.log('logged in', user);
      } else {
        //logged out
        that.setState({
          loggedin: false
        })
        console.log('logged out')
      }
    })
  }

  //allow user to login
  loginUser = async(email, pass) => {
    if(email != '' && pass != '') {
      //
      try {
        let user = await auth.signInWithEmailAndPassword(email, pass);
        console.log(user);
      } catch(error) {
        console.log(error)
      }
    } else {
      //if they are empty:
      alert('missing email or password')
    }
  }

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '355369335051815',
      { permissions: ['email', 'public_profile']}
    );
    if(type === 'success') {
      console.log('success!')
      const credentials = f.auth.FacebookAuthProvider.credential(token); //send the credentials to firebase
      f.auth().signInWithCredential(credentials).catch(error => {
        console.log('error...', error);
      })
    }
  }

  registerUser = (email, password) => {
    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password)
    .then((userObj) => console.log(email, password, userObj))
    .catch((error) => console.log('error logging in ',error))
  }

  signUserOut = () => {
    auth.signOut().then(() => {
      console.log('logged out...')
    }).catch(error => {
      console.log('error: ', error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>--------------</Text>
        {this.state.loggedin == true ? (
          <View>
            <TouchableHighlight
              onPress={() => this.signUserOut() }
              style={{backgroundColor: 'red'}}>
              <Text>Log Out</Text>
            </TouchableHighlight>
            <Text>Logged in...</Text>
          </View>

        ) : (
          <View>

            { this.state.emailloginView == true ? (
              <View>
                <Text>Email:</Text>
                <TextInput
                  onChangeText={(text) => this.setState({email: text})}
                  value={this.state.email}
                />
                <Text>Password:</Text>
                <TextInput
                  onChangeText={(text) => this.setState({pass: text})}
                  secureTextEntry={true}
                  value={this.state.pass}
                />

                <TouchableHighlight
                  onPress={() => this.loginUser(this.state.email, this.state.pass) }
                  style={{backgroundColor: 'red'}}>
                  <Text>Login</Text>
                </TouchableHighlight>
              </View>
            ) : (
              <View></View>
            )}

            <TouchableHighlight
              onPress={() => this.setState({emailloginView: true})}
              style={{backgroundColor: 'green'}}>
              <Text style={{color: 'white'}}>Login With Email</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => this.loginWithFacebook()}
              style={{backgroundColor: 'green'}}>
              <Text style={{color: 'white'}}>Login With Facebook!</Text>
            </TouchableHighlight>

          </View>

      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
