import { parameterToString } from '@/libs/client';
import { forwardRef } from 'react';

export const styles = {
  base: 'font-semibold self-center font-medium text-stone-700 border border-stone-300 rounded-md shadow-sm hover:text-stone-600 hover:border-stone-300 hover:bg-stone-100 hover:border-transparent active:bg-stone-300 whitespace-nowrap bg-white',
  disabled: 'disabled:border-none disabled:text-stone-500  disabled:bg-stone-300 cursor-not-allowed',
  size: {
    lg: 'py-2 px-3 text-lg',
    md: 'py-3 px-10 text-md',
    sm: 'py-2 px-6 text-sm',
  },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof styles.size;
  width?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className = '', disabled, onClick, size = 'md', type = 'button', width = '', ...props },
  ref
): JSX.Element {
  const classes = parameterToString(styles.base, styles.size[size], disabled ? styles.disabled : '', width, className);

  return (
    <button className={classes} disabled={disabled} onClick={onClick} ref={ref} type={type} {...props}>
      {children}
    </button>
  );
});

export default Button;
