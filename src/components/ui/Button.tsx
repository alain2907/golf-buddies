import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gradient' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-100 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:from-pink-600 hover:to-rose-600 focus:ring-pink-300',
    secondary: 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg hover:from-cyan-600 hover:to-teal-600 focus:ring-cyan-300',
    gradient: 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-xl hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 focus:ring-purple-300',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:from-green-600 hover:to-emerald-600 focus:ring-green-300',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:from-yellow-600 hover:to-orange-600 focus:ring-yellow-300',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:from-red-600 hover:to-pink-600 focus:ring-red-300',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}