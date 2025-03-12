import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Module from './Module';
import LottieAnimation from './LottieAnimation';
import animationData from '../lotties/Animation - 1716053664973.json';
import '../App.css';

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const dropdownRef = useRef(null);

  const addModule = () => {
    const newModule = {
      id: `module-${Date.now()}`,
      name: `New Module`,
      resources: []
    };
    setModules([...modules, newModule]);
    setDropdownOpen(false);
    setShowAnimation(false);
  };

  const renameModule = (id, newName) => {
    setModules(modules.map(m => (m.id === id ? { ...m, name: newName } : m)));
  };

  const deleteModule = (id) => {
    setModules(modules.filter(m => m.id !== id));
  };

  const onDragEnd = result => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === 'MODULE') {
      const reorderedModules = Array.from(modules);
      const [movedModule] = reorderedModules.splice(source.index, 1);
      reorderedModules.splice(destination.index, 0, movedModule);
      setModules(reorderedModules);
    } else {
      const sourceModuleIndex = modules.findIndex(m => m.id === source.droppableId);
      const destinationModuleIndex = modules.findIndex(m => m.id === destination.droppableId);

      const updatedModules = [...modules];

      if (source.droppableId === destination.droppableId) {
        const module = updatedModules[sourceModuleIndex];
        const newResources = Array.from(module.resources);
        const [movedResource] = newResources.splice(source.index, 1);
        newResources.splice(destination.index, 0, movedResource);
        module.resources = newResources;
      } else {
        const sourceModule = updatedModules[sourceModuleIndex];
        const destinationModule = updatedModules[destinationModuleIndex];

        const sourceResources = Array.from(sourceModule.resources);
        const destinationResources = Array.from(destinationModule.resources);

        const [movedResource] = sourceResources.splice(source.index, 1);
        destinationResources.splice(destination.index, 0, movedResource);

        sourceModule.resources = sourceResources;
        destinationModule.resources = destinationResources;
      }

      setModules(updatedModules);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
    setSubmitted(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="App">
      <div className="course-builder-header">
        <h1>Toddle App</h1>
        <div className="add-menu" ref={dropdownRef}>
          <button className="add-button" onClick={() => setDropdownOpen(!dropdownOpen)}>+ Add</button>
          {dropdownOpen && (
            <div className="add-dropdown">
              <button onClick={addModule}>Create module</button>
            </div>
          )}
        </div>
      </div>

      {showAnimation && <LottieAnimation animationData={animationData} />}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-modules" type="MODULE" direction="vertical">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="modules-container">
              {modules.length === 0 && (
                <div className="empty-state">
                  <p>No modules added yet. Click "Add Module" to get started.</p>
                </div>
              )}
              {modules.map((module, index) => (
                <Draggable key={module.id} draggableId={module.id} index={index} isDragDisabled={submitted}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Module
                        module={module}
                        index={index}
                        renameModule={renameModule}
                        deleteModule={deleteModule}
                        setModules={setModules}
                        modules={modules}
                        submitted={submitted}
                        editing={editing} // Pass the editing state
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="button-container">
        {!submitted && (
          <button onClick={handleSubmit}>Submit</button>
        )}
        {submitted && !editing && (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default CourseBuilder;
