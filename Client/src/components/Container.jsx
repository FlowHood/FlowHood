export function Container({
    as: Component = "div",
    className = "",
    children,
    ...props
  }) {
    return (
      <Component
        className={`mx-auto w-full max-w-7xl px-4 md:p-6 lg:px-8 ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
  