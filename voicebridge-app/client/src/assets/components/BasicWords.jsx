import React from 'react';

function Card(props) {

    const [text, setText] = React.useState(props.frontSide);
    const [isFlipped, setIsFlipped] = React.useState(false);

    function handleClick() {
        if (!isFlipped) {
            setText(props.backSide);
            setIsFlipped(true);
        }
        else {
            setText(props.frontSide);
            setIsFlipped(false);
        }
    };

    return (
        <div className='flash-card text-8xl font-bold flex justify-center items-center w-175 h-150 p-6 shadow-2xl bg-white rounded-xl border-4 border-gray-500 shadow-yellow-600'
         onClick={handleClick}
        >
            {text}
        </div>
    );
};

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
                <Card frontSide="Hello" backSide="..."></Card>
                <Card frontSide="Goodbye" backSide="..."></Card>
                <Card frontSide="Please" backSide="..."></Card>
                <Card frontSide="Thanks" backSide="..."></Card>
                <Card frontSide="Sorry" backSide="..."></Card>
                <Card frontSide="Yes" backSide="..."></Card>
                <Card frontSide="No" backSide="..."></Card>
                <Card frontSide="Okay" backSide="..."></Card>
                <Card frontSide="Father" backSide="..."></Card>
                <Card frontSide="Mother" backSide="..."></Card>
                <Card frontSide="I love you" backSide="..."></Card>
                <Card frontSide="Excuse me" backSide="..."></Card>
            </div>
        </div>
    );
};
 
 export default BasicWords;