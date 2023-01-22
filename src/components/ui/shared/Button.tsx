import clsx from 'clsx';
import React from 'react';

type Props = Omit<React.ComponentProps<'button'>, 'className'> & {};

const Button = React.forwardRef<HTMLButtonElement, Props>(({ children, ...props }, ref) => (
	<button
		ref={ref}
		{...props}
		className={clsx(
			'inline-flex select-none items-center justify-center rounded-md px-2 py-1 text-sm font-medium',
			'bg-white text-neutral-700 hover:bg-gray-50 dark:bg-neutral-800 dark:text-gray-100 dark:hover:bg-neutral-900',
			'hover:bg-gray-50',
			'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
			// Register all radix states
			'group',
			'radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900',
			'radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900',
			'radix-state-instant-open:bg-gray-50 radix-state-delayed-open:bg-gray-50'
		)}
	>
		{children}
	</button>
));

export default Button;
