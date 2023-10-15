import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  const handleLogin = () => {
    // Add your login logic here
  };

  const handleGoogleLogin = () => {
    // Add your Google login logic here
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
      />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

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
