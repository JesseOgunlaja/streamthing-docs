import ApiReference from "@/components/ApiReference";
import CodeBlock from "@/components/code/CodeBlock";
import Warning from "@/components/Warning";
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
            SERVER_ENCRYPTION_KEY=super-secure-key
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
          The <span>createClientStream</span> function takes an object of
          arguments. The <span>id</span> and <span>region</span> values are used
          to identify the server. The <span>channel</span> is used to identify a
          certain group of messages all related to something e.g
          &quot;chat-123&quot;. Lastly, the optional <span>encryptionKey</span>{" "}
          is used to decrypt the messages sent to the channel, making sure all
          messages received are coming from your server.
        </p>
        <CodeBlock
          code={`
            import { createClientStream } from "streamthing";

            const stream = createClientStream({
              id: process.env.SERVER_ID,
              region: process.env.SERVER_REGION,
              password: process.env.SERVER_PASSWORD,
              channel: "main",
              encryptionKey: process.env.SERVER_ENCRYPTION_KEY,
            });
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
          server Lastly, the optional <span>encryptionKey</span> is used to
          encrypt the channel name as well as all messages sent to the channel
          ensuring privacy.
        </p>
        <CodeBlock
          code={`
            import { createServerStream } from "streamthing";

            const stream = createServerStream({
              id: process.env.SERVER_ID,
              region: process.env.SERVER_REGION,
              password: process.env.SERVER_PASSWORD,
              channel: "main",
              encryptionKey: process.env.SERVER_ENCRYPTION_KEY,
            });
          `}
        />
        <Warning>
          When using <span>encryptionKey</span> on the server to encrypt
          messages, the same key must also be used in the client in order to
          decrypt them on the client.
        </Warning>
      </div>
      <hr id={styles.separator} />
      <ApiReference
        id="create-client-stream"
        methodFunction="createClientStream()"
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
          {
            name: "encryptionKey",
            meaning:
              "OPTIONAL: String. Used to decrypt messages sent from the server.",
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
          {
            name: "encryptionKey",
            meaning:
              "OPTIONAL: String. Used to decrypt messages sent from the server.",
          },
          {
            name: "receiving",
            meaning:
              "OPTIONAL: Boolean. Enables server stream to listen for messages when set to true.",
          },
        ]}
      />
    </main>
  );
}
