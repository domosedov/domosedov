import * as React from 'react'
import clsx from 'clsx'

export const Button = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  ({ className, ...restProps }, forwardedRef) => {
    return (
      <button
        ref={forwardedRef}
        className={clsx('h-full w-full p-0 px-2 py-4 font-bold text-white', className)}
        {...restProps}
      />
    )
  },
)

Button.displayName = 'Button'
