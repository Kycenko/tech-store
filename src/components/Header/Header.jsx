import LogUser from './LogUser/LogUser';
import NavLinks from './NavLinks/NavLinks';
import SwitchTheme from './SwitchTheme/SwitchTheme';
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className='bg-gray-800 '>
      <div className='h-[80px] flex justify-between items-center max-w-[1280px] mx-auto px-10'>
        <div className='text-white text-[20px] cursor-default hidden md:block'><Link className='text-white' to='/'>TechShop</Link></div>
        <NavLinks />
        <div className='flex items-center'>
          <SwitchTheme />
          <LogUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
