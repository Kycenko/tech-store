import React from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const GoBackBtn = ({ onClick }) => {
  return (
    <button
    onClick={onClick}
      className='mr-2 p-2 mb-2 rounded-3xl bg-gray-200 hover:bg-gray-400 hover:text-white duration-200 w-fit h-fit'
    >
      <MdOutlineKeyboardBackspace />
    </button>
  )
}

export default GoBackBtn