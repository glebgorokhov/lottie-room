import Container from "./Container.tsx";
import Logo from "./icons/Logo.tsx";
import ToggleDarkMode from "./ToggleDarkMode.tsx";

export default function Header() {
  const style = {
    header:
      "py-4 lg:py-5 border-b border-t-border theme-neutral-light dark:theme-neutral bg-t-bg text-t-text-light",
    container: "flex items-center justify-between",
    logo: "h-5 lg:h-7 text-t-text",
    darkModeButton: "w-6 h-6",
  };

  return (
    <header className={style.header}>
      <Container className={style.container}>
        <Logo className={style.logo} />
        <ToggleDarkMode className={style.darkModeButton} />
      </Container>
    </header>
  );
}
