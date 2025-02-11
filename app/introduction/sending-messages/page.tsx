import ApiReference from "@/components/ApiReference";
import CodeBlock from "@/components/code/CodeBlock";
import Warning from "@/components/Warning";
import styles from "@/styles/page.module.css";

const Page = () => {
  return (
    <main className={styles.main}>
      <p className={styles.title}>Sending messages</p>
      <div id="setting-up" className={styles.section}>
        <a href="#setting-up">Setting up</a>
        <p>Firstly, we&apos;ll initialize our server stream</p>
        <CodeBlock
          code={`
            import { createServerStream } from "streamthing";

            const stream = createServerStream({
              channel: "main",
              id: process.env.SERVER_ID,
              region: process.env.SERVER_REGION,
              password: process.env.SERVER_PASSWORD,
              encryptionKey: process.env.SERVER_ENCRYPTION_KEY,
            });
        `}
        />
      </div>
      <div className={styles.gap}></div>
      <div id="sending-events" className={styles.section}>
        <a href="#sending-events">Sending events</a>
        <p className={styles.description}>
          Each events has an event name and a message.
        </p>
        <CodeBlock
          code={`
              await stream.send(event, message);
          `}
        />
      </div>
      <div className={styles.gap}></div>
      <div id="full-example" className={styles.section}>
        <a href="#full-example">Full example</a>
        <CodeBlock
          code={`
            import { createServerStream } from "streamthing";

            const stream = createServerStream({
              channel: "main",
              id: process.env.SERVER_ID,
              region: process.env.SERVER_REGION,
              password: process.env.SERVER_PASSWORD,
              encryptionKey: process.env.SERVER_ENCRYPTION_KEY,
            });

            async function sendEvent() {
              await stream.send(event, message);
            }

            sendEvent()
          `}
        />
      </div>
      <Warning>
        When using <span>encryptionKey</span> on the server to encrypt messages,
        the same key must also be used in the client in order to decrypt them on
        the client.
      </Warning>
      <hr id={styles.separator} />
      <ApiReference
        id="server-stream"
        methodFunction="Server stream"
        methods={[
          {
            name: "send",
            meaning: "Used to send events to the client",
          },
        ]}
      />
    </main>
  );
};

export default Page;
