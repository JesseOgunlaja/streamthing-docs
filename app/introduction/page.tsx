import ApiReference from "@/components/ApiReference";
import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.section} id="variables">
        <a href="#variables">Variables</a>
        <p>
          These are yor variables typically stored in environment variables.
        </p>
        <CodeBlock
          lang="dotenv"
          fileName=".env"
          code={`
            SERVER_REGION=us3
            SERVER_PASSWORD=abc123
            SERVER_ID=123987
          `}
        />
      </div>
      <div className={styles.gap}></div>
      <div className={styles.section} id="client-stream">
        <a href="#client-stream" className={styles.section}>
          Client Stream
        </a>
        <p>
          On your client/page, add this code in order to receive events from the
          server.
        </p>
        <div className={styles.gap}></div>
        <p className={styles.description}>
          The <span>createClientStream</span> function takes a{" "}
          <span>region</span> value used to identify which server to hit. It
          returns multiple functions one of which is the{" "}
          <span>authenticate</span> function which takes a token as an argument
          and is used to authenticate the client.
        </p>
        <CodeBlock
          code={`
            import { createClientStream } from "streamthing";

            const stream = await createClientStream(process.env.SERVER_REGION);
            const res = await fetch("/api/get-streamthing-token?id=" + stream.id);
            const data = await res.json();
            stream.authenticate(data.token);
          `}
        />
      </div>
      <div className={styles.gap}></div>
      <div className={styles.section} id="server-stream">
        <a href="#server-stream" className={styles.section}>
          Server Stream
        </a>
        <p>
          On your server/API endpoint, add this code in order to send events to
          the client.
        </p>
        <div className={styles.gap}></div>
        <p className={styles.description}>
          The <span>createServerStream</span> function takes an object of
          arguments. The <span>id</span> and <span>region</span> values are used
          to identify the server. The <span>channel</span> is used to identify a
          certain group of messages all related to something e.g
          &quot;chat-123&quot;. The <span>password</span> value is used to
          authenticate requests to make a server stream and send messages to the
          server.
        </p>
        <CodeBlock
          code={`
            import { createServerStream } from "streamthing";

            const stream = createServerStream({
              id: process.env.SERVER_ID,
              region: process.env.SERVER_REGION,
              password: process.env.SERVER_PASSWORD,
              channel: "main",
            });
          `}
        />
      </div>
      <hr id={styles.separator} />
      <ApiReference
        id="create-client-stream"
        methodFunction="createClientStream()"
        methods={[
          {
            name: "region",
            meaning: "String. Used to identify which cluster the server is in",
          },
        ]}
      />
      <div className={styles.gap}></div>
      <div className={styles.gap}></div>
      <ApiReference
        id="create-server-stream"
        methodFunction="createServerStream()"
        methods={[
          {
            name: "id",
            meaning: "String. To identify the server",
          },
          {
            name: "region",
            meaning: "String. Used to identify which cluster the server is in",
          },
          {
            name: "password",
            meaning:
              "String. Used to authenticate all requests to send messages to the stream",
          },
          {
            name: "channel",
            meaning:
              "String. Used to store a group of messages all relating to each other",
          },
        ]}
      />
    </main>
  );
}
