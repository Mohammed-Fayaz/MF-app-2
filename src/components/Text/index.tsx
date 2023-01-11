import React from 'react';

const Text: React.FC<{ prop?: string }> = ({ prop }) => {
    return <div>Text - {prop}</div>;
};

export default React.memo(Text);
