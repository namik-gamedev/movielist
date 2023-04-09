import React, { FC } from 'react';
import styles from './Registration.module.css';
import { IRegistrationFields, IUser } from '../../types';
import FormInput from '../../components/UI/formInput/FormInput';
import Button from '../../components/UI/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import {
   emailPattern,
   invalidError,
   passwordConfirmError,
   invalidPasswordError,
   passwordPattern,
   requiredError,
   existingEmailError,
} from '../../const/userSignValidation';
import {
   addUserToDB,
   getExistingUserFromDB,
   getUsersFromDB,
} from '../../helpers/userDB.helper';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';

const validationSchema = Yup.object().shape({
   name: Yup.string().required(requiredError),
   email: Yup.string()
      .test('email-test', invalidError, (value) => emailPattern.test(value!))
      .required(requiredError),
   password: Yup.string()
      .min(8, invalidPasswordError)
      .max(16, invalidPasswordError)
      .test('password-test', invalidPasswordError, (value) => passwordPattern.test(value!))
      .required(requiredError),
});

const cookies = new Cookies();

const Registration: FC = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const onSubmit = async (
      values: IRegistrationFields,
      { setSubmitting, setFieldError }: FormikHelpers<IRegistrationFields>
   ) => {
      const users: IUser[] = await getUsersFromDB();
      const existingEmail: boolean = users.some((user: IUser) => user.email === values.email);
      if (existingEmail) {
         setFieldError('email', existingEmailError);
      } else {
         if (values.password === values.confirmPassword) {
            delete values.confirmPassword;
            await addUserToDB({ ...values, favouriteMovies: [], darkTheme: false });
            const existingUser: IUser | undefined = await getExistingUserFromDB(values);
            dispatch(login(existingUser));
            navigate('/');
         } else {
            setFieldError('confirmPassword', passwordConfirmError);
         }
      }
      setSubmitting(false);
   };

   const { handleSubmit, handleChange, handleBlur, isSubmitting, errors, touched } = useFormik(
      {
         initialValues: {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
         } as IRegistrationFields,
         onSubmit,
         validationSchema,
      }
   );

   return (
      <div className={styles.registration}>
         <h2>Зарегистрироваться</h2>
         <form autoComplete='off' onSubmit={handleSubmit} className={styles.form}>
            <FormInput
               label='Имя'
               placeholder='Введите имя'
               name='name'
               onChange={handleChange}
               onBlur={handleBlur}
               error={errors.name}
               touched={touched.name}
            />
            <FormInput
               label='Почта'
               placeholder='Введите почту'
               name='email'
               onChange={handleChange}
               onBlur={handleBlur}
               error={errors.email}
               touched={touched.email}
            />
            <FormInput
               label='Пароль'
               placeholder='Введите пароль'
               name='password'
               onChange={handleChange}
               onBlur={handleBlur}
               error={errors.password}
               touched={touched.password}
            />
            <FormInput
               label='Подтверждение пароля'
               placeholder='Введите пароль еще раз'
               name='confirmPassword'
               onChange={handleChange}
               onBlur={handleBlur}
               error={errors.confirmPassword}
               touched={touched.confirmPassword}
            />
            <Button type='submit' disabled={isSubmitting}>
               Зарегистрироваться
            </Button>
         </form>
         <div className={styles.registration__or}>Или</div>
         <Link to='/login'>
            <div className={styles.registration__link}>Войти</div>
         </Link>
      </div>
   );
};

export default Registration;
