import { useEffect, useState } from 'react'
import { MdWavingHand } from 'react-icons/md'
import ErrorState from '../../components/common/ErrorState'
import DashboardSkeleton from './components/DashboardSkeleton'
import KpiCard from './components/KpiCard'
import RecentPaymentsTable from './components/RecentPaymentsTable'
import QuickActions from './components/QuickActions'
import CollectionAuditModal from './components/CollectionAuditModal'
import { getDashboardData } from '../../services/api/dashboardService'
import { authService } from '../../services/api/authService'
import { formatCurrency, formatDate, getDayPeriod } from '../../utils/format'

function DashboardPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [metrics, setMetrics] = useState([])
    const [recentPayments, setRecentPayments] = useState([])
    const [allPayments, setAllPayments] = useState([])
    const [quickActions, setQuickActions] = useState([])
    const [userName, setUserName] = useState('User')

    const [auditModalOpen, setAuditModalOpen] = useState(false)
    const [auditTitle, setAuditTitle] = useState('')
    const [auditFilterMode, setAuditFilterMode] = useState('all')

    const loadDashboard = async () => {
        setLoading(true)
        setError('')

        try {
            // Get user info
            const user = await authService.getMe()
            if (user && (user.name || user.fullName || user.username)) {
                setUserName(user.name || user.fullName || user.username)
            }

            // Get dashboard data
            const data = await getDashboardData()

            setMetrics(data.metrics)
            setRecentPayments(data.recentPayments)
            setAllPayments(data.allPayments || [])
            setQuickActions(data.quickActions)
        } catch (err) {
            console.error('Error loading dashboard data:', err)
            setError('Unable to load dashboard data. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadDashboard()
    }, [])

    const handleKpiClick = (metric) => {
        if (metric.key === 'collection') {
            setAuditTitle("Today's Collection Audit")
            setAuditFilterMode('today')
            setAuditModalOpen(true)
        } else if (metric.key === 'month_collection') {
            setAuditTitle("This Month's Collection Audit")
            setAuditFilterMode('month')
            setAuditModalOpen(true)
        } else if (metric.key === 'paid') {
            setAuditTitle("All Paid Installments")
            setAuditFilterMode('all')
            setAuditModalOpen(true)
        }
    }

    const todayCollection = metrics.find((metric) => metric.key === 'collection')?.value || 0

    const greeting = `${getDayPeriod()}, ${userName}`
    const today = formatDate(new Date())

    if (loading) {
        return <DashboardSkeleton />
    }

    if (error) {
        return <ErrorState message={error} onRetry={loadDashboard} />
    }

    return (
        <div className="space-y-5 relative">
            {/* Compact Hero Section */}
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 px-4 py-3 dark:from-slate-800 dark:to-slate-800">
                <div className="flex items-center gap-2.5 min-w-0">
                    <MdWavingHand size={20} className="text-amber-500 shrink-0 animate-[wave_2s_ease-in-out_infinite] origin-bottom-right" />
                    <div className="min-w-0">
                        <h1 className="truncate text-base font-bold text-slate-900 dark:text-white sm:text-lg">{greeting}</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Today's collection: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(todayCollection)}</span>
                        </p>
                    </div>
                </div>
                <div className="shrink-0 text-right">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Today</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">{today}</p>
                </div>
            </div>

            {/* KPI Metrics */}
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
                {metrics.map((metric) => {
                    const isClickable = ['collection', 'month_collection', 'paid'].includes(metric.key)
                    return (
                        <KpiCard
                            key={metric.id}
                            metric={metric}
                            onClick={isClickable ? () => handleKpiClick(metric) : undefined}
                        />
                    )
                })}
            </div>

            {/* Quick Actions */}
            <div className="min-w-0">
                <QuickActions actions={quickActions} />
            </div>

            {/* Recent Activity */}
            <div className="min-w-0">
                <RecentPaymentsTable payments={recentPayments} />
            </div>

            {/* Collection Audit Modal */}
            <CollectionAuditModal 
                isOpen={auditModalOpen}
                onClose={() => setAuditModalOpen(false)}
                title={auditTitle}
                filterMode={auditFilterMode}
                payments={allPayments}
            />
        </div>
    )
}

export default DashboardPage
