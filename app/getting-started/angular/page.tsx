import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <main className={styles.main}>
      <p className={styles.title}>Angular</p>
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
            NG_APP_SERVER_REGION=us3
            NG_APP_SERVER_ID=123987
            NG_APP_SERVER_ENCRYPTION_KEY=super-secure-key
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
        <p>Here is an example app using Angular with a server of your choice</p>
        <CodeBlock
          lang="tsx"
          fileName="page.component.ts"
          code={`
            import { Component, OnInit, OnDestroy } from '@angular/core';
            import { createClientStream } from 'streamthing';
            import { environment } from '../environments/environment';

            @Component({
              selector: 'app-page',
              template: \`<div><p>Data: {{ data }}</p></div>\`
            })
            export class PageComponent implements OnInit, OnDestroy {
              data = '';

              private stream: ClientStreamType; // Replace with the actual type
              private handleKeyDown = async (e: KeyboardEvent) => {
                try {
                  await fetch('/send-event', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ event: 'keyboard-event', message: e.key }),
                  });
                } catch (error) {
                  console.error('Failed to send event:', error);
                }
              };

              ngOnInit() {
                this.stream = createClientStream({
                  channel: 'main',
                  id: environment.serverId,
                  password: environment.serverPassword,
                  region: environment.serverRegion,
                  encryptionKey: environment.serverEncryptionKey,
                });

                this.stream.receive('keyboard-event', (message) => {
                  this.data = message;
                });

                window.addEventListener('keydown', this.handleKeyDown);
              }

              ngOnDestroy() {
                window.removeEventListener('keydown', this.handleKeyDown);
                this.stream.disconnect();
              }
            }
        `}
        />
      </div>
      <div className={styles.gap}></div>
    </main>
  );
};
export default Page;
