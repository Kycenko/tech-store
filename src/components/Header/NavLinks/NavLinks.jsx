import React, { useState } from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import { useSelector } from 'react-redux'
import CustomLink from '../../CustomLink/CustomLink'



const NavLinks = () => {
  const auth = useSelector(state => state.users.auth)
  const [visible, setVisible] = useState(false)


  return (
    <>
      <div className='sm:hidden'>
        <MdMenu
          onClick={() => setVisible(!visible)}
          className='text-white w-[35px] h-[35px] cursor-pointer'
        />
        <div
          className={`duration-300 ${
            visible
              ? 'absolute top-0 left-0 w-[320px] h-full bg-gray-800'
              : 'absolute left-[-320px]'
          }`}
          style={{ zIndex: 9999 }}
        >
        
        <MdClose
            onClick={() => setVisible(!visible)}
            className='absolute text-white w-[35px] h-[35px] cursor-pointer mt-[20px] ml-[260px]'
          />
          
          <div className='text-white text-[20px] cursor-default mt-6 ml-4'>
            TechShop
          </div>
          <div className='flex flex-col mt-8'>
            <CustomLink onClick={() => setVisible(!visible)} to='/'>
              Главная
            </CustomLink>
            <CustomLink onClick={() => setVisible(!visible)} to='/goods'>
             Товары
            </CustomLink>
            {auth ? (
              <CustomLink onClick={() => setVisible(!visible)} to='/admin'>
               Admin-панель
              </CustomLink>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className='hidden sm:block'>
        <CustomLink to='/'>Главная</CustomLink>
        <CustomLink to='/goods'>Товары</CustomLink>
        {auth ? <CustomLink to='/admin'>Admin-панель</CustomLink> : ''}
      </div>
    </>
  )
}

export default NavLinks