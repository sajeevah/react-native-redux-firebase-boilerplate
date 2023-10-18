import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
// import { useAppDispatch } from '../app/hooks';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
  // const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Add your login logic here
    console.log('input email : ', email);
    console.log('input password : ', password);
    await signInWithEmailAndPassword(auth, email, password);
    navigation.navigate('Home');
  };

  const handleGoogleLogin = () => {
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Login" onPress={handleLogin} />
      <View style={styles.buttonSpacing} />
      <Button title="Google Login" onPress={handleGoogleLogin} />
      <View style={styles.buttonSpacing} />
      <Button title="Register" onPress={handleRegister} />
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
