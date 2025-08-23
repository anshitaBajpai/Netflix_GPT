

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-black to-gray-900 text-gray-300 py-8 px-4 mt-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl font-bold text-red-600 tracking-wider">NetflixGPT</span>
          <span className="text-xs text-gray-400">&copy; {new Date().getFullYear()} NetflixGPT. All rights reserved.</span>
        </div>
        <div className="flex flex-wrap gap-6 text-sm justify-center md:justify-end">
          <a href="https://github.com/anshitaBajpai" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition">GitHub</a>
          <a href="/" className="hover:text-red-400 transition">Home</a>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-gray-500">
        Built with <span className="text-red-500">&#10084;</span> using React, Firebase, OpenAI, and TMDB APIs.
      </div>
    </footer>
  );
};

export default Footer;
