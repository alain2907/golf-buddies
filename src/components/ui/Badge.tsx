import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 hover:scale-110';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
    secondary: 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
    info: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white',
  };
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };
  
  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}