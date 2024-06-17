import Container from "./Container.tsx";
import Logo from "./icons/Logo.tsx";

export default function Header() {
  const style = {
    header:
      "py-4 lg:py-5 border-b border-t-border theme-neutral-light bg-t-bg text-t-text-light",
    container: "flex",
    logo: "h-5 lg:h-7 text-t-text",
  };

  return (
    <header className={style.header}>
      <Container className={style.container}>
        <Logo className={style.logo} />
      </Container>
    </header>
  );
}
