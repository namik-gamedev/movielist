import React, { FC, useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/button/Button';
import { IUser } from '../../types';
import FormInput from '../../components/UI/formInput/FormInput';
import { login } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { FormikHelpers, useFormik } from 'formik';
import {
   emailPattern,
   invalidError,
   invalidPasswordError,
   noExistingEmailError,
   noExistingPasswordError,
   passwordPattern,
   requiredError,
} from '../../const/userSignValidation';
import { getExistingUserFromDB, getUsersFromDB } from '../../helpers/userDB.helper';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';

const validationSchema = Yup.object().shape({
   email: Yup.string()
      .test('email-test', invalidError, (value) => emailPattern.test(value!))
      .required(requiredError),
   password: Yup.string()
      .min(8, invalidPasswordError)
      .max(16, invalidPasswordError)
      .test('password-test', invalidPasswordError, (value) => passwordPattern.test(value!))
      .required(requiredError),
});

const getInitialValues = (): IUser => {
   const item: IUser | null = cookies.get('last-user');
   return item || ({ email: '', password: '' } as IUser);
};

const cookies = new Cookies();

const useLoginForm = () => {};

const Login: FC = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onSubmit = async (
      values: IUser,
      { setSubmitting, setFieldError }: FormikHelpers<IUser>
   ) => {
      const users: IUser[] = await getUsersFromDB();
      const existingEmail: boolean = users.some((user: IUser) => user.email === values.email);
      const existingPassword: boolean = users.some(
         (user: IUser) => user.password === values.password
      );
      if (!existingEmail) {
         setFieldError('email', noExistingEmailError);
      } else {
         if (!existingPassword) {
            setFieldError('password', noExistingPasswordError);
         } else {
            const existingUser: IUser | undefined = await getExistingUserFromDB(values);
            dispatch(login(existingUser));
            navigate('/');
         }
      }
   };

   const { handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched, values } =
      useFormik({
         initialValues: getInitialValues(),
         onSubmit,
         validationSchema,
         enableReinitialize: true,
      });

   return (
      <div className={styles.login}>
         <h2>Вход в аккаунт</h2>
         <form autoComplete='off' onSubmit={handleSubmit} className={styles.form}>
            <FormInput
               value={values.email}
               label='Почта'
               placeholder='Введите почту'
               name='email'
               onChange={handleChange}
               onBlur={handleBlur}
               error={errors.email}
               touched={touched.email}
            />
            <FormInput
               value={values.password}
               label='Пароль'
               placeholder='Введите пароль'
               name='password'
               onChange={handleChange}
               onBlur={handleBlur}
               error={errors.password}
               touched={touched.password}
            />
            <Button type='submit' disabled={isSubmitting}>
               Войти
            </Button>
         </form>
         <div className={styles.login__or}>Или</div>
         <Link to='/registration'>
            <div className={styles.login__link}>Зарегистрироваться</div>
         </Link>
      </div>
   );
};

export default Login;
