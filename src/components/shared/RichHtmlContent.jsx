import { cn } from "@/lib/utils";

const richTextChildStyles =
  "[&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_a]:underline [&_strong]:font-semibold [&_em]:italic [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-[#E5E5E5] [&_blockquote]:pl-4 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_img]:my-4 [&_img]:max-h-[400px] [&_img]:w-auto [&_img]:max-w-full [&_img]:rounded-md [&_*]:max-w-full";

/**
 * Renders CMS/API HTML (e.g. `<p>...</p>`). Content is trusted server/CMS output.
 */
export default function RichHtmlContent({ html, className }) {
  if (!html || typeof html !== "string") return null;
  return (
    <div
      className={cn(richTextChildStyles, className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
