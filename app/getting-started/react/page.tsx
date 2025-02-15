import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <main className={styles.main}>
      <p className={styles.title}>React Setup</p>
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
            REACT_APP_SERVER_REGION=us3
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
        <p>Here is a full example app using React with Express server</p>
        <CodeBlock
          lang="tsx"
          fileName="src/App.tsx"
          code={`
            import { useEffect, useState } from "react";
            import { createClientStream, ClientStream } from "streamthing";

            export default function App() {
              // Initialize state
              const [data, setData] = useState<string>("");

              useEffect(() => {
                let stream: ClientStream | null = null;

                // Create client stream
                (async () => {
                  stream = await createClientStream(process.env.REACT_APP_SERVER_REGION);

                  // Get token from server
                  const res = await fetch("/api/get-token?id=" + stream.id);
                  const { token } = await res.json();

                  // Authenticate stream
                  stream.authenticate(token);

                  // Create listener
                  stream.receive("keyboard-event", (message) => {
                    setData(message);
                  });
                })();

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

                // Cleanup
                return () => {
                  stream?.disconnect();
                };
              }, []);

              return (
                <div>
                  <p>{data}</p>
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
