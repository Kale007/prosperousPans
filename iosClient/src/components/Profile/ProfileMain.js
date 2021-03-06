import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  NavigatorIOS
} from 'react-native';

import Profile from './Profile'

class ProfileMain extends Component {
  constructor (props){
    super();
  }
  
  render() {
      return (
        <NavigatorIOS
          initialRoute={{
            component: Profile,
            title:''
          }}
        navigationBarHidden={true}
        style={{width: 375, height: 700}}
         />
      )
    }
}

module.exports = ProfileMain;