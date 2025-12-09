const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    primary:
      "bg-blue-600 dark:bg-blue-600 bg-blue-500 dark:bg-blue-600 text-white dark:text-white text-white dark:text-white hover:bg-blue-700 dark:hover:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-700 shadow-lg hover:shadow-xl border border-blue-500/30 dark:border-blue-500/30",
    secondary:
      "glass-button text-white dark:text-white text-gray-900 dark:text-white border border-white/20 dark:border-white/20 border-gray-300/40 dark:border-white/20 hover:border-white/30 dark:hover:border-white/30 hover:border-blue-500/50 dark:hover:border-white/30",
    danger:
      "bg-red-600 dark:bg-red-600 bg-red-500 dark:bg-red-600 text-white dark:text-white text-white dark:text-white hover:bg-red-700 dark:hover:bg-red-700 hover:bg-red-600 dark:hover:bg-red-700 shadow-lg hover:shadow-xl border border-red-500/30 dark:border-red-500/30",
    success:
      "bg-green-600 dark:bg-green-600 bg-green-500 dark:bg-green-600 text-white dark:text-white text-white dark:text-white hover:bg-green-700 dark:hover:bg-green-700 hover:bg-green-600 dark:hover:bg-green-700 shadow-lg hover:shadow-xl border border-green-500/30 dark:border-green-500/30",
    ghost: "text-gray-300 dark:text-gray-200 text-gray-700 dark:text-gray-200 hover:text-white dark:hover:text-white hover:text-gray-900 dark:hover:text-white hover:bg-white/5 dark:hover:bg-white/5 hover:bg-blue-500/10 dark:hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
