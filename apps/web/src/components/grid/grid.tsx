interface Props {
  children: React.ReactNode;
}

export function Grid({ children }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-stretch">
      {children}
    </div>
  );
}
