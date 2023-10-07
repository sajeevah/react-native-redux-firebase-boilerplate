/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useAddSampleDataMutation } from './src/features/sample/sampleSlice';

export default function App() {
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');

  const [setAddSampleDataMutation, result] = useAddSampleDataMutation();

  const handleSubmit = () => {
    console.log('Header:', header);
    console.log('Description:', description);
    setAddSampleDataMutation({ title: header, description: description });
    console.log('result:', result);
  };

  return (
    <SafeAreaView>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.textBox}
          placeholder="Header"
          onChangeText={setHeader}
          value={header}
        />
        <TextInput
          style={styles.textBox}
          placeholder="Description"
          multiline
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});
