import { Icon } from "@iconify/react";

import Container from "./Container.tsx";
import Logo from "./icons/Logo.tsx";

export default function Footer() {
  return (
    <footer className="py-6 lg:py-10 border-t border-t-border">
      <Container className="lg:flex items-start justify-between">
        <Logo className="h-5 lg:h-6 grayscale" />
        <div className="mt-4 lg:mt-0 text-sm leading-relaxed">
          <p>LottieRoom © 2024 Gleb Gorokhov.</p>
          <p>LottieFiles is by Design Barn Inc.</p>
          <div className="flex mt-3">
            <a
              href="https://github.com/glebgorokhov/lottie-room"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-t-text"
            >
              <Icon
                icon="ri:github-fill"
                className="w-6 lg:w-8 h-6 lg:h-8 block"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
