import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
}

const getButtonStyles = (variant: ButtonVariant, disabled: boolean, fullWidth: boolean): string => {
  const baseStyles = `
    inline-block px-6 py-3 font-medium transition-colors
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  switch (variant) {
    case 'primary':
      return `${baseStyles} bg-primary hover:bg-primary-dark text-white`;
    case 'secondary':
      return `${baseStyles} bg-secondary hover:bg-primary text-white`;
    case 'accent':
      return `${baseStyles} bg-accent hover:bg-primary text-white`;
    case 'outline':
      return `${baseStyles} border border-primary text-primary hover:bg-primary hover:text-white`;
    default:
      return `${baseStyles} bg-primary hover:bg-primary-dark text-white`;
  }
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
}) => {
  const buttonStyles = getButtonStyles(variant, disabled, fullWidth);
  
  if (href) {
    return (
      <Link href={href} className={`${buttonStyles} ${className}`}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      className={`${buttonStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; 