import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const dispatch=useDispatch();
const navigate=useNavigate();
const user=useSelector(store=>store.user);
const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);
const handleSignOut=()=>{
 
  signOut(auth).then(() => {
  }).catch((error) => {
    navigate("/error");
  });
}

useEffect(()=>{
const unsubscribe=  onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const {uid, email, displayName, photoURL} = user;
      dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
      navigate("/browse");
      
      
    } else {
      dispatch(removeUser());
      navigate("/");
     
    }
  });

return() => unsubscribe();

}, []);

const handleGptSearchClick=()=>{
  dispatch(toggleGptSearchView());
}

const handleLanguageChange=(e)=>{
dispatch(changeLanguage(e.target.value));
}

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between " >
        <img 
        className="w-20 h-10 md:w-44 md:h-auto mx-auto md:mx-0 "
        src={LOGO} alt="Logo"/>

         {user && (<div className=" flex p-2 justify-evenly">
        { showGptSearch && (<select className="bg-gray-900 text-white m-4 p-2 rounded-lg" onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang)=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          
         </select>)}
          <button className=" h-10 mt-4 w-25 md:w-auto md:text-sm text-xs px-7 m-5 rounded-lg bg-red-700 text-white" onClick={handleGptSearchClick}>{showGptSearch?"Homepage":"Gpt Search"}</button>
          <img className="hidden md:block w-9 h-9 rounded-lg " src={user?.photoURL}
          alt="usericon"/>
          <button onClick={handleSignOut} className="w-auto m-2 p-1 rounded-xl text-white" >Sign Out</button>
         </div>)}
        
    </div>
    
  )
}

export default Header