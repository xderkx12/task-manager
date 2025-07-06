# TaskManager

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.3.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli) (optional but recommended)

You can install Angular CLI globally with:

```bash
npm install -g @angular/cli
```

# Getting Started

## Clone the repository

```bash
git clone https://github.com/xderkx12/task-manager.git
cd task-manager/task-manager/src
```

## Install dependencies

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

## Docker

To start the project in docker:

```bash
ng build --configuration production
docker build -t my-angular-app .
docker run -d -p 4000:4000 --name my-angular-app my-angular-app
```

Open http://localhost:4000 in browser

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
