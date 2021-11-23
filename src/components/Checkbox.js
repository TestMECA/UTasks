import React from 'react';
import PropTypes from 'prop-types';
import { updateTaskData } from '../helpers/firestore-api';

export const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = () => {
    updateTaskData(id, {
      archived: true,
    }).then(docRef => {
      console.log("Task updated successfully , task id:", docRef.id)
    }).catch(e => console.log("Failed to update the task", e));
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') archiveTask();
      }}
      aria-label={`Mark ${taskDesc} as done?`}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox" />
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired,
};
