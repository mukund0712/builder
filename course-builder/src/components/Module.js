import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Resource from './Resource';
import FileUpload from './FileUpload';
import LinkResource from './LinkResource';

const Module = ({ module, renameModule, deleteModule, setModules, modules, submitted, editing }) => {
  const [editMode, setEditMode] = useState(false);
  const [newModuleName, setNewModuleName] = useState(module.name);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showLinkResource, setShowLinkResource] = useState(false);

  const addResource = (resource) => {
    const updatedModule = { ...module, resources: [...module.resources, resource] };
    setModules(modules.map(m => (m.id === module.id ? updatedModule : m)));
    setShowFileUpload(false);
    setShowLinkResource(false);
  };

  const saveModuleName = () => {
    renameModule(module.id, newModuleName);
    setEditMode(false);
  };

  const handleDeleteResource = (resourceId) => {
    const updatedModule = { ...module, resources: module.resources.filter(resource => resource.id !== resourceId) };
    setModules(modules.map(m => (m.id === module.id ? updatedModule : m)));
  };

  return (
    <div className="module">
      {/* Module name editing */}
      {editMode ? (
        <div>
          <input
            type="text"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
            disabled={submitted && !editing}
          />
          {!submitted && !editing && <button onClick={saveModuleName}>Save</button>}
        </div>
      ) : (
        <h2>
          {module.name}
          {(editing || !submitted) && (
            <>
              <button onClick={() => setEditMode(true)}>Rename</button>
              <button onClick={() => deleteModule(module.id)}>Delete</button>
              <button onClick={() => setShowFileUpload(true)}>Add File</button>
              <button onClick={() => setShowLinkResource(true)}>Add Link</button>
            </>
          )}
        </h2>
      )}

      {/* Resource components */}
      {showFileUpload && (editing || !submitted) && <FileUpload onUpload={addResource} />}
      {showLinkResource && (editing || !submitted) && <LinkResource onAddLink={addResource} />}
      <Droppable droppableId={module.id} type="RESOURCE">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="resources">
            {module.resources.length === 0 && <div className="empty-message">Drag items here</div>}
            {module.resources.map((resource, index) => (
              <Resource
                key={resource.id}
                resource={resource}
                index={index}
                submitted={submitted}
                editing={editing}
                onDelete={() => handleDeleteResource(resource.id)} // Pass delete handler
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Module;
