import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  collection,
  updateDoc,
  getDocs,
  addDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../../firebase';

export interface sampleData {
  id: string;
  titile: string;
  description: string;
}

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Sample'],
  endpoints: builder => ({
    fetchSampleData: builder.query<sampleData[], void>({
      async queryFn() {
        try {
          const querySnapshot = await getDocs(collection(db, 'sample'));
          let sampleData: sampleData[] = [];
          querySnapshot?.forEach(d => {
            sampleData.push({ id: d.id, ...d.data() } as sampleData);
          });
          return { data: sampleData };
        } catch (error: any) {
          console.error('Sample document fetch ', error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Sample'],
    }),
    updateSampleData: builder.mutation({
      async queryFn({ id, title, description }) {
        try {
          await updateDoc(doc(db, 'sample', id), {
            title,
            description,
          });
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Sample'],
    }),
    addSampleData: builder.mutation({
      async queryFn({ title, description }) {
        try {
          const docRef = await addDoc(collection(db, 'sample'), {
            title,
            description,
          });
          console.log('Sample document written with ID: ', docRef.id);
          return { data: null };
        } catch (error: any) {
          console.error('Error adding sample document: ', error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Sample'],
    }),
  }),
});

export const {
  useFetchSampleDataQuery,
  useAddSampleDataMutation,
  useUpdateSampleDataMutation,
} = firestoreApi;
