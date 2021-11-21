import React from 'react';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa'


export const Header = ({ darkMode, setDarkMode }) => {
    const x = 1;
    return (
        <header className="header" data-testid="header">
            <nav>
                <div className="logo">
                    <img src="/images/logo.svg" alt="UTasks" />
                </div>
                <div className="settings">
                    <ul>
                        <li className="settings__add">
                            <button
                                data-testid="quick-add-task-action"
                                aria-label="Quick add task"
                                type="button"
                                onClick={() => {

                                }}
                            > +
                            </button>
                        </li>

                        <li className="settings__darkmode">
                            <button
                                data-testid="dark-mode-action"
                                aria-label="Darkmode on/off"
                                type="button"
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                {darkMode ? (<FaLightbulb />) : (<FaRegLightbulb />)}
                            </button>
                        </li>
                    </ul>
                </div>

            </nav>

            <p> UTasks {x}</p>

        </header>

    )


}