/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';

import { useTasks } from '../hooks';


export const Tasks = () => {

    const { tasks } = useTasks('1');

    let projectName = '';

    return (
        <div className="tasks" data-testid="tasks">
            <h2 data-testid="project-name">{projectName}</h2>

            <ul className="tasks__list">
                {tasks.map((task) => (
                    <li key={`${task.id}`}>
                        <Checkbox id={task.id} taskDesc={task.task} />
                        <span>{task.task}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
