import React, { useState } from 'react';
import { MdWbSunny, MdDarkMode } from 'react-icons/md';

const SwitchTheme = () => {
  let html = document.querySelector('html');
  let body = document.querySelector('body');
  const [theme, setTheme] = useState(false);
  const switchTheme = () => {
    setTheme(!theme);
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      body.classList.remove('darkBody')
    } else {
      body.classList.add('darkBody')
      html.classList.add('dark');
    }
  };

  return (
    <div className='items-center hidden md:flex mr-10'>
      {/* <h2 className='m-0 mr-3 text-White text-[15px] md:text-[20px] dark:text-Black font-montserrat'>
        Switch <br className='md:hidden' />
        Theme
      </h2> */}
      <MdWbSunny className='text-white w-[18px] h-[18px]'/>
      <div className='flex items-center bg-white rounded-full p-1 text-[14px] mx-2'>
        <p
          onClick={switchTheme}
          className={
            theme
              ? 'm-0 p-2 cursor-pointer duration-300'
              : 'm-0 bg-black text-white rounded-full p-2 cursor-pointer duration-200'
          }
        ></p>
        <p
          onClick={switchTheme}
          className={
            theme
              ? 'm-0 bg-black text-white rounded-full p-2 cursor-pointer duration-200'
              : 'm-0 p-2 cursor-pointer duration-300'
          }
        ></p>
      </div>
      <MdDarkMode className='text-white w-[18px] h-[18px]'/>
    </div>
  );
};

export default SwitchTheme;
