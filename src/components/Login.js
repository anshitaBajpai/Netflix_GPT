import React from 'react'
import Header from './Header'
import {useState,useRef} from 'react'
import { checkValidData } from '../utils/validate';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import{auth} from '../utils/firebase'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG_URL, USER_AVATAR } from '../utils/constants';


const Login = () => {
  const [isSignInForm,setIsSigInForm]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null)
  
  const dispatch=useDispatch();

const name=useRef(null)
  const email=useRef(null);
  const password=useRef(null);

  const handleButtonClick=()=>{
  //Validate form data
const message=checkValidData(email.current.value,password.current.value);
setErrorMessage(message);

if(message) return;

if(!isSignInForm){
  //Sign up Logic
  createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value , photoURL:USER_AVATAR
    }).then(() => {
      const {uid, email, displayName, photoURL} = auth.currentUser;
      dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
      
    }).catch((error) => {
      setErrorMessage(error.message)
    });
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
  });
}

else{
  //Sign In Logic
  signInWithEmailAndPassword(auth, email.current.value,password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
     
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage)
      
    });

}
  }


  const toggleSignInForm = ()=> {
  setIsSigInForm(!isSignInForm);

  };

  
  return (
    <div >
      <Header/>
    <div className="absolute" >
    <img 
    className=""
    src={BG_IMG_URL}
    alt="Background Img"/>
    </div>
    <form onSubmit={(e)=> e.preventDefault()} 
     className="bg-opacity-90 w-[24rem] h-[30rem] absolute p-12 bg-gray-950 text-white my-36 mx-auto left-10 right-10">

    <h1 className="text-3xl font-bold px-2 leading-loose" >{isSignInForm? "Sign In" : "Sign Up"}</h1>

     {!isSignInForm && (<input ref={name} type="text" placeholder="Full Name" className="w-72 h-11 p-2 my-2 bg-neutral-400 bg-opacity-50 rounded-md ring-1 ring-neutral-300" />)}

    <input ref={email} type="text" placeholder="Email Address" className="w-72 h-11 p-2 my-2 bg-neutral-400 bg-opacity-50 rounded-md ring-1 ring-neutral-300" />
    
    <input ref={password} type="password" placeholder="Password" className="w-72 h-11 p-2 my-2 bg-neutral-400 bg-opacity-50 rounded-md ring-1 ring-neutral-300" />

    <p className="text-red-600 font-bold py-2">{errorMessage}</p>

    <button className="w-72 py-2 my-4 bg-red-700 rounded-md hover:bg-red-800 active:bg-red-900" onClick={handleButtonClick}>{isSignInForm? "Sign In" : "Sign Up"}</button>
    <p className="py-4 cursor-pointer hover:text-gray-300 active:text-gray-400" onClick={toggleSignInForm}>{isSignInForm? "New to Netflix! Sign Up Now" : "Already registered? Sign In Now"}</p>
  </form>
  </div>
  )
}

export default Login