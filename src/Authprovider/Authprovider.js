import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import App from '../firebase/firebase.config'


export const authcontext = createContext()
const auth = getAuth(App)


const Authprovider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

 
    //==Create User
    const registerUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }


    // ==login User
    const loginUser = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    
    //==Google User
    const provider = new GoogleAuthProvider()
    const googleUser = () =>{
        return signInWithPopup(auth, provider)
    } 


    // ==updetProfile
    const userUpdet = (UserInfo) =>{
        return updateProfile(auth.currentUser, UserInfo)
       }
    


    //===Logout user
    const userlogout = () =>{
        return signOut(auth)
    }


    // ==user control
      useEffect(() =>{      
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
              setUser(currentUser)
              setLoading(false)
              console.log(currentUser);
          })
          return () =>{
              unsubscribe()
          }
      },[])


   const allInfo = { user, loading, setLoading, registerUser, loginUser, googleUser, userlogout, userUpdet }


    return (
        <div>
            <authcontext.Provider value={allInfo}>
                {children}
            </authcontext.Provider>
        </div>
    );
};

export default Authprovider;