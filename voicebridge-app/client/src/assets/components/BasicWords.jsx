import React from 'react';

let utterance_words = new SpeechSynthesisUtterance("Basic Words");
let utterance_hello = new SpeechSynthesisUtterance("Hello");
let utterance_goodbye = new SpeechSynthesisUtterance("Goodbye");
let utterance_please = new SpeechSynthesisUtterance("Please");
let utterance_thanks = new SpeechSynthesisUtterance("Thanks");
let utterance_sorry = new SpeechSynthesisUtterance("Sorry");
let utterance_yes = new SpeechSynthesisUtterance("Yes");
let utterance_no = new SpeechSynthesisUtterance("No");
let utterance_okay = new SpeechSynthesisUtterance("Okay");
let utterance_father = new SpeechSynthesisUtterance("Father");
let utterance_mother = new SpeechSynthesisUtterance("Mother");
let utterance_love = new SpeechSynthesisUtterance("I love you");
let utterance_excuse = new SpeechSynthesisUtterance("Excuse me");

function Card(props) {

    const [text, setText] = React.useState(props.frontSide);
    const [isFlipped, setIsFlipped] = React.useState(false);

    function handleClick() {
        if (!isFlipped) {
            //setText(props.backSide);
            setIsFlipped(true);
        }
        else {
            setText(props.frontSide);
            setIsFlipped(false);
        }
    };

    if (!isFlipped) {
        return (
            <div className='flash-card text-8xl font-bold flex justify-center items-center w-175 h-150 p-6 shadow-2xl bg-white rounded-xl border-4 border-gray-500 shadow-yellow-600'
             onClick={handleClick}
            >
                {props.frontSide}
            </div>
        );
    } else {
        return (
            <div className='flash-card text-8xl font-bold flex justify-center items-center w-175 h-150 p-6 shadow-2xl bg-white rounded-xl border-4 border-gray-500 shadow-yellow-600 object-contain object-scale-down'
             onClick={handleClick}
            >
                <img src={props.backSide} />
            </div>
        );
    }    
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
                <h1 className='text-3xl font-bold'
                 onMouseEnter={() => handleMouseEnter(utterance_words)}
                 onMouseLeave={handleMouseLeave}
                >
                    Basic Words
                </h1>
            </div>
            <div className='flex flex-col items-center p-5'>
                <Card frontSide="Hello" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/hello-webp.webp"></Card>
                <Card frontSide="Goodbye" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/goodbye-webp.webp"></Card>
                <Card frontSide="Please" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/please-webp.webp"></Card>
                <Card frontSide="Thanks" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/thank_you-webp.webp"></Card>
                <Card frontSide="Sorry" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/sorry-webp.webp"></Card>
                <Card frontSide="Yes" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/yes-webp.webp"></Card>
                <Card frontSide="No" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/no-webp.webp"></Card>
                <Card frontSide="Okay" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/okay.svg"></Card>
                <Card frontSide="Father" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/father-webp.webp"></Card>
                <Card frontSide="Mother" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/mommy-webp.webp"></Card>
                <Card frontSide="I love you" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/i_love_you-webp.webp"></Card>
                <Card frontSide="Excuse me" backSide="https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/excuse_me.svg"></Card>
            </div>
        </div>
    );
};
 
 export default BasicWords;