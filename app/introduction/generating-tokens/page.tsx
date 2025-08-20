import ApiReference from "@/components/ApiReference";
import CodeBlock from "@/components/code/CodeBlock";
import Warning from "@/components/Warning";
import styles from "@/styles/page.module.css";

const Page = () => {
  return (
    <main className={styles.main}>
      <p className={styles.title}>Generating tokens</p>
      <div id="creating-tokens" className={styles.section}>
        <a href="#creating-tokens">Creating tokens</a>
        <p>
          To create a token use the <span>createToken</span> function
        </p>
        <CodeBlock
          code={`
            import { createToken } from "streamthing";

            const token = await createToken(
              {
                id: process.env.SERVER_ID ,
                channel: "main",
                password: process.env.SERVER_PASSWORD ,
                socketId
              },
            );
            return token;
        `}
        />
      </div>
      <div className={styles.gap}></div>
      <Warning text="Generating tokens should only ever happen on the server to avoid leaking sensitive information to the client" />
      <div id="full-example" className={styles.section}>
        <a href="#full-example">Full example</a>
        <CodeBlock
          code={`
            import { createToken } from "streamthing";

            // api/get-streamthing-token
            const token = await createToken(
              {
                id: process.env.SERVER_ID,
                channel: "main",
                password: process.env.SERVER_PASSWORD,
                socketId,
              }
            );
            return token;

            // Somewhere on the client
            const stream = await createClientStream(process.env.SERVER_REGION);
            const res = await fetch("/api/get-streamthing-token?id=" + stream.id);
            const data = await res.json();
          `}
        />
      </div>
      <hr id={styles.separator} />
      <ApiReference
        id="create-token"
        methodFunction="createToken()"
        methods={[
          {
            name: "id",
            meaning: "String. The server ID used to create the token",
          },
          { name: "channel", meaning: "String. The desired channel" },
          {
            name: "socketId",
            meaning: "String. The socket ID used to create the token",
          },
          {
            name: "password",
            meaning: "String. The server password used to create the token",
          },
        ]}
      />
    </main>
  );
};

export default Page;
