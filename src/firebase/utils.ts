import firebase, { User } from 'firebase/app';
import config from './config';
import 'firebase/firestore';
import 'firebase/auth';

import IAnimal from '../interfaces/IAnimal';

firebase.initializeApp(config);
const firestore = firebase.firestore();
const auth = firebase.auth();

const handelUser = async (userAuth: User | null, data: any) => {
  if (!userAuth) return false;

  const { uid } = userAuth;
  const user = firestore.doc(`users/${uid}`);
  const snapshot = await user.get();

  if (!snapshot.exists) {
    const { email } = userAuth;
    const { displayName } = data;
    const createdAt = new Date();

    try {
      await user.set({ displayName, email, createdAt, ...data });
    } catch (error) {
      console.log('[!] Error@firebase/utils: ', error);
    }
  }

  return user;
};

export const authState = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged((user: User | null) => callback(user));
};

export const addUser = async (
  displayName: string,
  email: string,
  password: string
) => {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  await handelUser(user, { displayName });
};

export const login = async (email: string, password: string) => {
  await auth.signInWithEmailAndPassword(email, password);
};

export const logout = async () => {
  await auth.signOut();
};

export const getAnimals = async () => {
  const animals = await firestore.collection(`animals`).get();
  if (animals.empty && animals.metadata.fromCache) {
    return 'internet-error';
  }
  return animals.docs.map((res) => {
    const {
      type,
      description,
      marker,
      picture,
      reports,
      created_at,
    } = res.data();
    return {
      id: Number(res.id),
      type,
      description,
      marker: {
        latitude: marker.latitude,
        longitude: marker.longitude,
      },
      picture,
      reports,
      created_at: created_at.toDate(),
    };
  });
};

export const setAnimal = async (animal: IAnimal) => {
  const res = await firestore
    .collection(`animals`)
    .doc(animal.id.toString())
    .set(animal);

  return res;
};

export const deleteAnimal = async (id: number) => {
  const res = await firestore.collection(`animals`).doc(id.toString()).delete();
  return res;
};
