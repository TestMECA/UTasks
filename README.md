![GitHub Release Date](https://img.shields.io/github/release-date/TestMECA/UTasks?style=for-the-badge) ![GitHub package.json version](https://img.shields.io/github/package-json/v/TestMECA/UTasks?style=for-the-badge) ![GitHub repo size](https://img.shields.io/github/repo-size/TestMECA/UTasks?style=for-the-badge) ![GitHub last commit](https://img.shields.io/github/last-commit/TestMECA/UTasks?style=for-the-badge) [![GitHub license](https://img.shields.io/github/license/TestMECA/UTasks?style=for-the-badge)](https://github.com/TestMECA/UTasks/blob/main/LICENSE) ![GitHub all releases](https://img.shields.io/github/downloads/TestMECA/UTasks/total?style=for-the-badge) [![GitHub stars](https://img.shields.io/github/stars/TestMECA/UTasks?style=for-the-badge)](https://github.com/TestMECA/UTasks/stargazers) [![GitHub forks](https://img.shields.io/github/forks/TestMECA/UTasks?style=for-the-badge)](https://github.com/MohamedRaslan/pytest-qatouch/network) [![GitHub issues](https://img.shields.io/github/issues/TestMECA/UTasks?style=for-the-badge)](https://github.com/MohamedRaslan/pytest-qatouch/issues)

[![Website Deployed](https://github.com/TestMECA/UTasks/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/TestMECA/UTasks/actions/workflows/firebase-hosting-merge.yml) [![Code Quality](https://github.com/TestMECA/UTasks/actions/workflows/code-quality-pipline.yaml/badge.svg)](https://github.com/TestMECA/UTasks/actions/workflows/code-quality-pipline.yaml) [![codecov](https://codecov.io/gh/TestMECA/UTasks/branch/main/graph/badge.svg?token=3K0C6K2F0U)](https://codecov.io/gh/TestMECA/UTasks)

# UTasks

UTasks is a **[Todoist](https://todoist.com/)** clone, meant for testing purposes, like trying different test automation tools and techniques or just manually test the app instead of relying on some online apps "that may changes over time and make your test automation scripts fails" or "you simply don't have a way to try some advanced test automation techniques, weird scenarios or some test automation best practices"

## Features

- A simple feature-rich website but a bit tricky to work with.
- Simple & easy to set up and run in your local machine or deploy it publicly under 10 mins
- Doesn't require a lot of knowledge to set it up "Just a **[Google Account](https://accounts.google.com/signup/)** and **[Nodejs](https://nodejs.org/en/)**"
- Created using **[Create React App](https://create-react-app.dev/)** as **FrontEnd** and **[FireStore](https://firebase.google.com/docs/firestore)** as **BackEnd**

## Usage

There are already a public website for this application you can use them or you can make your own one "locally or publicly"

#### Use a deployed version

- **[Utasks Main](https://utasks-main.web.app/)**
- **[Utasks Stage](https://utasks-stage.web.app/)**
- **[Utasks Develop](https://utasks-develop.web.app/)**

> :warning: **Warning**
>
> - **If you are using the public websites**: your data may get removed from time to time "every 2 to 3 months"
> - Each website has its own separate environment, so signup in the [Utasks Develop](https://utasks-develop.web.app/) website doesn't make you able to login to the [Utasks Main](https://utasks-main.web.app/) website.

#### Setup your own app

To setup you own, check out the **[Prerequisites](#Prerequisites)**,and the **[Setup](#Setup)**

## Prerequisites

- **[Git](https://git-scm.com/)**
- **[Nodejs](https://nodejs.org/en/)** **`Version 14`**
  - Preferred to install the nodejs using a Node Version Manager:
    - For **Windows** users, you can use **[NVM for Windows](https://github.com/coreybutler/nvm-windows)**
    - For **Linux or MacOS** users, you can use **[NVM](https://github.com/nvm-sh/nvm)**
- **[Google Account](https://accounts.google.com/signup/)** to able to create a **[Firebase](https://firebase.google.com/)** project

## Setup

> **_NOTE:_** You can watch this 10 mins video **[Setup Utasks](https://www.youtube.com/)** for the full setup.

- Get the source code in your machine (Using one of the following options):

  - Clone the repo **`git clone https://github.com/TestMECA/UTasks.git`**
  - Download the **`buggy`** branch or check out to it **`git checkout buggy`**
  - Downland the **[Utasks Buggy V0.3.0](https://github.com/TestMECA/UTasks/releases/tag/V0.3.0)**
  - (The best option) Fork the repo and clone your fork **`git clone https://github.com/<your-github-username>/UTasks.git`** then check out to the **`buggy`** branch by running **`git checkout buggy`**

- Change the name of the file **[.env.example](https://github.com/TestMECA/UTasks/blob/main/.env.example)** to `.env`
- Install **[yarn](https://yarnpkg.com/)** to install all the needed dependencies **`npm install --global yarn`**
- Install the needed dependencies **`yarn install`**
- Create a Firebase project from the **[Firebase Console](https://console.firebase.google.com/)**
- Run **`yarn firebase login`** to login from the CLI to your **[Firebase Console](https://console.firebase.google.com/)** using the **[Firebase CLI](https://firebase.google.com/docs/cli)**
- Run **`firebase use <firebase-project-name> && firebase apps:sdkconfig web --json > ./src/utasks-configuration.json`** with **`<firebase-project-name>`** is your **Project Name** you created in **[Firebase Console](https://console.firebase.google.com/)**

  - Make sure a valid json file gets created in `src/utasks-configuration.json` if it wasn't valid or add the configuration manually from the **Project Name** you created in **[Firebase Console](https://console.firebase.google.com/)**

- Setup the Firestore rules by running the following command **`yarn firebase deploy --only firestore:rules`**

#### Local setup

- Run the app locally by running the **`yarn react-scripts start`** and it will be open in **[Localhost:5050](http://localhost:5050)**

#### (Optional) Make it online

If you want to make your own app a public website, just run **`yarn yarn firebase deploy --only hosting:<firebase-project-name>`** with **`<firebase-project-name>`** is your **Project Name** you created in **[Firebase Console](https://console.firebase.google.com/)**, and share the website url with your friends.

## Issues

If you encounter any problems, please **[file an issue](https://github.com/TestMECA/UTasks/issues)** along with a detailed description.

## Contributing

Contributions are very welcome <3.

## Credits & Resources

- **[Todoist Clone <3](https://www.youtube.com/watch?v=hT3j87FMR6M)** by **[Karl Hadwen](https://www.youtube.com/c/cognitivesurge)**
- **[React Authentication Crash Course With Firebase And Routing <3 ](https://youtu.be/PKwu15ldZ7k)** by **[Web Dev Simplified (YouTube Channel)](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw)**
- **[Firebase Documentation](https://firebase.google.com/docs)**
- **[Firebase 9 Tutorial <3](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb)** by **[The Net Ninja (YouTube Channel)](https://www.youtube.com/c/TheNetNinja)**
- **[ReactJS Tutorial for Beginners <3 ](https://www.youtube.com/playlist?list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3)** by **[Codevolution (YouTube Channel)](https://www.youtube.com/c/Codevolution)**
- **[GitHub Actions Documentation](https://docs.github.com/en/actions)**
