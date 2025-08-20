import CodeBlock from "@/components/code/CodeBlock";
import styles from "@/styles/page.module.css";

const Page = () => {
  return (
    <main className={styles.main}>
      <p className={styles.title}>Server setup</p>
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
            SERVER_REGION=us3
            SERVER_ID=123987
          `}
        />
      </div>
      <div className={styles.gap}></div>
      <div id="server-setup" className={styles.section}>
        <a href="#server-setup">Server setup</a>
        <p>
          If the framework you use doesn&apos;t give you preconfigured route
          handlers like Next JS, you&apos;ll have to create your own server. The
          way we recommend you do this is by using Fastify.
        </p>
        <CodeBlock
          fileName="index.ts"
          code={`
            import Fastify from 'fastify';
            import { createServerStream, createToken } from 'streamthing';

            const fastify = Fastify();
            const PORT = process.env.PORT || 5000;

            fastify.get('/get-streamthing-token', async (request, reply) => {
              // Some sort of auth

              const token = await createToken({
                channel: "main",
                password: process.env.SERVER_PASSWORD,
              });

              reply.send({token});
            });

            fastify.post('/send-event', async (request, reply) => {
              try {
                const { event, message } = request.body;

                // Some sort of auth

                // Create a server stream
                const stream = createServerStream({
                  channel: "main",
                  id: process.env.SERVER_ID,
                  region: process.env.SERVER_REGION,
                  password: process.env.SERVER_PASSWORD,
                });

                // Send message
                await stream.send(event, message);

                return reply.send({ success: true, message: 'Message sent successfully' });
              } catch (error) {
                return reply.status(500).send({ success: false, message: error });
              }
            });

            // Start the server
            const start = async () => {
              try {
                await fastify.listen({ port: PORT });
                console.log(\`Server listening on port ${"${PORT}"}\`);
              } catch (err) {
                fastify.log.error(err);
                process.exit(1);
              }
            };

            start();
          `}
        />
      </div>
    </main>
  );
};
export default Page;
