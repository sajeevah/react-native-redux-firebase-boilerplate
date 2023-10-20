/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import reactAuth from '@react-native-firebase/auth';
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
} from '../features/sample/sampleSlice';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { User, removeUser, setUser } from '../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export default function Home({ navigation }) {
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const dispatch = useAppDispatch();

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

  const handleLogoutClick = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const authUser: User = {
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
          emailVerified: user.emailVerified,
        };
        console.log('authUser : ', authUser);
        dispatch(setUser(authUser));
      } else {
        console.log('removeUser');
        dispatch(removeUser());
        navigation.navigate('Login');
      }
    });
  }, [dispatch, navigation]);

  useEffect(() => {
    reactAuth().onAuthStateChanged(user => {
      if (user) {
        const authUser: User = {
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
          emailVerified: user.emailVerified,
        };
        console.log('authUser : ', authUser);
        dispatch(setUser(authUser));
      } else {
        console.log('removeUser');
        dispatch(removeUser());
        navigation.navigate('Login');
      }
    });
  }, [dispatch, navigation]);

  return (
    <SafeAreaView>
      {isAuthenticated && (
        <>
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
                    <Button
                      title="Delete"
                      onPress={() => handleDelete(item.id)}
                    />
                  </View>
                </View>
              )}
            />
          </View>
          <View>
            <Button title="Logout" onPress={handleLogoutClick} />
          </View>
        </>
      )}
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
