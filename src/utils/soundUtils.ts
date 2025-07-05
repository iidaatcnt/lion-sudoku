import * as Tone from 'tone';
import { SoundType } from '../types/types';

// 効果音再生
export const playSound = async (type: SoundType, soundEnabled: boolean): Promise<void> => {
  if (!soundEnabled) return;
  
  try {
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }

    const synth = new Tone.Synth().toDestination();
    
    switch (type) {
      case 'select':
        synth.triggerAttackRelease('C5', '0.1');
        break;
      case 'hint':
        synth.triggerAttackRelease('G4', '0.2');
        setTimeout(() => synth.triggerAttackRelease('C5', '0.2'), 150);
        break;
      case 'complete':
        synth.triggerAttackRelease('C4', '0.2');
        setTimeout(() => synth.triggerAttackRelease('E4', '0.2'), 150);
        setTimeout(() => synth.triggerAttackRelease('G4', '0.2'), 300);
        setTimeout(() => synth.triggerAttackRelease('C5', '0.4'), 450);
        break;
      case 'reset':
        synth.triggerAttackRelease('F3', '0.15');
        break;
      case 'button':
        synth.triggerAttackRelease('A4', '0.1');
        break;
      case 'giveup':
        synth.triggerAttackRelease('E3', '0.2');
        setTimeout(() => synth.triggerAttackRelease('C3', '0.2'), 150);
        break;
    }
    
    setTimeout(() => synth.dispose(), 1000);
  } catch (error) {
    console.log('音声再生エラー:', error);
  }
};