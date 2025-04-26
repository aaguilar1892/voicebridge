import React from 'react';

let utterance_alphabet = new SpeechSynthesisUtterance("Alphabet");

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

const Alphabet = () => {

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
                 onMouseEnter={() => handleMouseEnter(utterance_alphabet)}
                 onMouseLeave={handleMouseLeave}
                >
                    Alphabet
                </h1>
            </div>
            <div className='flex flex-col items-center p-5'>
                <Card frontSide="A" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-A.png"></Card>
                <Card frontSide="B" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-B-1536x864.png"></Card>
                <Card frontSide="C" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-C-1536x864.png"></Card>
                <Card frontSide="D" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-D-1536x864.png"></Card>
                <Card frontSide="E" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-E.png"></Card>
                <Card frontSide="F" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-F-1536x864.png"></Card>
                <Card frontSide="G" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-G-1536x864.png"></Card>
                <Card frontSide="H" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-H-1536x864.png"></Card>
                <Card frontSide="I" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-I.png"></Card>
                <Card frontSide="J" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-J-1536x864.png"></Card>
                <Card frontSide="K" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-K-1536x864.png"></Card>
                <Card frontSide="L" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-L-1536x864.png"></Card>
                <Card frontSide="M" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-M-1536x864.png"></Card>
                <Card frontSide="N" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-N-1536x864.png"></Card>
                <Card frontSide="O" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-O-1536x864.png"></Card>
                <Card frontSide="P" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-P-1536x864.png"></Card>
                <Card frontSide="Q" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-Q-1536x864.png"></Card>
                <Card frontSide="R" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-R-1536x864.png"></Card>
                <Card frontSide="S" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-S.png"></Card>
                <Card frontSide="T" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-T-1536x864.png"></Card>
                <Card frontSide="U" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-U-1536x864.png"></Card>
                <Card frontSide="V" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-V-1536x864.png"></Card>
                <Card frontSide="W" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-W.png"></Card>
                <Card frontSide="X" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-X-1536x864.png"></Card>
                <Card frontSide="Y" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-Y-1536x864.png"></Card>
                <Card frontSide="Z" backSide="https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-Z-1536x864.png"></Card>
            </div>
        </div>
    );
};
 
 export default Alphabet;