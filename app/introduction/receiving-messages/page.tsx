import ApiReference from "@/components/ApiReference";
import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";

const Page = () => {
  return (
    <main className={styles.main}>
      <p className={styles.title}>Receiving messages</p>
      <div id="setting-up" className={styles.section}>
        <a href="#setting-up">Setting up</a>
        <p>Firstly, we&apos;ll initialize our client stream</p>
        <CodeBlock
          code={`
            import { createClientStream } from "streamthing";

            const stream = await createClientStream(process.env.SERVER_REGION);
        `}
        />
      </div>
      <div className={styles.gap}></div>
      <div id="creating-listeners" className={styles.section}>
        <a href="#creating-listeners">Creating listeners</a>
        <p className={styles.description}>
          Each listener, takes an event name and a <span>callback</span>, which
          will receive the event data.
        </p>
        <CodeBlock
          code={`
            stream.receive("event", callback);
          `}
        />
      </div>
      <div className={styles.gap}></div>
      <div id="accepting-messages" className={styles.section}>
        <a href="accepting-messages">Accepting messages</a>
        <p className={styles.description}>
          To accept messages simply pass a callback, which takes a message
          parameter, to the <span>receive</span> method.
        </p>
        <CodeBlock
          code={`
            stream.receive("event", (message) => {
              // Use message in any way
              console.log(message);
            });
          `}
        />
      </div>
      <div className={styles.gap}></div>
      <div id="full-example" className={styles.section}>
        <a href="#full-example">Full example</a>
        <CodeBlock
          code={`
            import { createClientStream } from "streamthing";

            async function setupStream() {
              const stream = await createClientStream(process.env.SERVER_REGION);
              const res = await fetch("/api/get-streamthing-token?id=" + stream.id);
              const data = await res.json();
              stream.authenticate(data.token);
              stream.receive("event", (message) => {
                console.log(message);
              });

              stream.disconnect() // Make sure to disconnect in order to avoid hanging connections
            }

            setupStream();

          `}
        />
      </div>
      <hr id={styles.separator} />
      <ApiReference
        id="client-stream"
        methodFunction="Client stream"
        methods={[
          { name: "id", meaning: "String. Stores the socket ID" },
          {
            name: "authenticate(token)",
            meaning: "Used to authenticate the client",
          },
          {
            name: "receive(event, callback)",
            meaning: "Used to receive events from the server",
          },
          {
            name: "disconnect()",
            meaning:
              "Used to disconnect from the server, to avoid hanging connections",
          },
        ]}
      />
    </main>
  );
};

export default Page;
