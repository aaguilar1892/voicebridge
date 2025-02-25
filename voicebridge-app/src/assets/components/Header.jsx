import React, { useState } from 'react';
import { GiArchBridge } from "react-icons/gi";
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Header = () => {
    /* Links */
    let Links = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Translate', link: '/translate' },
        { name: 'Practice', link: '/practice' },
    ];

    let [isOpen, setIsOpen] = useState(false);

    return (
        <div className='shadow-md w-full fixed top-0 left-0 bg-white'>
            <div className='md:px-10 py-4 px-7 md:flex justify-between items-center'>
                {/* Logo */}
                <div className='flex text-2xl cursor-pointer items-center gap-2'>
                    <GiArchBridge className='w-7 h-7 text-yellow-600' />
                    <span className='font-bold'>VoiceBridge</span>
                </div>

                {/* Menu Icon (for mobile view) */}
                <div onClick={() => setIsOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden'>
                    {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
                </div>

                {/* Nav Links (with correct alignment) */}
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white w-full md:w-auto md:ml-auto left-0 transition-all duration-500 ease-in
                ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
                    {Links.map((link) => (
                        <li key={link.name} className='font-semibold text-lg md:text-xl my-7 md:my-0 md:ml-8'>
                            <a href={link.link}>{link.name}</a>
                        </li>
                    ))}
                    <button className='btn bg-yellow-600 text-white py-1 px-3 md:ml-8 rounded text-lg md:text-xl font-bold'>Get Started</button>
                </ul>
            </div>
        </div>
    );
};

export default Header;
