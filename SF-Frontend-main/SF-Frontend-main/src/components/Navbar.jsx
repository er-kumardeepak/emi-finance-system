import { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { MdDarkMode, MdLightMode, MdMenu, MdSearch, MdClose } from 'react-icons/md'
import { AuthContext } from '../context/AuthContext'
import Logo from './common/Logo'
import { brand } from '../constants/brand'

function Navbar({ onMenuClick }) {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [searchOpen, setSearchOpen] = useState(false)
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const searchInputRef = useRef(null)
    const profileMenuRef = useRef(null)

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [searchOpen])

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false)
            }
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setProfileMenuOpen(false)
            }
        }

        document.addEventListener('pointerdown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const handleSearch = (e) => {
        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
            navigate(`/customers?search=${encodeURIComponent(e.currentTarget.value.trim())}`)
            setSearchOpen(false)
        }
        if (e.key === 'Escape') {
            setSearchOpen(false)
        }
    }

    return (
        <header className="relative sticky top-0 z-20 bg-white/95 backdrop-blur-xl transition-colors duration-300 dark:bg-slate-950/95 print:hidden">
            <div className="mx-auto flex max-w-[1440px] items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 lg:px-8">

                {/* Left: Hamburger (mobile) */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 lg:hidden"
                >
                    <MdMenu size={20} />
                </button>

                {/* Desktop Search — full width */}
                <div className="mx-4 hidden flex-1 items-center gap-2 rounded-2xl px-3 py-2 text-slate-700 transition dark:text-slate-200 lg:flex">
                    <MdSearch className="h-4 w-4 shrink-0 text-slate-400" />
                    <input
                        type="search"
                        placeholder="Search customers, loans, payments..."
                        onKeyDown={handleSearch}
                        className="w-full bg-transparent text-sm outline-none border-none appearance-none ring-0 focus:ring-0 shadow-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                </div>

                {/* Mobile search overlay */}
                {searchOpen && (
                    <div className="absolute inset-x-0 top-0 z-10 flex h-full items-center gap-2 bg-white px-4 dark:bg-slate-950 lg:hidden">
                        <MdSearch className="h-4 w-4 shrink-0 text-slate-400" />
                        <input
                            ref={searchInputRef}
                            type="search"
                            placeholder="Search..."
                            onKeyDown={handleSearch}
                            className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                        />
                        <button
                            type="button"
                            onClick={() => setSearchOpen(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            <MdClose size={18} />
                        </button>
                    </div>
                )}

                {/* Spacer */}
                <div className="flex-1 lg:hidden" />

                {/* Right Actions */}
                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    {/* Mobile search toggle */}
                    <button
                        type="button"
                        onClick={() => setSearchOpen(true)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 lg:hidden"
                    >
                        <MdSearch size={18} />
                    </button>

                    {/* Theme toggle — desktop only */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 lg:flex"
                    >
                        {theme === 'dark' ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
                    </button>

                    {/* User avatar + dropdown */}
                    <div className="relative" ref={profileMenuRef}>
                        <button
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded={profileMenuOpen}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-bold uppercase tracking-wider text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                            onClick={() => setProfileMenuOpen((open) => !open)}
                        >
                            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-slate-700">
                                {user?.name?.charAt(0) || user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                            </span>
                        </button>
                        <div className={`absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200 bg-white p-2 text-sm text-slate-700 shadow-soft transition-all duration-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${profileMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
                            <Link
                                to="/profile"
                                role="menuitem"
                                onClick={() => setProfileMenuOpen(false)}
                                className="block rounded-xl px-3 py-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                My Profile
                            </Link>
                            <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setProfileMenuOpen(false)
                                    logout()
                                }}
                                className="block w-full rounded-xl px-3 py-2 text-left text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
