"use cache";

import ApiReference from "@/components/ApiReference";
import CodeBlock from "@/components/code/CodeBlock";
import Warning from "@/components/Warning";
import styles from "@/styles/page.module.css";

const Page = async () => {
	return (
		<main className={styles.main}>
			<p className={styles.title}>Generating tokens</p>
			<div id="creating-tokens" className={styles.section}>
				<a href="#creating-tokens">Creating tokens</a>
				<p>
					To create a token use the <span>createToken</span> function
				</p>
				<CodeBlock
					code={`
            import { createToken } from "streamthing";

            const token = await createToken(
              {
                channel: "main",
                password: process.env.SERVER_PASSWORD,
              },
            );
            return token;
        `}
				/>
			</div>
			<div className={styles.gap}></div>
			<Warning text="Generating tokens should only ever happen on the server to avoid leaking sensitive information to the client" />
			<div id="full-example" className={styles.section}>
				<a href="#full-example">Full example</a>
				<CodeBlock
					code={`
            import { createToken } from "streamthing";

            // api/get-streamthing-token
            const token = await createToken(
              {
                channel: "main",
                password: process.env.SERVER_PASSWORD,
              }
            );
            return token;

            // Somewhere on the client
            const res = await fetch("/api/get-streamthing-token");
            const data = await res.json();

            const stream = createClientStream({
              region: process.env.SERVER_REGION,
              id: process.env.SERVER_ID,
              token: data.token,
            });
          `}
				/>
			</div>
			<hr id={styles.separator} />
			<ApiReference
				id="create-token"
				methodFunction="createToken()"
				methods={[
					{ name: "channel", meaning: "The desired channel" },
					{
						name: "password",
						meaning: "The server password used to create the token",
					},
				]}
			/>
		</main>
	);
};

export default Page;
