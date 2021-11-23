/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unused-modules */
import { useState, useEffect } from 'react';
//import moment from 'moment';
//import { collatedTasksExist } from '../helpers';

import { getUserProjects } from '../helpers/firestore-api'


//import { DEFAULT_USER_ID } from "../config/constants"

export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        /*
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

        return () => unsubscribe()
        */
    }, [selectedProject]);

    return { tasks, archivedTasks };
};

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        console.log("IN useProjects", getUserProjects())
        console.log("IN useProjects", projects)

        getUserProjects().then(userProjects => {
            setProjects(userProjects)
            console.log('Successfully loaded the projects!  - ', userProjects);
        }).catch(e => {
            console.log('Failed to load the projects! - ' + e.message);
        });

    }, []);

    return { projects, setProjects };
};
