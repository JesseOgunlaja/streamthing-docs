"use cache";

import ApiReference from "@/components/ApiReference";
import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";

const Page = async () => {
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
              id: process.env.SERVER_ID,
              region: process.env.SERVER_REGION,
              password: process.env.SERVER_PASSWORD,
            });
        `}
				/>
			</div>
			<div className={styles.gap}></div>
			<div id="sending-events" className={styles.section}>
				<a href="#sending-events">Sending events</a>
				<p className={styles.description}>
					Each message we send needs a channel and an event name.
				</p>
				<CodeBlock
					code={`
              await stream.send(channel, event, message);
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
              id: process.env.SERVER_ID,
              region: process.env.SERVER_REGION,
              password: process.env.SERVER_PASSWORD,
            });

            async function sendEvent() {
              await stream.send(channel, event, message);
            }

            sendEvent()
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
						meaning: "Used to send events to the client",
					},
				]}
			/>
		</main>
	);
};

export default Page;
