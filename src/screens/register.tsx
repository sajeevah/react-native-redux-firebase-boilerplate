import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import reactAuth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  GoogleSignin.configure({
    /**
     * the webClientId, which can be found in the android/app/google-services.json
     * file as the client/oauth_client/client_id property (the id ends with .apps.googleusercontent.com).
     * Make sure to pick the client_id with client_type: 3
     */
    webClientId: '',
  });

  const handleRegister = async () => {
    // Add your registration logic here
    console.log(`Email: ${email}, Password: ${password}`);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.log(`error login: ${error}`);
    }
  };

  const handleGoogleLogin = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = reactAuth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userSignIn = reactAuth().signInWithCredential(googleCredential);

    userSignIn
      .then(user => {
        console.log('google user : ', user);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log('google user : ', error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      <View style={styles.buttonSpacing} />
      <Button title="Google Login" onPress={handleGoogleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonSpacing: {
    marginBottom: 8,
  },
});
