import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";

const Page = () => {
  return (
    <main className={styles.main}>
      <p className={styles.title}>Next JS Setup</p>
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
            SERVER_PASSWORD=abc123
            NEXT_PUBLIC_SERVER_REGION=us3
            NEXT_PUBLIC_SERVER_ID=123987
            NEXT_PUBLIC_SERVER_ENCRYPTION_KEY=super-secure-key
          `}
        />
      </div>
      <div className={styles.gap}></div>
      <div id="server-setup" className={styles.section}>
        <a href="#server-setup">Server setup</a>
        <p>
          When using Next JS you can setup your server with either server
          actions or Next JS route handlers
        </p>
        <CodeBlock
          fileName="actions/send-message.ts"
          code={`
            "use server";

            import { createServerStream } from "streamthing";

            export async function sendEvent(event: string, message: string) {
              try {
                // Some sort of auth

                // Create a server stream
                const stream = createServerStream({
                  channel: "main",
                  id: process.env.NEXT_PUBLIC_SERVER_ID,
                  region: process.env.NEXT_PUBLIC_SERVER_REGION,
                  password: process.env.SERVER_PASSWORD,
                  encryptionKey: process.env.NEXT_PUBLIC_SERVER_ENCRYPTION_KEY,
                });

                // Send the event and message
                await stream.send(event, message);

                return {
                  success: true,
                  message: "Successfully sent message"
                }
              }
              catch(error) {
                return {
                  success: false,
                  message: error,
                }
              }
            }
          `}
        />
        OR
        <CodeBlock
          fileName="api/send-message/route.ts"
          code={`
          import { NextRequest, NextResponse } from 'next/server';
          import { createServerStream } from 'streamthing';

          export async function POST(request: NextRequest) {
            try {
              // Parse the request body
              const { event, message } = await request.json();

              // Some sort of auth (implement your authentication logic here)

              // Create a server stream
              const stream = createServerStream({
                channel: "main",
                id: process.env.NEXT_PUBLIC_SERVER_ID,
                region: process.env.NEXT_PUBLIC_SERVER_REGION,
                password: process.env.SERVER_PASSWORD,
                encryptionKey: process.env.NEXT_PUBLIC_SERVER_ENCRYPTION_KEY,
              });

              // Send the event and message
              await stream.send(event, message);

              // Return a success response
              return NextResponse.json({ success: true, message: 'Event sent successfully' });
            } catch (error) {
              return NextResponse.json({ success: false, error }, { status: 500 });
            }
          }
          `}
        />
      </div>

      <div className={styles.gap}></div>
      <div id="full-example" className={styles.section}>
        <a href="#full-example">Full example</a>
        <p>Here is a full example app using Next JS</p>
        <CodeBlock
          lang="tsx"
          fileName="app/index.tsx"
          code={`
            "use client"

            import { useEffect, useState } from "react";
            import { createClientStream } from "streamthing";

            export default function Page() {
              // Initialize state
              const [data, setData] = useState<string>("");

              useEffect(() => {
                // Create client stream
                const stream = createClientStream({
                  channel: "main",
                  id: process.env.NEXT_PUBLIC_SERVER_ID,
                  password: process.env.NEXT_PUBLIC_SERVER_PASSWORD,
                  region: process.env.NEXT_PUBLIC_SERVER_REGION,
                  encryptionKey: process.env.NEXT_PUBLIC_SERVER_ENCRYPTION_KEY,
                });

                // Create listener
                stream.receive("keyboard-event", (message) => {
                  // Handle data
                  setData(message);
                });

                // Send event
                window.onkeydown = async (e) => {
                  await sendEvent("keyboard-event", e.key);

                  // OR

                  await fetch("/send-event", {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                      event: "keyboard-event",
                      message: e.key
                    })
                  })
                };

                return () => {
                  // Disconnect on unmount
                  stream.disconnect();
                };
              }, []);

              // Render data
              return (
                <div>
                  <p>Data: {data}</p>
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
