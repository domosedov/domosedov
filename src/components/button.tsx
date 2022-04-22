import * as React from "react";
import clsx from "clsx";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...restProps }, forwardedRef) => {
  return (
    <button
      ref={forwardedRef}
      className={clsx(
        "px-6 py-2 bg-lime-300 rounded hover:bg-cyan-300 duration-500 active:scale-90 active:bg-fuchsia-300",
        className
      )}
      {...restProps}
    />
  );
});

Button.displayName = "Button";
