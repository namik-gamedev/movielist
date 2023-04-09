import axios from 'axios'
import { IFavouriteMovie, IUser } from '../types'

export const withDBURL = (uri: string) => `http://localhost:3000${uri}`

export const addUserToDB = async (user: IUser) => {
   await axios.post(withDBURL('/users'), user)
}
export const getUsersFromDB = async () => {
   const response = await axios.get(withDBURL('/users'))
   console.log(response.data)

   return response.data
}
export const getExistingUserFromDB = async (user: IUser) => {
   const users: IUser[] = await getUsersFromDB()
   return users.find(
      // iUser is an iterating user
      (iUser: IUser) => iUser.email === user.email && iUser.password === user.password
   )
}
