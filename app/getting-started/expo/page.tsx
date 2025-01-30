import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <main className={styles.main}>
      <p className={styles.title}>Expo Setup</p>
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
            EXPO_PUBLIC_SERVER_REGION=us3
            EXPO_PUBLIC_SERVER_ID=123987
            EXPO_PUBLIC_SERVER_ENCRYPTION_KEY=super-secure-key
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
        <p>Here is an example app using Expo with a server of your choice</p>
        <CodeBlock
          lang="tsx"
          fileName="index.tsx"
          code={`
            import { useEffect, useState } from 'react';
            import { Text, View, TouchableOpacity } from 'react-native';
            import { createClientStream } from 'streamthing';

            export default function Page() {
              // Initialize state
              const [data, setData] = useState('');

              useEffect(() => {
                // Create client stream
                const stream = createClientStream({
                  channel: 'main',
                  id: process.env.EXPO_PUBLIC_SERVER_ID,
                  password: process.env.EXPO_PUBLIC_SERVER_PASSWORD,
                  region: process.env.EXPO_PUBLIC_SERVER_REGION,
                  encryptionKey: process.env.EXPO_PUBLIC_SERVER_ENCRYPTION_KEY,
                });

                // Create listener
                stream.receive('touch-event', (message) => {
                  // Handle data
                  setData(message);
                });

                return () => {
                  // Disconnect on unmount
                  stream.disconnect();
                };
              }, []);

              // Send event
              const handleTouch = async (touchType) => {
                await fetch("/send-event", {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json"
                  },
                  body: JSON.stringify({
                    event: "touch-event",
                    message: touchType
                  })
                });
              };

              // Render data
              return (
                <View>
                  <Text>Data: {data}</Text>
                  <TouchableOpacity
                    onPress={() => handleTouch('Single Touch')}
                    onLongPress={() => handleTouch('Long Press')}
                  >
                    <Text>Touch Here</Text>
                  </TouchableOpacity>
                </View>
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
