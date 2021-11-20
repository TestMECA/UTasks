/* eslint-disable import/no-unused-modules */

export const NODE_ENV = process.env.NODE_ENV;
function assertEnvVar(path) {
    if (NODE_ENV === 'development') {
        console.assert(
            process.env[path],
            `environment variable at path "process.env.%s" is undefined`,
            path
        );
    }
}

assertEnvVar('REACT_APP_TITLE');
assertEnvVar('REACT_APP_BUILD_TARGET');
assertEnvVar('REACT_APP_NAME');
assertEnvVar('REACT_APP_VERSION');
assertEnvVar('REACT_APP_DEFAULT_USER_ID');


export const BUILD_TARGET = process.env.REACT_APP_BUILD_TARGET;
export const BUILD_NAME = process.env.REACT_APP_NAME;
export const APP_VERSION = process.env.REACT_APP_VERSION;


export const DEFAULT_USER_ID = process.env.REACT_APP_DEFAULT_USER_ID

