import React from 'react';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa'


export const Header = () => {
    const x = 1;
    return (
        <header className="header" data-testid="header">
            <nav>
                <div className="logo">
                    <img src="/images/logo.png" alt="UTasks" />
                </div>
                <div className="settings">
                    <ul>
                        <li>+</li>
                        <li>
                            <FaLightbulb />
                            <FaRegLightbulb />
                        </li>
                    </ul>
                </div>

            </nav>
            <p> UTasks {x}</p>

        </header>




    )


}