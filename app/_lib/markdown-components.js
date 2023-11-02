import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { zTouch } from "react-syntax-highlighter/dist/cjs/styles/prism";


export const customMDComponents = {
  img(img) {
    return (
      <Image
        src={img.src}
        width={640}
        height={300}
        alt={data.title}
        layout="responsive"
      />
    );
  },
  p(paragraph) {
    return <p>{paragraph.children}</p>;
  },
  code(code) {
    const { className, children } = code;
    const language = className.split("-")[1];
    return (
      <SyntaxHighlighter style={zTouch} language={language}>
        {children}
      </SyntaxHighlighter>
    );
  },
};