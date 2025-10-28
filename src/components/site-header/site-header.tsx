import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import ThemePopover from "../theme-popover";
import { Link } from "@/lib/i18n/routing";
import { CustomConnectButton } from "../custom-connect-button";
import { userInCookiesUC } from "@/core/presentation/controllers/user";

const siteConfig = {
  name: "Agora",
  description: "Academia de desarrollo web",
  links: {
    github: "https://github.com/SKRTEEEEEE",
    twitter: "https://twitter.com/SKRTEEEEEE",
  }
}

export async function SiteHeader() {
  const user = await userInCookiesUC();
  
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold">{siteConfig.name}</span>
          </Link>
          
          {/* Nav Links */}
          <Link 
            href="/ejercicios"
            className="text-sm font-medium transition-colors hover:text-primary hidden md:inline-block"
          >
            Ejercicios
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-2">
            {/* Login Button */}
            <div className="w-40">
              <CustomConnectButton connectButtonLabel="Iniciar sesión" initialUser={user} />
            </div>

            {/* GitHub */}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0 hidden md:inline-flex")}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>

            {/* Twitter */}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0 hidden md:inline-flex")}
            >
              <Icons.twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </a>

            {/* Theme Toggle */}
            <ThemePopover />
          </nav>
        </div>
      </div>
    </header>
  );
}
