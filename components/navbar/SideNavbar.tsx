import styles from "@/styles/navbar/side-navbar.module.css";
import NavbarLink from "./NavbarLink";

const SideNavbar = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <p>Introduction</p>
          <div>
            <NavbarLink
              sections={[
                { name: "Variables", link: "#variables" },
                { name: "Client Stream", link: "#client-stream" },
                { name: "Server Stream", link: "#server-stream" },
                { name: "Create Client Stream", link: "#create-client-stream" },
                { name: "Create Server Stream", link: "#create-server-stream" },
              ]}
              href="/introduction"
              rewrite="/"
            >
              Introduction
            </NavbarLink>
            <NavbarLink
              sections={[
                { name: "Setting up", link: "#setting-up" },
                { name: "Creating listeners", link: "#creating-listeners" },
                { name: "Accepting messages", link: "#accepting-messages" },
                { name: "Full example", link: "#full-example" },
                { name: "Client Stream", link: "#client-stream" },
              ]}
              href="/introduction/receiving-messages"
            >
              Receiving messages
            </NavbarLink>
            <NavbarLink
              sections={[
                { name: "Setting up", link: "#setting-up" },
                { name: "Sending events", link: "#sending-events" },
                { name: "Full example", link: "#full-example" },
                { name: "Server Stream", link: "#server-stream" },
              ]}
              href="/introduction/sending-messages"
            >
              Sending messages
            </NavbarLink>
          </div>
        </li>
        <li>
          <p>Getting started</p>
          <div>
            <NavbarLink
              sections={[
                { name: "Setting up", link: "#setting-up" },
                { name: "Server setup", link: "#server-setup" },
              ]}
              href="/getting-started/server-setup"
            >
              Server setup
            </NavbarLink>
            <NavbarLink
              sections={[
                { name: "Setting up", link: "#setting-up" },
                { name: "Server setup", link: "#server-setup" },
                { name: "Full example", link: "#full-example" },
              ]}
              href="/getting-started/react"
            >
              React
            </NavbarLink>
            <NavbarLink
              sections={[
                { name: "Setting up", link: "#setting-up" },
                { name: "Server setup", link: "#server-setup" },
                { name: "Full example", link: "#full-example" },
              ]}
              href="/getting-started/next"
            >
              Next JS
            </NavbarLink>
            <NavbarLink
              sections={[
                { name: "Setting up", link: "#setting-up" },
                { name: "Server setup", link: "#server-setup" },
                { name: "Full example", link: "#full-example" },
              ]}
              href="/getting-started/solidstart"
            >
              SolidStart
            </NavbarLink>
            <NavbarLink
              sections={[
                { name: "Setting up", link: "#setting-up" },
                { name: "Server setup", link: "#server-setup" },
                { name: "Full example", link: "#full-example" },
              ]}
              href="/getting-started/svelte"
            >
              SvelteKit
            </NavbarLink>
            <NavbarLink
              sections={[
                { name: "Setting up", link: "#setting-up" },
                { name: "Server setup", link: "#server-setup" },
                { name: "Full example", link: "#full-example" },
              ]}
              href="/getting-started/nuxt"
            >
              Vue with Nuxt
            </NavbarLink>
            <NavbarLink
              sections={[
                { name: "Setting up", link: "#setting-up" },
                { name: "Server setup", link: "#server-setup" },
                { name: "Full example", link: "#full-example" },
              ]}
              href="/getting-started/angular"
            >
              Angular
            </NavbarLink>
            <NavbarLink
              sections={[
                { name: "Setting up", link: "#setting-up" },
                { name: "Server setup", link: "#server-setup" },
                { name: "Full example", link: "#full-example" },
              ]}
              href="/getting-started/expo"
            >
              Expo
            </NavbarLink>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavbar;
