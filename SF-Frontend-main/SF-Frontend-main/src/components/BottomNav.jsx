import { NavLink } from 'react-router-dom'
import { MdDashboard, MdPeople, MdPayments, MdWarning, MdMenu } from 'react-icons/md'

const bottomItems = [
    { label: 'Home', path: '/dashboard', icon: MdDashboard },
    { label: 'Customers', path: '/customers', icon: MdPeople },
    { label: 'Payments', path: '/payments', icon: MdPayments },
    { label: 'Overdue', path: '/overdue', icon: MdWarning },
]

function BottomNav({ onMenuClick }) {
    return (
        <nav className="fixed bottom-0 inset-x-0 z-30 border-t border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/95 lg:hidden print:hidden">
            <div className="flex h-16 items-stretch">
                {bottomItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors ${
                                    isActive
                                        ? 'text-sky-600 dark:text-sky-400'
                                        : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className={`flex h-7 w-7 items-center justify-center rounded-xl transition-all ${isActive ? 'bg-sky-50 dark:bg-sky-900/40' : ''}`}>
                                        <Icon size={20} />
                                    </span>
                                    <span className="text-[10px] font-medium">{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    )
                })}
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="flex flex-1 flex-col items-center justify-center gap-0.5 text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                >
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl">
                        <MdMenu size={20} />
                    </span>
                    <span className="text-[10px] font-medium">More</span>
                </button>
            </div>
        </nav>
    )
}

export default BottomNav
