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


export const BUILD_TARGET = process.env.REACT_APP_BUILD_TARGET;
export const BUILD_NAME = process.env.REACT_APP_NAME;
export const APP_VERSION = process.env.REACT_APP_VERSION;


assertEnvVar('REACT_APP_FIREBASE_API_KEY');
assertEnvVar('REACT_APP_FIREBASE_AUTH_DOMAIN');
assertEnvVar('REACT_APP_FIREBASE_DATABASE_URL');
assertEnvVar('REACT_APP_FIREBASE_PROJECT_ID');
assertEnvVar('REACT_APP_FIREBASE_STORAGE_BUCKET');
assertEnvVar('REACT_APP_FIREBASE_MESSAGING_SENDER_ID');
assertEnvVar('REACT_APP_FIREBASE_APP_ID');
assertEnvVar('REACT_APP_FIREBASE_MEASUREMENT_ID');


export const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
export const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
export const FIREBASE_DATABASE_URL = process.env.REACT_APP_FIREBASE_DATABASE_URL
export const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID
export const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
export const FIREBASE_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
export const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID
export const FIREBASE_MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID


export const ROUTES = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    HOME: '/home',
};
