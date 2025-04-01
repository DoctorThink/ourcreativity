
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ButtonLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, href, variant = 'solid', size = 'md', external = false, children, ...props }, ref) => {
    const baseStyles = 'btn inline-flex items-center justify-center gap-2 transition-all focus:outline-none';
    
    const variantStyles = {
      solid: 'btn-solid',
      outline: 'btn-outline',
    };
    
    const sizeStyles = {
      sm: 'text-sm px-4 py-2',
      md: 'px-6 py-3',
      lg: 'text-lg px-8 py-4',
    };

    const classes = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );
    
    if (external) {
      return (
        <a 
          className={classes}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref}
          {...props}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link 
        className={classes}
        to={href}
        ref={ref}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';

export { ButtonLink };
