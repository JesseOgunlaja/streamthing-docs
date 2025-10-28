"use cache";

import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";

const Page = async () => {
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
          `}
				/>
			</div>
			<div className={styles.gap}></div>
			<div id="server-setup" className={styles.section}>
				<a href="#server-setup">Server setup</a>
				<p>
					When using Next JS you can setup your server with either server
					actions or Next JS route handlers. In the example we&apos;ll be using
					server actions
				</p>
				<CodeBlock
					fileName="actions/streamthing.ts"
					code={`
            "use server";

            import { createServerStream } from "streamthing";

            export async function sendEvent(event: string, message: string) {
                // Some sort of auth (determine channel from auth)
                const channel = "user-123";

                // Create a server stream
                const stream = createServerStream({
                  id: process.env.NEXT_PUBLIC_SERVER_ID,
                  region: process.env.NEXT_PUBLIC_SERVER_REGION,
                  password: process.env.SERVER_PASSWORD,
                });

                // Send the message
                await stream.send(channel, event, message);

                return {
                  success: true,
                  message: "Successfully sent message"
                }
            }

            export async function getToken() {
              // Some sort of auth

              const token = await createToken({
                channel: "main",
                password: process.env.SERVER_PASSWORD,
              });

              return token;
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
            import { getToken, sendEvent } from "./actions/streamthing";
            import { createClientStream, ClientStream } from "streamthing";

            export default function Page() {
              // Initialize state
              const [data, setData] = useState<string>("");

              useEffect(() => {
                let stream: ClientStream | null = null;
                // Create client stream
                (async () => {
                  const token = await getToken();

                  stream = createClientStream({
                    region: process.env.NEXT_PUBLIC_SERVER_REGION,
                    id: process.env.NEXT_PUBLIC_SERVER_ID,
                    token,
                  });

                  // Create listener
                  stream.receive("keyboard-event", (message) => {
                    // Handle data
                    setData(message);
                  });
                })();

                // Send message
                window.onkeydown = async (e) => {
                  await sendEvent("keyboard-event", e.key);
                };

                return () => {
                  // Disconnect on unmount
                  stream?.disconnect();
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
