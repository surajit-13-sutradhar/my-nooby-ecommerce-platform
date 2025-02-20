import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
    const user = true
    const isAdmin = true
    return (
        <header className="fixed flex justify-center top-0 left-0 w-full bg-darkBlue-800 bg-opacity-90 backdrop-blur-md shadow-md z-40 transition-all duration-300">
            <div className="container mx-4 px-4 py-3 flex justify-between">
                <Link to="/" className="text-1xl font-bold text-darkBlue-100 items-center flex">
                ShopNest</Link>
                <nav className="flex flex-wrap items-center gap-4 text-[14px]">
                    <Link to={"/"}>Home</Link>
                    {user && (
                        <Link to={"/cart"} className="relative group">
                            <ShoppingCart className="inline-block mr-1 group-hover:text-brightBlue-100 transition duration-300 ease-in-out" size={20} />
                            <span className="hidden sm:inline"></span>
                            <span className="absolute -top-2 -left-2 bg-brightBlue-300 text-white rounded-full px-1 py-0.2 text-xs group-hover:bg-brightBlue-300 transition duration-300 ease-in-out">3</span>
                        </Link>
                    )}
                    {isAdmin && (
                        <Link className="inline-block size={18} flex items-center">
                            <Lock className='inline-block mr-1' size={16} />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                    )}

                    {user ? (
                        <button className="py-2 rounded-md flex items-center transition duration-300 ease-in-out">
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Log Out</span>
                        </button>
                    ): (
                        <>
                            <Link
									to={"/signup"}
									className='text-white py-2 
									rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<UserPlus className='mr-1' size={16} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='text-white py-2
									rounded-md flex items-center transition duration-300 ease-in-out'
								>
									<LogIn className='mr-1' size={16} />
									Login
								</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar