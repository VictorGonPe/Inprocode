# Inprocode

![Preview](src/assets/img/preview-inprocode.png "Inprocode")

## Project Description

**Inprocode** is a full-stack web application consisting of a frontend built with Angular using Standalone Components, modular SCSS, and Bootstrap, and a backend developed with Node.js, Express, and MongoDB.

The application allows you to manage stores, including their name, address, location, description, and image. It also integrates advanced features such as an interactive calendar (using FullCalendar) and a dynamic map (using Mapbox GL JS) that displays and filters the created stores.

This project follows a **modular architecture** to maintain scalable and clean code.

## Technologies and Tools Used

### Frontend

- **Angular 20 with Standalone Components**
- **SCSS (modular styling)**
- **Bootstrap**
- **Mapbox GL JS**
- **FullCalendar**
- **Karma & Jasmine for unit testing**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB (local or via MongoDB Atlas)**
- **Mongoose**

## Requirements

- **Modern browser**: Chrome, Firefox, Safari, Edge.
- **Code editor**: VS Code recommended or Similar.
- **Node.js**: Version 18.x or higher
- **MongoDB**: Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Developer Prerequisites

To run or contribute to this project, you should have:

- Familiarity with **Angular**, including routing, services, signals, and SCSS.
- Knowledge of **Node.js**, REST APIs, and database handling with MongoDB.

> ⚠️ You must configure your own environment files for third-party integrations:
>
> - `environment.ts` for Angular: provide your **Mapbox** key.
> - `.env` for Node.js backend: set your MongoDB URI and server port.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/VictorGonPe/inprocode.git
cd inprocode
```

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Configure environment variables

#### Backend (`backend/.env`)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/inprocode
```

> You can replace this with your [MongoDB Atlas URI](https://www.mongodb.com/cloud/atlas).

#### Frontend (`frontend/src/environments/environment.ts`)
```ts
export const environment = {
  production: false,
  mapbox: {
    accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN'
  },
  calendar: {
    apiKey: 'YOUR_FULLCALENDAR_API_KEY'
  }
};
```

### 4. Run the applications

#### Start backend (API)
```bash
cd backend
node server.js
```

#### Start frontend (Angular)
```bash
cd ../frontend
npx ng serve -o
```

