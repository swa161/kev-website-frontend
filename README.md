# Kevin Wang Personal Website Frontend
## Author: Kevin Wang
This repository contains the frontend application for my personal website. It is build with React and TypeScript, focusing on mobile-first responsive design and maintainable component architecture.


# Setup & Installation
## Local running frontend in dev mode
1. clone the repository
2. install dependencies `npm install`
3. create .env file. Use enviroment variables configured in the dashboard:`https://vercel.com/kevin-wangs-projects-611e61c5/kev-website-frontend/settings/environment-variables`
4. navigate to the root of the project. Run `npm run dev` to run locally in development mode.

# Tech Stack
- Vite + React
- TypeScript
- Material UI
- React-dropzone 
- Zustand (global state management )
- i18next (internationalization)

# Project Structure (Folders)
- `api`: contains `client.ts` which configures the Axios instance and base API URL.
- `assets`: Static assests such as decoration svgs, placeholder image for image upload functionality, and loading page GIF.
- `components`: all reusable & custom components created in this project are stored in this folder.
- `config`: place for configuration,i18next.ts contains configuration for translation between english and chinese.
- `hooks`: all custom react hooks created in this project are stored in this folder.
- `languages`: translation files (en.json and zh.json) used by i18next.
- `pages`: page-level components that are directly connected to application routes.
- `sections`: modular sections used specifically on the homepage.
- `stores`: global state management logic implemented with Zustand.
- `theme`: all resuable theme configuration for MUI components.
- `types`: shared TypeScript type definitions and interfaces.


# Future improvements

- Refactor and clean up the existing codebase to improve readability, maintainability, and file organization.
- Change the overall aesthetics of the website
- Migrate hard-coded content (such as skills and projects) to database for improved scalability and maintainability.
- Add a Chinese version of personal information in the database to support full internationalization (backend enhancement).
- Improve the visual design and overall aesthetics of the profile page.