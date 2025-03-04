interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return <h2 className="text-xl font-semibold mb-4 text-textDark">{title}</h2>;
};

export default SectionTitle;
