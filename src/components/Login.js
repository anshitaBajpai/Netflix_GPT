import React from 'react'
import Header from './Header'
import {useState} from 'react'

const Login = () => {
  const [isSignInForm,setIsSigInForm]=useState(true);

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
    <form className="bg-opacity-90 w-[24rem] h-[30rem] absolute p-12 bg-gray-950 text-white my-36 mx-auto left-10 right-10">
    <h1 className="text-3xl font-bold px-2 leading-loose">{isSignInForm? "Sign In" : "Sign Up"}</h1>
     {!isSignInForm && (<input type="text" placeholder="Full Name" className="w-72 h-11 p-2 my-2 bg-neutral-400 bg-opacity-50 rounded-md ring-1 ring-neutral-300" />)}
    <input type="text" placeholder="Email Address" className="w-72 h-11 p-2 my-2 bg-neutral-400 bg-opacity-50 rounded-md ring-1 ring-neutral-300" />
    
    <input type="password" placeholder="Password" className="w-72 h-11 p-2 my-2 bg-neutral-400 bg-opacity-50 rounded-md ring-1 ring-neutral-300" />
    <button className="w-72 py-2 my-4 bg-red-700 rounded-md">{isSignInForm? "Sign In" : "Sign Up"}</button>
    <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm? "New to Netflix! Sign Up Now" : "Already registered? Sign In Now"}</p>
  </form>
  </div>
  )
}

export default Login