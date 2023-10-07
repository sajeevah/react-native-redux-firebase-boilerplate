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
  useDeleteSampleDataMutation,
  useFetchSampleDataQuery,
} from './src/features/sample/sampleSlice';

export default function App() {
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');

  const [addSampleDataMutation, resultAdd] = useAddSampleDataMutation();
  const [deleteSampleDataMutation, resultDelete] =
    useDeleteSampleDataMutation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, isSuccess, isError, error } =
    useFetchSampleDataQuery();

  const handleSubmit = () => {
    console.log('Header:', header);
    console.log('Description:', description);
    addSampleDataMutation({ title: header, description: description });
    console.log('result:', resultAdd);
    setHeader('');
    setDescription('');
  };

  const handleDelete = (id: string) => {
    console.log('id:', id);
    deleteSampleDataMutation(id);
    console.log('result:', resultDelete);
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.item}>{item.title}</Text>
              <View style={{ paddingRight: 20 }}>
                <Button title="Delete" onPress={() => handleDelete(item.id)} />
              </View>
            </View>
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
