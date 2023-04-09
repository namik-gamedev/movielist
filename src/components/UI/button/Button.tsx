import classNames from 'classnames';
import React, { FC } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ className, children, disabled, ...props }) => {
   return (
      <button {...props} disabled={disabled} className={classNames(styles.btn, disabled && styles.btn_disabled, className)}>
         {children}
      </button>
   );
};

export default Button;
