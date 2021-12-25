import React, { useState } from 'react';
import { FaLightbulb, FaRegLightbulb, FaSignOutAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { AddTask } from '../AddTask';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../config/constants.js';
import { Link } from 'react-router-dom';

export const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      // eslint-disable-next-line no-restricted-globals
      history.push('/login');
    } catch {
      console.log('Failed to log out');
    }
  }

  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          {!darkMode ? (
            <Link to={ROUTES.DASHBOARD} data-testid="logo">
              <img src="/images/logo.svg" alt="UTasks" />
            </Link>
          ) : (
            <p> Deez Nuts!!👀 </p>
          )}
        </div>
        <div className="settings">
          <ul>
            {!darkMode ? (
              <li className="settings__add">
                <button
                  data-testid="quick-add-task-action"
                  aria-label="Quick add task"
                  type="button"
                  onClick={() => {
                    setShowQuickAddTask(true);
                    setShouldShowMain(true);
                  }}
                >
                  +
                </button>
              </li>
            ) : (
              <li className="settings__add">
                <button
                  data-testid="quick-add-task-action"
                  aria-label="Quick add task"
                  type="button"
                  onClick={() => {
                    setShowQuickAddTask(true);
                    setShouldShowMain(true);
                  }}
                >
                  🐧
                </button>
              </li>
            )}
            <li className="settings__darkmode">
              <button
                data-testid="dark-mode-action"
                aria-label="Darkmode on/off"
                type="button"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <FaLightbulb /> : <FaRegLightbulb />}
              </button>
            </li>
            <li className="settings__logout">
              <button
                data-testid="log-out-action"
                aria-label="Log out"
                type="button"
                onClick={handleLogout}
              >
                {!darkMode && <FaSignOutAlt />}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {!darkMode && (
        <AddTask
          showAddTaskMain={false}
          shouldShowMain={shouldShowMain}
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      )}
    </header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
