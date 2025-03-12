// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseBuilder from './components/CourseBuilder';
import FileUpload from './components/FileUpload';
import LinkResource from './components/LinkResource';
import Module from './components/Module';
import Resource from './components/Resource';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CourseBuilder />} />
          <Route path="/file-upload" element={<FileUpload />} />
          <Route path="/link-resource" element={<LinkResource />} />
          <Route path="/module" element={<Module />} />
          <Route path="/resource" element={<Resource />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
