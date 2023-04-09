export const emailPattern: RegExp =
   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
export const passwordPattern: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
export const requiredError: string = 'Это поле обязательно!'
export const invalidError: string = 'Недопустимое значение!'
export const invalidPasswordError: string =
   'Пароль должен состоять из 8-16 символов и содержать хотя бы одну заглавную букву и одну цифру!'
export const noExistingEmailError: string = 'На эту почту не зарегистрирован аккаунт!'
export const noExistingPasswordError: string = 'Неверный пароль!'
export const existingEmailError: string = 'На эту почту уже зарегистрирован аккаунт!'
export const passwordConfirmError: string = 'Пароли не совпадают!'
