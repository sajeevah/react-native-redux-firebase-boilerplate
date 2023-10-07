/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  useAddSampleDataMutation,
  useFetchSampleDataQuery,
} from './src/features/sample/sampleSlice';

export default function App() {
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');

  const [setAddSampleDataMutation, result] = useAddSampleDataMutation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, isSuccess, isError, error } =
    useFetchSampleDataQuery();

  const handleSubmit = () => {
    console.log('Header:', header);
    console.log('Description:', description);
    setAddSampleDataMutation({ title: header, description: description });
    console.log('result:', result);
    setHeader('');
    setDescription('');
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
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.title}</Text>
          )}
        />
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
  container: {
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
