import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gray' | 'teal';
  width?: string;
  children: React.ReactNode;
}

const Button = ({
  variant = 'teal',
  width = 'w-80',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'px-2.5 py-4 rounded-lg inline-flex justify-center items-center gap-2.5';
  
  const variantStyles = {
    gray: 'bg-gray-100 text-gray-400',
    teal: 'bg-CB-blue text-white',
  };

  const buttonStyles = `${width} ${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button className={buttonStyles} {...props}>
      <div className="justify-center text-body-bold-13">
        {children}
      </div>
    </button>
  );
};

export default Button; 