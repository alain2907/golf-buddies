import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass' | 'neon';
  hover?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false 
}: CardProps) {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-300';
  
  const variantStyles = {
    default: 'bg-white shadow-lg border border-gray-100',
    gradient: 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 shadow-xl border border-purple-200',
    glass: 'bg-white/80 backdrop-blur-md shadow-xl border border-white/50',
    neon: 'bg-gray-900 shadow-2xl border-2 border-purple-500 shadow-purple-500/20',
  };
  
  const hoverStyles = hover
    ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer'
    : '';
  
  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}