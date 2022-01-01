/* eslint-disable import/no-unused-modules */

import { db, auth } from '../firebase';
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore/lite';
import { collatedTasksExist } from '.';
import moment from 'moment';

export const getUserProjects = async () => {
  const projectsSnapshot = await getDocs(
    collection(db, 'users', auth.currentUser.uid, 'projects')
  );
  return projectsSnapshot.docs.map((project) => ({
    ...project.data(),
    docId: project.id,
  }));
};

export const addProjectToFB = async (payload) => {
  return await addDoc(
    collection(db, 'users', auth.currentUser.uid, 'projects'),
    payload
  );
};

export const addUserToFB = async (userId, payload) => {
  return await setDoc(doc(db, 'users', userId), payload);
};

export const updateUserData = async (newData) => {
  return await updateDoc(doc(db, 'users', auth.currentUser.uid), newData);
};

export const getUserData = async () => {
  const userDocRef = doc(db, 'users', auth.currentUser.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    console.log('Document data:', userDocSnap.data());
    return userDocSnap.data();
  } else {
    console.log('No such document!');
  }
};

export const addTaskOnFB = async (payload) => {
  return await addDoc(
    collection(db, 'users', auth.currentUser.uid, 'tasks'),
    payload
  );
};

export const updateTaskData = async (id, newData) => {
  return await updateDoc(
    doc(db, 'users', auth.currentUser.uid, 'tasks', id),
    newData
  );
};

export const deleteProjectFromFB = async (id) => {
  return await deleteDoc(
    doc(db, 'users', auth.currentUser.uid, 'projects', id)
  );
};

export const getProjectTasks = async (selectedProject) => {
  let tasksQuery;

  tasksQuery =
    selectedProject && !collatedTasksExist(selectedProject)
      ? (tasksQuery = query(
          collection(db, 'users', auth.currentUser.uid, 'tasks'),
          where('projectId', '==', selectedProject)
        ))
      : selectedProject === 'TODAY'
      ? (tasksQuery = query(
          collection(db, 'users', auth.currentUser.uid, 'tasks'),
          where('date', '==', moment().format('DD/MM/YYYY'))
        ))
      : selectedProject === 'INBOX' || selectedProject === 0
      ? (tasksQuery = query(
          collection(db, 'users', auth.currentUser.uid, 'tasks'),
          where('date', '==', '')
        ))
      : collection(db, 'users', auth.currentUser.uid, 'tasks');

  const tasksSnapshot = await getDocs(tasksQuery);
  return tasksSnapshot.docs.map((task) => ({
    id: task.id,
    ...task.data(),
  }));
};
