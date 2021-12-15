import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IProps {
  children: any;
  className?: string;
}

export default function MDParser({ children, className = "" }: IProps) {
  return (
    <ReactMarkdown
      className={`max-w-full prose prose-sm text-gray-600 prose-blue ${className}`}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
}
