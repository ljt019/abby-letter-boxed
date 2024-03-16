type CircleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function Circle({ children, className, style }: CircleProps) {
  const circleClasses = `w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-white ${className}`;

  return (
    <div className={circleClasses} style={style}>
      {children}
    </div>
  );
}
