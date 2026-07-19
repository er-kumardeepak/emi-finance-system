function Button({ children, type = 'button', variant = 'primary', className = '', ...rest }) {
    const styles = {
        primary: 'inline-flex items-center justify-center rounded-2xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed',
        secondary: 'inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800',
        ghost: 'inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed dark:text-slate-200 dark:hover:bg-slate-800',
    }

    return (
        <button type={type} className={`${styles[variant] || styles.primary} ${className}`} {...rest}>
            {children}
        </button>
    )
}

export default Button
