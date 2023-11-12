import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import zTouch from "react-syntax-highlighter/dist/cjs/styles/prism/z-touch";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsExtras from "react-syntax-highlighter/dist/esm/languages/prism/js-extras";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("jsExtras", jsExtras);

export const customMDComponents = {
  img(img) {
    return <Image src={img.src} width={640} height={300} alt={img.alt} />;
  },
  p(paragraph) {
    return <p>{paragraph.children}</p>;
  },
  code(code) {
    const { className, children } = code;
    const language = className ? className.split("-")[1] : 'js';
    return (
      <SyntaxHighlighter style={zTouch} language={language}>
        {children}
      </SyntaxHighlighter>
    );
  },
};