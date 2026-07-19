import { useContext } from 'react'
import { MdPersonAdd, MdAttachMoney, MdReceiptLong, MdBarChart, MdPeople, MdWarning } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'

const actionIcons = {
    Add: MdPersonAdd,
    Create: MdAttachMoney,
    Record: MdReceiptLong,
    View: MdBarChart,
    Overdue: MdWarning,
    Customers: MdPeople,
}

const actionColors = {
    Add: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
    Create: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    Record: 'bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    View: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    Overdue: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    Customers: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
}

function QuickActions({ actions }) {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const visibleActions = actions.filter((action) => !action.adminOnly || user.role === 'Admin')

    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-700/80 dark:bg-slate-900 sm:p-5">
            <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Quick Actions</p>

            {/* Mobile: horizontal scroll row */}
            <div className="flex gap-3 overflow-x-auto pb-1 sm:hidden" style={{ scrollbarWidth: 'none' }}>
                {visibleActions.map((action) => {
                    const Icon = actionIcons[action.action] || MdBarChart
                    const colorClass = actionColors[action.action] || 'bg-slate-100 text-slate-600'
                    return (
                        <button
                            key={action.id}
                            type="button"
                            onClick={() => navigate(action.path)}
                            className="flex shrink-0 flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                        >
                            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorClass}`}>
                                <Icon size={20} />
                            </span>
                            <span className="whitespace-nowrap text-xs font-medium text-slate-700 dark:text-slate-200">{action.title}</span>
                        </button>
                    )
                })}
            </div>

            {/* Tablet+: grid */}
            <div className="hidden sm:grid gap-3 grid-cols-3 lg:grid-cols-6">
                {visibleActions.map((action) => {
                    const Icon = actionIcons[action.action] || MdBarChart
                    const colorClass = actionColors[action.action] || 'bg-slate-100 text-slate-600'
                    return (
                        <button
                            key={action.id}
                            type="button"
                            onClick={() => navigate(action.path)}
                            className="group flex flex-col items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-4 text-center transition hover:bg-slate-100 hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800"
                        >
                            <span className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${colorClass}`}>
                                <Icon size={22} />
                            </span>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{action.title}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default QuickActions
