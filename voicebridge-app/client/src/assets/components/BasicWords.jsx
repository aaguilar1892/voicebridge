import React from 'react';

function Card() {

    return (
        <div className='flash-card text-8xl font-bold flex justify-center items-center w-175 h-150 p-6 shadow-2xl bg-white rounded-xl border-4 border-gray-500 shadow-yellow-600'>
            Front side
        </div>
    );
}

const BasicWords = () => {

    const handleMouseEnter = (utterance) => {
        speechSynthesis.speak(utterance);
    };
 
 
    const handleMouseLeave = () => {
        speechSynthesis.cancel();
    };

    return (
        <div className='pt-25 pl-10 flex flex-col'>
            <div>
                <h1 className='text-3xl font-bold'>Basic Words</h1>
            </div>
            <div className='flex flex-col items-center p-5'>
                <Card></Card>
            </div>
            
        </div>
    );
};
 
 export default BasicWords;