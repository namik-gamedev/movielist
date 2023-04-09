import React, { FC } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
   label?: string;
}

const Input: FC<InputProps> = ({ className, label, name, ...props }) => {
   return (
      <>
         {label && (
            <label className={styles.input__label} htmlFor={name}>
               {label}
            </label>
         )}
         <input name={name} className={classNames(styles.input, className)} {...props} />
      </>
   );
};

export default Input;
