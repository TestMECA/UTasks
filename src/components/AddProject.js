import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addProjectToFB } from '../helpers/firestore-api.js';
import { v4 as uuidv4 } from 'uuid';
import { useProjectsValue } from '../context';

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');

  const projectId = uuidv4();
  const { projects, setProjects } = useProjectsValue();

  const addProject = () => {
    const payload = {
      projectId,
      name: projectName,
    };
    projectName &&
      addProjectToFB(payload)
        .then((docRef) => {
          setProjects([...projects, { ...payload, docId: docRef.id }]);
          setProjectName('');
          setShow(false);
          console.log('Project crated with Id:', docRef.id);
        })
        .catch((e) => console.log('Failed to add a project', e));
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
          >
            Add Project
          </button>
          <span
            aria-label="Cancel adding project"
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShow(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShow(false);
            }}
            role="button"
            tabIndex={0}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      {!show && (
        <span
          aria-label="Add Project"
          data-testid="add-project-action"
          className="add-project__text"
          onClick={() => setShow(!show)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setShow(!show);
          }}
          role="button"
          tabIndex={0}
        >
          Add Project
        </span>
      )}
    </div>
  );
};

AddProject.propTypes = {
  shouldShow: PropTypes.bool,
};
