/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unused-modules */
import { useState, useEffect } from 'react';

import { getUserProjects, getProjectTasks } from '../helpers/firestore-api'
import moment from 'moment';

//import { DEFAULT_USER_ID } from "../config/constants"

export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {

        getProjectTasks(selectedProject).then(newTasks => {
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
            console.log(`Getting that tasks for project ${selectedProject} successfully , project`)

        }).catch(e => console.log("Failed to get the project tasks", e));

    }, [selectedProject]);

    return { tasks, archivedTasks };
};

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getUserProjects().then(userProjects => {
            setProjects(userProjects)
            console.log('Successfully loaded the projects!  - ', userProjects);
        }).catch(e => {
            console.log('Failed to load the projects! - ' + e.message);
        });
    }, []);

    return { projects, setProjects };
};
