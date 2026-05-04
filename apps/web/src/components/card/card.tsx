interface Props {
  children: React.ReactNode;
  className?: string;
}

function Section({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}

export function Card({ children }: Props) {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-md p-5 hover:-translate-y-1 transition-transform">
      {children}
    </div>
  );
}

Card.Header = Section;
Card.Body = Section;
Card.Footer = Section;
