import React from 'react';

const BasicWords = () => {

    const handleMouseEnter = (utterance) => {
        speechSynthesis.speak(utterance);
    };
 
 
    const handleMouseLeave = () => {
        speechSynthesis.cancel();
    };

    return (
        <div className='p-50'>Test</div>
    );
};
 
 export default BasicWords;