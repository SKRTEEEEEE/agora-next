import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import ThemePopover from "../theme-popover";
import { Link } from "@/lib/i18n/routing";
import { CustomConnectButton } from "../custom-connect-button";
import { userInCookiesUC } from "@/core/presentation/controllers/user";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "./list-item";

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
          
          {/* Navigation Menu with Apps Dropdown */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Apps</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">
                            Web, IIoT & PLC
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            desarrollador.tech
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem
                      href="https://profile-skrt.vercel.app/es/academia"
                      title="Blog"
                    >
                      Blog y formación para desarrolladores. SaaS de muestra.
                    </ListItem>
                    <ListItem
                      href="https://profile-skrt.vercel.app/es/admin"
                      title="Dashboard Admin"
                    >
                      Panel de administración para gestionar la página y sus
                      contenidos.
                    </ListItem>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="https://dev.desarrollador.tech">
                          <div className="text-sm leading-none font-medium">
                            Desarrollador
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                            Información sobre el desarrollador y su experiencia.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
