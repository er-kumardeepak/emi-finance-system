import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../../../components/common/Badge'
import Button from '../../../components/common/Button'
import EmptyState from '../../../components/common/EmptyState'
import { formatCurrency, formatId, formatName, formatPaidDate } from '../../../utils/format'

const STATUS_VARIANT = {
    Received: 'success',
    Completed: 'success',
    Paid: 'success',
    Pending: 'warning',
    Failed: 'warning',
    Overdue: 'danger'
}

const METHOD_COLORS = {
    Cash: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    UPI: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    'Bank Transfer': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
}

function RecentPaymentsTable({ payments }) {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const rowsPerPage = 5

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase()
        if (!query) return payments
        return payments.filter((payment) =>
            [payment.customer, payment.customerDisplayId, payment.method, payment.status, payment.loanId, payment.emiNumber, payment.collectedBy].some((value) =>
                value && value.toString().toLowerCase().includes(query),
            ),
        )
    }, [payments, search])

    const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage))
    const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage)

    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-soft dark:border-slate-700/80 dark:bg-slate-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Recent Payments</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Latest transactions captured in the system.</p>
                </div>
                <input
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value)
                        setPage(1)
                    }}
                    placeholder="Search payments..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 sm:max-w-xs"
                />
            </div>

            {paginated.length === 0 ? (
                <div className="mt-6">
                    <EmptyState title="No payments found" description="Try a different search or check back later." />
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="mt-4 hidden overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800 md:block">
                        <table className="w-full text-left text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap min-w-[720px]">
                            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Customer</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Loan / EMI</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Amount</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Method</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Date</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Status</th>
                                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Collected By</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {paginated.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-900 dark:text-slate-100">{formatName(payment.customer)}</p>
                                            <p className="text-xs text-slate-400">{formatId(payment.customerDisplayId)}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            {payment.rawLoanId ? (
                                                <Link
                                                    to={`/loans/${payment.rawLoanId}`}
                                                    className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
                                                >
                                                    {payment.loanId}
                                                </Link>
                                            ) : (
                                                <span className="text-slate-500">{payment.loanId}</span>
                                            )}
                                            <p className="text-xs text-slate-400">EMI #{payment.emiNumber}</p>
                                        </td>
                                        <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-100">
                                            {formatCurrency(payment.amount)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${METHOD_COLORS[payment.method] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                                                {payment.method}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{formatPaidDate(payment.paidOn)}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant={STATUS_VARIANT[payment.status] || 'primary'}>{payment.status}</Badge>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{formatName(payment.collectedBy || 'System')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile card list */}
                    <div className="mt-4 space-y-3 md:hidden">
                        {paginated.map((payment) => (
                            <div key={payment.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-slate-900 dark:text-slate-100">{formatName(payment.customer)}</p>
                                        <p className="text-xs text-slate-400">{formatId(payment.customerDisplayId)}</p>
                                    </div>
                                    <Badge variant={STATUS_VARIANT[payment.status] || 'primary'}>{payment.status}</Badge>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <div>
                                        <p className="text-base font-bold text-slate-900 dark:text-slate-100">{formatCurrency(payment.amount)}</p>
                                        <p className="text-xs text-slate-400">
                                            {payment.rawLoanId ? (
                                                <Link to={`/loans/${payment.rawLoanId}`} className="text-sky-600 hover:underline dark:text-sky-400">
                                                    {payment.loanId}
                                                </Link>
                                            ) : payment.loanId} · EMI #{payment.emiNumber}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${METHOD_COLORS[payment.method] || 'bg-slate-100 text-slate-700'}`}>
                                            {payment.method}
                                        </span>
                                        <p className="mt-1 text-xs text-slate-400">{formatPaidDate(payment.paidOn)}</p>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-slate-400 border-t border-slate-100 pt-2 dark:border-slate-800">
                                    Collected by {formatName(payment.collectedBy || 'System')}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Showing {paginated.length} of {filtered.length} payments
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        className="px-3 py-2 text-xs"
                        onClick={() => setPage((current) => Math.max(1, current - 1))}
                        disabled={page <= 1}
                    >
                        Previous
                    </Button>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                        {page} / {pageCount}
                    </span>
                    <Button
                        variant="secondary"
                        className="px-3 py-2 text-xs"
                        onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                        disabled={page >= pageCount}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RecentPaymentsTable
