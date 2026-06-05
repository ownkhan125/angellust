import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class names with conflict resolution.
 * Standard shadcn/ui utility — used everywhere for conditional class composition.
 */
export const cn = (...inputs) => twMerge(clsx(inputs))
