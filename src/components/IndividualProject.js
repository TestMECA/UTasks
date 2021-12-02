/* eslint-disable no-debugger */
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { deleteProjectFromFB, getUserProjects } from '../helpers/firestore-api';

export const IndividualProject = ({ project }) => {

  const [showConfirm, setShowConfirm] = useState(false);
  const { setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {

    deleteProjectFromFB(docId).then(() => {
      getUserProjects().then(userProjects => {
        setProjects(userProjects)
        setSelectedProject('INBOX');
        console.log('Successfully loaded the projects!  - ', userProjects);
      }).catch(e => {
        console.log('Failed to load the projects! - ' + e.message);
      });
      console.log("Project deleted successfully , project id:", docId)
    }).catch(e => console.log("Failed to delete the project", e));

  };

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowConfirm(!showConfirm);
        }}
        tabIndex={0}
        role="button"
        aria-label="Confirm deletion of project"
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p >Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
                data-testid="delete"
              >
                Delete
              </button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setShowConfirm(!showConfirm);
                }}
                tabIndex={0}
                role="button"
                aria-label="Cancel adding project, do not delete"
                data-testid="cancel"
              >
                Cancel
              </span>
            </div >
          </div >
        )}
      </span >
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired,
};
