import type { HTMLAttributes } from 'react';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
}

const Text = ({ className = '', children, ...props }: TextProps) => {
  return (
    <p className={`text-base text-black ${className}`} {...props}>
      {children}
    </p>
  );
};

export default Text;
