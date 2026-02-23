# Pixmart Client

This directory contains the React front-end for the Pixmart application.

## Overview

The client is built using React and Vite, styled with Tailwind CSS. It serves as the user interface for buyers and sellers to interact with the system.

## Getting Started

### Prerequisites
- Node.js (version 14 or later)
- npm or yarn

### Installation
```bash
cd client
npm install
# or yarn install
```

### Development
```bash
npm run dev
# or yarn dev
```
This will start the Vite development server at `http://localhost:5173` (default).

### Build
```bash
npm run build
```
Produces optimized static assets in the `dist` folder.

### Available Scripts
- `dev`: start development server
- `build`: create production build
- `preview`: locally preview the production build

## Project Structure
- `src/`: application source code
  - `components/`: reusable UI components
  - `pages/`: route-specific pages
  - `hooks/`: custom React hooks
  - `store/`: Redux state management
- `public/`: static assets

## Tailwind Configuration
Tailwind is configured in `tailwind.config.js` and integrated via PostCSS.

## Notes
- Ensure the server API is running on the expected port (default `http://localhost:5000`).
- Authentication is handled via JWT stored in Redux state.

## License
MIT