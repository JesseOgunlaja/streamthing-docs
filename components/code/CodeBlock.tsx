import styles from "@/styles/page.module.css";
import sh from "prettier-plugin-sh";
import esTree from "prettier/plugins/estree";
import html from "prettier/plugins/html";
import ts from "prettier/plugins/typescript";
import prettier from "prettier/standalone";
import { codeToHtml } from "shiki";
import CodeBlockContent from "./CodeBlockContent";
import CopyCodeBlock from "./CopyCodeBlock";

interface PropsType {
  code: string;
  lang?: string;
  fileName?: string;
}

const languagesToFormat = [
  "jsx",
  "tsx",
  "javascript",
  "typescript",
  "dotenv",
  "html",
];

const CodeBlock = async ({
  code,
  lang = "javascript",
  fileName,
}: PropsType) => {
  const formattedCode = languagesToFormat.includes(lang)
    ? await prettier.format(code, {
        parser:
          lang === "dotenv" ? "sh" : lang === "html" ? "html" : "typescript",
        plugins: [esTree, sh, ts, html],
      })
    : code;

  const lightHtml = await codeToHtml(formattedCode.trim(), {
    lang: lang,
    theme: `github-light`,
  });

  const darkHtml = await codeToHtml(formattedCode.trim(), {
    lang: lang,
    theme: `github-dark`,
  });

  return (
    <div className={styles.code}>
      {fileName && <p className={styles.fileName}>{fileName}</p>}

      <CodeBlockContent lightHtml={lightHtml} darkHtml={darkHtml} />
      <CopyCodeBlock formattedCode={code} />
    </div>
  );
};

export default CodeBlock;
