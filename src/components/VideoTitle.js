import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-10 md:px-20 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-xl md:text-4xl font-bold">{title}</h1>
        <p className="hidden md:inline-block py-6 text-lg w-1/2">{overview}</p>
        <div className="my-4 md:m-0">
            <button className="bg-white hover:bg-gray-400 text-black font-bold py-1 md:py-2 px-2 md:px-4 rounded">Play</button>
            <button className="hidden md:inline-block bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded mx-2 ">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle