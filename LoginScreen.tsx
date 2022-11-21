import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import realm, {User} from '../../realm/realm';
import { BGImage } from '../../assets/svg';

const Login = () => {
  const realmDb = realm.useRealm();
  const navigation = useNavigation();
  const users = realmDb.objects(User);

  const [user, setUser] = useState('');

  const forNewUser = (isExists: boolean) => {
    if (isExists) {
      realmDb.write(() => {
        realmDb.create('User', User.generate(user));
        console.warn('New user recorded')
      });
      users.map(item => {
        if (item.userName === user.toLowerCase()) {
          const temp = item.user_id.toHexString();
          navigation.navigate('ToDo', {user_id: temp});
        }
      });
      setUser('');
    }
  };

  const onLogin = async () => {
    if (user.length > 0) {
      let isNewUser = true;

      users.map(item => {
        if (item.userName === user.toLowerCase()) {
          isNewUser = false;
          realmDb.write(() => {
            item.lastLogin = new Date();
          });
          setUser('');
          const temp = item.user_id.toHexString();
          navigation.navigate('ToDo', {user_id: temp});
        }
      });
      forNewUser(isNewUser);
    } else {
      Alert.alert('Enter Username');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter UserName"
        value={user}
        onChangeText={value => setUser(value)}
        style={styles.TextInput}
      />
      {/* <TextInput 
        placeholder='Enter Password'
        keyboardType='number-pad'
        secureTextEntry = {true}
        style={styles.TextInput}
      /> */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => onLogin()}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <BGImage width = {360} height = {600} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1,
    padding: 17,
    paddingTop: 35,
    backgroundColor: 'powderblue'
  },
  TextInput: {
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: '#3d73dd',
    padding: 10,
    marginTop: 34,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
});