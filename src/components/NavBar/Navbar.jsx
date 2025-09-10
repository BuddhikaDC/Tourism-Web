import { useState } from 'react'
import { Menu as MenuIcon, X as XIcon } from "lucide-react"
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

function Navbar() {
	const [open, setOpen] = useState(false)

	return(
		<div className="sticky top-0 z-50 w-full bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
			<div className="mx-auto max-w-7xl px-6">
				<div className="flex h-16 items-center justify-between md:justify-center">
					<a href="#" className="text-base font-semibold tracking-tight text-white md:absolute md:left-6">Safari</a>

					{/* Desktop nav using shadcn/ui */}
					<div className="hidden md:block">
						<NavigationMenu viewport={false}>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuLink className="text-white hover:text-emerald-300" href="#">Home</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink className="text-white hover:text-emerald-300" href="#destinations">Destinations</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink className="text-white hover:text-emerald-300" href="#about">About</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink className="text-white hover:text-emerald-300" href="#contact">Contact</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* Mobile hamburger */}
					<button
						className="inline-flex items-center justify-center rounded-md p-2 text-white transition hover:text-emerald-300 md:hidden"
						aria-label="Toggle menu"
						onClick={() => setOpen(v => !v)}
					>
						{open ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
					</button>
				</div>

				{/* Mobile menu panel */}
				{open && (
					<div className="md:hidden">
						<div className="space-y-1 rounded-b-xl bg-black/80 p-4 backdrop-blur">
							<a href="#" className="block rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/5 hover:text-emerald-300">Home</a>
							<a href="#destinations" className="block rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/5 hover:text-emerald-300">Destinations</a>
							<a href="#about" className="block rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/5 hover:text-emerald-300">About</a>
							<a href="#contact" className="block rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/5 hover:text-emerald-300">Contact</a>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar;