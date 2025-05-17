import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'teal';
  width?: string;
  children: React.ReactNode;
}

const Button = ({
  variant = 'teal',
  width = 'w-80',
  children,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseStyles = 'px-2.5 py-4 rounded-lg inline-flex justify-center items-center gap-2.5';
  
  // Apply gray style when disabled, otherwise use the teal style
  const colorStyle = disabled 
    ? 'bg-gray-100 text-gray-400' 
    : 'bg-CB-blue text-white';

  const buttonStyles = `${width} ${baseStyles} ${colorStyle} ${className}`;

  return (
    <button className={buttonStyles} disabled={disabled} {...props}>
      <div className="justify-center text-body-bold-13">
        {children}
      </div>
    </button>
  );
};

export default Button; 