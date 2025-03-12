import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Resource = ({ resource = {}, index, submitted, editing, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [newResourceName, setNewResourceName] = useState(resource.name || '');

  const saveResourceName = () => {
    if (newResourceName.trim() !== '' && newResourceName !== resource.name) {
      const updatedResource = { ...resource, name: newResourceName };
      // Here you would typically update the resource in your state or data store
      console.log('Updated resource:', updatedResource);
    }
    setEditMode(false);
  };

  const handleDelete = () => {
    onDelete(resource.id); // Call the onDelete function passed from the parent
  };

  return (
    <Draggable draggableId={resource.id || 'unknown'} index={index} isDragDisabled={submitted && !editing}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="resource">
          {editMode ? (
            <div>
              <input
                type="text"
                value={newResourceName}
                onChange={(e) => setNewResourceName(e.target.value)}
                disabled={submitted && !editing}
              />
              {(editing || !submitted) && <button onClick={saveResourceName}>Save</button>}
            </div>
          ) : (
            <div>
              <p>
                {resource.name || 'Unknown Name'}
                {resource.url && (
                  <>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer"> (Link)</a>
                  </>
                )}
                {resource.content && (
                  <>
                    <a href={resource.content} download={resource.name}> (Download)</a>
                  </>
                )}
                {/* Display the delete button only when editing or not submitted */}
                {(editing || !submitted) && (
                  <>
                    <button onClick={() => setEditMode(true)}>Rename</button>
                    <button onClick={handleDelete}>Delete</button> 
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Resource;