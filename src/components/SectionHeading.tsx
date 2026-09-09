interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <p className="text-brand-teal text-xs font-bold uppercase tracking-[0.25em] mb-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white tracking-tight">
        {title}
      </h2>
    </div>
  );
}
