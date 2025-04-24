import { useContext } from 'react';
import { TTSContext } from './TTSContext';

export const useTTS = () => useContext(TTSContext);
