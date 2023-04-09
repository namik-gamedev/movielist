import React, { FC } from 'react';
import Input, { InputProps } from '../input/Input';
import styles from './FormInput.module.css';
import classNames from 'classnames';
import { IUser } from '../../../types';

interface FormInputProps extends InputProps {
   error?: string;
   touched?: boolean;
}

const FormInput: FC<FormInputProps> = ({ error, touched, ...props }) => {
   return (
      <>
         <Input className={styles.input} {...props} />
         <small className={styles.input__error}>{error}</small>
      </>
   );
};

export default FormInput;
