import Container from "./Container.tsx";
import Logo from "./icons/Logo.tsx";

export default function Header() {
  return (
    <header className="py-5 border-b border-t-border theme-neutral-light bg-t-bg text-t-text-light">
      <Container className="flex items-center justify-between">
        <div>
          <Logo className="h-7 text-t-text" />
        </div>
        <div>Menu</div>
      </Container>
    </header>
  );
}
