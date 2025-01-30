import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <main className={styles.main}>
      <p className={styles.title}>SvelteKit Setup</p>
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
            SERVER_REGION=us3
            SERVER_ID=123987
            SERVER_ENCRYPTION_KEY=super-secure-key
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
          Here is an example app using SvelteKit with a server of your choice
        </p>
        <CodeBlock
          lang="html"
          fileName="page.svelte"
          code={`
            <script lang="ts">
              import { onMount } from 'svelte';
              import { writable } from 'svelte/store';
              import { createClientStream } from 'streamthing';

              // Initialize state
              const data = writable('');

              onMount(() => {
                // Create client stream
                const stream = createClientStream({
                  channel: 'main',
                  id: process.env.SERVER_ID,
                  password: process.env.SERVER_PASSWORD,
                  region: process.env.SERVER_REGION,
                  encryptionKey: process.env.SERVER_ENCRYPTION_KEY,
                });

                // Create listener
                stream.receive('keyboard-event', (message) => {
                  // Handle data
                  data.set(message);
                });

                // Send event
                window.onkeydown = async (e) => {
                  await fetch("/send-event", {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                      event: "keyboard-event",
                      message: e.key
                    }),
                  });
                };

                return () => {
                  // Disconnect on unmount
                  stream.disconnect();
                };
              });
          </script>

          <div>
            <p>Data {$data}</p>
          </div>
        `}
        />
      </div>
      <div className={styles.gap}></div>
    </main>
  );
};
export default Page;
