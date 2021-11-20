/* eslint-disable import/no-unused-modules */
import React from 'react';
import { Sidebar } from "./Sidebar"
import logo from '../../logo.svg';
export const Content = () => (
    <section>
        <Sidebar />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            UTasks is a simple <a href="https://todoist.com/">Todoist </a> clone
        </p>
    </section>
);