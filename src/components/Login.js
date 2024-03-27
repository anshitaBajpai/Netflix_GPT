import React from 'react'
import Header from './Header'
import {useState,useRef} from 'react'
import { checkValidData } from '../utils/validate';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import{auth} from '../utils/firebase'


const Login = () => {
  const [isSignInForm,setIsSigInForm]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null)


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
    console.log(user);
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
      console.log(user)
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
    src="https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/a449fabb-05e4-4c8a-b062-b0bec7d03085/IN-en-20240115-trifectadaily-perspective_alpha_website_small.jpg"
    alt="Logo"/>
    </div>
    <form onSubmit={(e)=> e.preventDefault()} 
     className="bg-opacity-90 w-[24rem] h-[30rem] absolute p-12 bg-gray-950 text-white my-36 mx-auto left-10 right-10">

    <h1 className="text-3xl font-bold px-2 leading-loose" >{isSignInForm? "Sign In" : "Sign Up"}</h1>

     {!isSignInForm && (<input type="text" placeholder="Full Name" className="w-72 h-11 p-2 my-2 bg-neutral-400 bg-opacity-50 rounded-md ring-1 ring-neutral-300" />)}

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