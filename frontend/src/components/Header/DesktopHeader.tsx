import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/T-Shirt_shop2.png'
import { DesktopHeaderProps } from './types'
import MenuIcon from './MenuIcon'
import Toggle from '../Toggle'
import Wishlist from '../Wishlist'
import Authenticate from '../Authenticate'
import Cart from '../Cart'

const DesktopHeader: React.FC<DesktopHeaderProps> = ({setMobileMenuOpen, darkMode, setDarkMode}) => {
    //let colors = darkmode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
	return (
        <nav 
            className="flex items-center justify-between py-12 px-4 lg:px-8" 
            aria-label="Global">
            {/* Logo Section */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="flex items-center justify-between lg:contents">
                <div className="flex lg:flex-1">
                    <Link to="/" >
                    <img src={Logo} alt="T-Shirt Store" className="w-25 rounded-2xl"  />
                    </Link>
                </div>
                <MenuIcon setMobileMenuOpen={setMobileMenuOpen} />
            </div>
            {/* Pages */}
            <div className="hidden lg:flex lg:gap-x-12 lg:justify-center lg:col-span-3">
                
                <div> <Link to="/products/tshirt" className="text-sm font-semibold leading-6">Plain</Link></div>
                <div> <Link to="/products/raglan" className="text-sm font-semibold leading-6">Raglan</Link></div>
                <div> <Link to="/products/polo" className="text-sm font-semibold leading-6">Polo</Link></div>
                <div> <Link to="/products/vneck" className="text-sm font-semibold leading-6 whitespace-nowrap">V-Neck</Link></div>
                
            </div>

            {/* Login */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 ">
                <div>
                    <Wishlist darkMode={darkMode} />
                </div>
                <div>
                    <Cart darkMode={darkMode} />
                </div>
                <div>
                    <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>                
                <div>
                    <Authenticate />
                {/* <Link to="/login" className="text-sm font-semibold leading-6">
                    Log in <span aria-hidden="true">&rarr;</span>
                </Link> */}
                </div>
            </div>
        </div>
        </nav>
	)
}

export default DesktopHeader