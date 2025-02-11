import React from 'react'

const InputText = ({ labelName, type, name, placeholder }) => {
  return (
    <label className='mb-2'>
          <span className='dark:text-white '>{labelName}:</span>
          <input
            type={type}
            name={name}
            className='w-full mt-2 dark:text-black bg-slate-100 px-6 py-2 rounded-full'
            placeholder={placeholder}
          />
        </label>
  )
}

export default InputText