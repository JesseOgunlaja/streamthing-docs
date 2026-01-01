import esTree from "prettier/plugins/estree";
import html from "prettier/plugins/html";
import ts from "prettier/plugins/typescript";
import prettier from "prettier/standalone";
// import sh from "prettier-plugin-sh";
import styles from "@/styles/page.module.css";
import { codeToHtml } from "shiki";
import CodeBlockContent from "./CodeBlockContent";
import CopyCodeBlock from "./CopyCodeBlock";

interface PropsType {
    code: string;
    lang?: string;
    fileName?: string;
}

const languagesToFormat = ["jsx", "tsx", "javascript", "typescript", "html"];

function dedent(code: string) {
    const lines = code.replace(/\t/g, "  ").split("\n");

    const indents = lines
        .filter((line) => line.trim().length > 0)
        .map((line) => line.match(/^ */)![0].length);

    const minIndent = Math.min(...indents, Infinity);

    return lines
        .map((line) => line.slice(minIndent))
        .join("\n")
        .trimEnd();
}

const CodeBlock = async ({
    code,
    lang = "javascript",
    fileName,
}: PropsType) => {
    const formattedCode = languagesToFormat.includes(lang)
        ? await prettier.format(code, {
              parser: lang === "html" ? "html" : "typescript",
              plugins: [esTree, ts, html],
          })
        : dedent(code);

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
