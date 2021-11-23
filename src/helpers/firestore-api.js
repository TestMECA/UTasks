/* eslint-disable import/no-unused-modules */

import { db, auth } from '../firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';



export const getUserProjects = async () => {
    const userProjectsQuery = await query(collection(db, "projects"), where("userId", "==", auth.currentUser.uid));
    console.log(auth.currentUser.uid)

    const projectsSnapshot = await getDocs(userProjectsQuery);
    return projectsSnapshot.docs.map(project => ({
        ...project.data(),
        docId: project.id,
    }));
}

export const addProjectToFB = async (payload) => {
    return await addDoc(collection(db, "projects"), payload)
}


export const addTaskOnFB = async (payload) => {
    return await addDoc(collection(db, "tasks"), payload)
}

export const updateTaskData = async (id, newData) => {
    return await updateDoc(collection(db, "tasks", id), newData)
}

export const deleteProjectFromFB = async (id) => {
    return await deleteDoc(collection(db, "tasks", id));
}








/*
export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
      console.log("IN useTasks", tasks, archivedTasks)

      let unsubscribe = firebase
          .firestore()
          .collection('tasks')
          .where('userId', '==', firebase.auth().currentUser.uid);

      unsubscribe =
          selectedProject && !collatedTasksExist(selectedProject)
              ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
              : selectedProject === 'TODAY'
                  ? (unsubscribe = unsubscribe.where(
                      'date',
                      '==',
                      moment().format('DD/MM/YYYY')
                  ))
                  : selectedProject === 'INBOX' || selectedProject === 0
                      ? (unsubscribe = unsubscribe.where('date', '==', ''))
                      : unsubscribe;

      unsubscribe = unsubscribe.onSnapshot(snapshot => {
          const newTasks = snapshot.docs.map(task => ({
              id: task.id,
              ...task.data(),
          }));

          setTasks(
              selectedProject === 'NEXT_7'
                  ? newTasks.filter(
                      task =>
                          moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                          task.archived !== true
                  )
                  : newTasks.filter(task => task.archived !== true)
          );
          setArchivedTasks(newTasks.filter(task => task.archived !== false));
      });

      return () => unsubscribe();

  }, [selectedProject]);

return { tasks, archivedTasks };
};
*/