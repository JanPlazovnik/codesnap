import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { clsx } from 'clsx';
import Button from './shared/Button';

interface SelectProps {
	value: string;
	options: string[];
	onChange?: (value: string) => void;
}

export default function Select(props: SelectProps) {
	return (
		<SelectPrimitive.Root value={props.value} onValueChange={props.onChange}>
			<SelectPrimitive.Trigger asChild>
				<Button>
					<SelectPrimitive.Value />
					<SelectPrimitive.Icon className="ml-2">
						<ChevronDownIcon />
					</SelectPrimitive.Icon>
				</Button>
			</SelectPrimitive.Trigger>
			<SelectPrimitive.Content>
				<SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-neutral-700 dark:text-neutral-300">
					<ChevronUpIcon />
				</SelectPrimitive.ScrollUpButton>
				<SelectPrimitive.Viewport className="bg-white dark:bg-neutral-800 p-1 rounded-lg shadow-lg">
					<SelectPrimitive.Group>
						{props.options.map((option, index) => (
							<SelectPrimitive.Item
								key={`${option}-${index}`}
								value={option.toLowerCase()}
								className={clsx(
									'relative flex items-center px-6 py-2 rounded-md text-sm text-neutral-700 dark:text-neutral-300 font-medium hover:bg-gray-100 dark:hover:bg-neutral-900',
									'radix-disabled:opacity-50',
									'focus:outline-none select-none'
								)}
							>
								<SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
								<SelectPrimitive.ItemIndicator className="inline-flex absolute left-1 items-center">
									<CheckIcon />
								</SelectPrimitive.ItemIndicator>
							</SelectPrimitive.Item>
						))}
					</SelectPrimitive.Group>
				</SelectPrimitive.Viewport>
				<SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-neutral-700 dark:text-neutral-300">
					<ChevronDownIcon />
				</SelectPrimitive.ScrollDownButton>
			</SelectPrimitive.Content>
		</SelectPrimitive.Root>
	);
}
