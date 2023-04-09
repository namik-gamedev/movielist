import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './styles/index.css'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'
import { Provider } from 'react-redux'
import Cookies from 'universal-cookie'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { getUsersFromDB, withDBURL } from './helpers/userDB.helper'
import { IUser } from './types'
import axios from 'axios'

const queryClient = new QueryClient()

const cookies = new Cookies()

const storeSubscribe = async (state: any) => {
   const user: IUser = state.user.data
   // положить в куки последнего залогинненого юзера
   if (Object.keys(user).length > 0) {
      cookies.set('last-user', JSON.stringify(user))
   }

   const users: IUser[] = await getUsersFromDB()
   const userId: number =
      users.findIndex(
         // iUser is an iterating user
         (iUser: IUser) => iUser.email === user.email && iUser.password === user.password
      ) + 1
   axios.put(withDBURL(`/users/${userId}`), user)
}

const store: ToolkitStore = configureStore({
   reducer: rootReducer,
})

store.subscribe(() => storeSubscribe(store.getState()))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Provider store={store}>
         <QueryClientProvider client={queryClient}>
            <App />
         </QueryClientProvider>
      </Provider>
   </React.StrictMode>
)
