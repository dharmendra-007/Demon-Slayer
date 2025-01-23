import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-[#FAFF89] to-[#917A71] overflow-hidden max-h-screen h-[100svh]">
      <img
        src="/images/loader.gif"
        alt="loading.."
        className="h-[150px]"
      />
    </div>
  )
}

export default Loader
