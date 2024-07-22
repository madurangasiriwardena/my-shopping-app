// src/index.js or src/index.tsx

import React from 'react';
import './css/index.css';
import { createRoot } from 'react-dom/client';
import AppWrapper from "./App";

const container = document.getElementById('root')!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<AppWrapper />);