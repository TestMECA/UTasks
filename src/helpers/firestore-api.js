/* eslint-disable import/no-unused-modules */

import { db, auth } from '../firebase';
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore/lite';
import { collatedTasksExist } from '.';
import moment from 'moment';

export const getUserProjects = async () => {
  const userProjectsQuery = await query(
    collection(db, 'projects'),
    where('userId', '==', auth.currentUser.uid)
  );

  const projectsSnapshot = await getDocs(userProjectsQuery);
  return projectsSnapshot.docs.map((project) => ({
    ...project.data(),
    docId: project.id,
  }));
};

export const addProjectToFB = async (payload) => {
  return await addDoc(collection(db, 'projects'), payload);
};

export const addTaskOnFB = async (payload) => {
  return await addDoc(collection(db, 'tasks'), payload);
};

export const updateTaskData = async (id, newData) => {
  return await updateDoc(doc(db, 'tasks', id), newData);
};

export const deleteProjectFromFB = async (id) => {
  return await deleteDoc(doc(db, 'projects', id));
};

export const getProjectTasks = async (selectedProject) => {
  let tasksQuery;

  tasksQuery =
    selectedProject && !collatedTasksExist(selectedProject)
      ? (tasksQuery = query(
          collection(db, 'tasks'),
          where('userId', '==', auth.currentUser.uid),
          where('projectId', '==', selectedProject)
        ))
      : selectedProject === 'TODAY'
      ? (tasksQuery = query(
          collection(db, 'tasks'),
          where('userId', '==', auth.currentUser.uid),
          where('date', '==', moment().format('DD/MM/YYYY'))
        ))
      : selectedProject === 'INBOX' || selectedProject === 0
      ? (tasksQuery = query(
          collection(db, 'tasks'),
          where('userId', '==', auth.currentUser.uid),
          where('date', '==', '')
        ))
      : query(
          collection(db, 'tasks'),
          where('userId', '==', auth.currentUser.uid)
        );

  const tasksSnapshot = await getDocs(tasksQuery);
  return tasksSnapshot.docs.map((task) => ({
    id: task.id,
    ...task.data(),
  }));
};
