import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { auth } from '../firebase';
import {useDispatch} from 'react-redux';
import {setEmail} from '../EmailReducer';

const Signup = ({navigation}) => {

  const [name, setName] = useState('');
  const [email, setEmaill] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      dispatch(setEmail(user.email));
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title} className="text-black">
          Sign Up
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={name}
              onChangeText={setName}
              className="text-black"
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#666"
              autoComplete="off"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              value={email}
              onChangeText={setEmaill}
              className="text-black"
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#666"
              autoComplete="off"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              className="text-black"
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#666"
              autoComplete="off"
              secureTextEntry
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              className="text-black"
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#666"
              autoComplete="off"
              secureTextEntry
            />
          </View>
          <TouchableOpacity
          onPress={handleSubmit} style={styles.button} className="bg-blue-600">
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text
              style={styles.loginButtonText}
              className="text-blue-600 font-semibold">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  box: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  googleButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  googleButtonText: {
    marginLeft: 10,
    color: '#333',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
  },
  loginButtonText: {
    marginLeft: 5,
    fontSize: 15,
  },
});

export default Signup;
