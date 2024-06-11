import Container from "./Container.tsx";
import Logo from "./icons/Logo.tsx";

export default function Footer() {
  return (
    <footer className="py-10 border-t border-t-border">
      <Container className="flex items-start justify-between">
        <Logo className="h-6 grayscale" />
        <div className="text-sm leading-relaxed">
          <p>LottieFiles is by Design Barn Inc.</p>
          <p>Copyright © 2022 Design Barn Inc. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
