import createDOMPurify from "dompurify";
import { marked } from "marked";

export type MDPreviewProps = {
  value?: string;
};

export const MDPreview = ({ value = "" }: MDPreviewProps) => {
  return (
    <div
      className="p-2 w-full prose prose-indigo"
      dangerouslySetInnerHTML={{
        __html: createDOMPurify(window).sanitize(marked.parse(value)),
      }}
    />
  );
};
