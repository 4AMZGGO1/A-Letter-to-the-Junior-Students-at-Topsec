import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownReaderProps = {
  content: string;
};

export function MarkdownReader({ content }: MarkdownReaderProps) {
  return (
    <section className="markdown-reader min-h-screen overflow-y-auto bg-[#f6f8fb] px-5 py-20 text-slate-900 sm:px-8 lg:px-10">
      <article className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white px-5 py-8 shadow-panel sm:px-10 sm:py-12 lg:px-14">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </section>
  );
}
