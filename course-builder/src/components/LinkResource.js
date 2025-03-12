import React, { useState } from 'react';

const LinkResource = ({ onAddLink }) => {
  const [link, setLink] = useState('');
  const [linkName, setLinkName] = useState('');

  const handleAddLink = () => {
    if (link && linkName) {
      onAddLink({
        id: `resource-${Date.now()}`,
        name: linkName,
        url: link
      });
      setLink('');
      setLinkName('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Link Name"
        value={linkName}
        onChange={(e) => setLinkName(e.target.value)}
      />
      <input
        type="url"
        placeholder="URL"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={handleAddLink}>Add Link</button>
    </div>
  );
};

export default LinkResource;
