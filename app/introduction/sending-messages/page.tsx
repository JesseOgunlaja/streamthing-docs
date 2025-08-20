import ApiReference from "@/components/ApiReference";
import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";

const Page = () => {
  return (
    <main className={styles.main}>
      <p className={styles.title}>Sending messages</p>

      <div id="setting-up" className={styles.section}>
        <a href="#setting-up">Setting up</a>
        <p>First, let&apos;s initialize both server and client streams:</p>

        <CodeBlock
          code={`
                import { createServerStream, createClientStream } from "streamthing";

                // Server stream (server-side only)
                const serverStream = createServerStream({
                  channel: "main",
                  id: process.env.SERVER_ID,
                  region: process.env.SERVER_REGION,
                  password: process.env.SERVER_PASSWORD,
                });

                // Client stream (client-side)
                const clientStream = await createClientStream(process.env.SERVER_REGION);
                clientStream.authenticate(await getToken(clientStream.id)); // Get token from server
          `}
        />
      </div>

      <div className={styles.gap}></div>

      <div id="sending-events" className={styles.section}>
        <a href="#sending-events">Sending events</a>
        <p>
          Events consist of a name and a message. You can send them from both
          server and client.
        </p>

        <CodeBlock
          code={`
              // Server-side
              await serverStream.send("chatMessage", "Hello from server!");

              // Client-side
              clientStream.send("chatMessage", "Hello from client!");
          `}
        />
      </div>

      <div className={styles.gap}></div>

      <div id="full-example" className={styles.section}>
        <a href="#full-example">Full example</a>
        <CodeBlock
          code={`
            import { createServerStream, createClientStream } from "streamthing";

            // Server stream
            const serverStream = createServerStream({
              channel: "main",
              id: process.env.SERVER_ID,
              region: process.env.SERVER_REGION,
              password: process.env.SERVER_PASSWORD,
            });

            // Client stream
            const clientStream = await createClientStream(process.env.SERVER_REGION);
            clientStream.authenticate(await getToken(clientStream.id)); // Get token from server

            // Sending events
            await serverStream.send("chatMessage", "Hello from server!");
            clientStream.send("chatMessage", "Hello from client!");
          `}
        />
      </div>

      <hr id={styles.separator} />

      <ApiReference
        id="server-stream"
        methodFunction="Server stream"
        methods={[
          {
            name: "send",
            meaning: "Used to send events to the server or clients",
          },
        ]}
      />
      <br />
      <ApiReference
        id="client-stream"
        methodFunction="Client stream"
        methods={[
          {
            name: "send",
            meaning: "Used to send events to the server or clients",
          },
          {
            name: "receive",
            meaning: "Listen to events sent from the server",
          },
          {
            name: "authenticate",
            meaning: "Authenticate the client stream using a JWT token",
          },
        ]}
      />
    </main>
  );
};

export default Page;
