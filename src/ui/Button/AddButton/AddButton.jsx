import React from 'react'

const AddButton = ({ onClick, text, type }) => {
  return (
    <button
    type={type}
    onClick={onClick}
    className='px-6 py-2 mt-2 rounded-3xl bg-green-200 hover:bg-green-300 duration-200 dark:bg-green-300 dark:hover:bg-green-400'
  >
    {text}
  </button>
  )
}

export default AddButton