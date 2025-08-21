import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../stores/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../stores/gptSlice';
import { changeLanguage } from '../stores/configSlice';


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
      {user && (
        <div className="flex p-2 items-center gap-4 justify-end">
          {showGptSearch && (
            <select className="bg-gray-900 text-white p-2 rounded-lg h-10 min-w-[110px] focus:outline-none" onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              ))}
            </select>
          )}
          <button
            className="h-10 w-28 md:w-auto md:text-sm text-xs px-7 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white flex items-center justify-center gap-2 shadow-md font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onClick={handleGptSearchClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
            <span>{showGptSearch ? "Homepage" : "Gpt Search"}</span>
          </button>
          <button
            onClick={handleSignOut}
            className="h-10 px-5 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white flex items-center gap-2 shadow font-semibold hover:from-gray-800 hover:to-black transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-6-3h12m0 0l-3-3m3 3l-3 3" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Header