declare module 'react-input-mask' {
  import { ComponentType, InputHTMLAttributes } from 'react';

  export interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string;
    formatChars?: { [key: string]: string };
    alwaysShowMask?: boolean;
    beforeMaskedStateChange?: (state: any) => any;
  }

  const InputMask: ComponentType<InputMaskProps>;
  export default InputMask;
} 