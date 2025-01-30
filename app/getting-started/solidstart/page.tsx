import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <main className={styles.main}>
      <p className={styles.title}>SolidStart Setup</p>
      <div id="setting-up" className={styles.section}>
        <a href="#setting-up">Setting up</a>
        <p>Install package</p>
        <CodeBlock lang="cmd" code={`npm install streamthing`} />
        <div className={styles.gap}></div>
        <p>Environment variables</p>
        <CodeBlock
          lang="dotenv"
          fileName=".env"
          code={`
            VITE_SERVER_REGION=us3
            VITE_SERVER_ID=123987
            VITE_SERVER_ENCRYPTION_KEY=super-secure-key
          `}
        />
      </div>
      <div className={styles.gap}></div>
      <div id="server-setup" className={styles.section}>
        <a href="#server-setup">Server setup</a>
        <p>You&apos;ll need to create your own server.</p>
        <Link
          className={styles.externalLink}
          href="/getting-started/server-setup"
        >
          Server setup <ExternalLink />
        </Link>
      </div>

      <div id="full-example" className={styles.section}>
        <a href="#full-example">Full example</a>
        <p>
          Here is an example app using SolidStart with a server of your choice
        </p>
        <CodeBlock
          lang="tsx"
          fileName="index.tsx"
          code={`
            import { createSignal, onCleanup, onMount } from "solid-js";
            import { createClientStream } from "streamthing";

            export default function Page() {
              // Initialize state
              const [data, setData] = createSignal("");

              onMount(() => {
                // Create client stream
                const stream = createClientStream({
                  channel: "main",
                  id: import.meta.env.VITE_SERVER_ID,
                  password: import.meta.env.VITE_SERVER_PASSWORD,
                  region: import.meta.env.VITE_SERVER_REGION,
                  encryptionKey: import.meta.env.VITE_SERVER_ENCRYPTION_KEY,
                });

                // Create listener
                stream.receive("keyboard-event", (message) => {
                  // Handle data
                  setData(message);
                });

                // Send event
                window.onkeydown = async (e) => {
                  await fetch("/send-event", {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                      event: "keyboard-event",
                      message: e.key,
                    }),
                  });
                };

                onCleanup(() => {
                  // Disconnect on unmount
                  stream.disconnect();
                });
              });

              // Render data
              return (
                <div>
                  <p>Data: {data()}</p>
                </div>
              );
            }
        `}
        />
      </div>
      <div className={styles.gap}></div>
    </main>
  );
};
export default Page;
