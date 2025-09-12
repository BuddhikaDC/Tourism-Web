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
		<div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200">
			<div className="mx-auto max-w-7xl px-6">
				<div className="flex h-16 items-center justify-between md:justify-center">
					<a href="#" className="text-base font-semibold tracking-tight text-gray-900 md:absolute md:left-6">Safari</a>

					{/* Desktop nav using shadcn/ui */}
					<div className="hidden md:block">
						<NavigationMenu viewport={false}>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuLink className="text-gray-700 hover:text-emerald-600" href="#">Home</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink className="text-gray-700 hover:text-emerald-600" href="#destinations">Destinations</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink className="text-gray-700 hover:text-emerald-600" href="#about">About</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink className="text-gray-700 hover:text-emerald-600" href="#contact">Contact</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* Mobile hamburger */}
					<button
						className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition hover:text-emerald-600 md:hidden"
						aria-label="Toggle menu"
						onClick={() => setOpen(v => !v)}
					>
						{open ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
					</button>
				</div>

				{/* Mobile menu panel */}
				{open && (
					<div className="md:hidden">
						<div className="space-y-1 rounded-b-xl bg-white/95 p-4 backdrop-blur border-b border-gray-200">
							<a href="#" className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-emerald-600">Home</a>
							<a href="#destinations" className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-emerald-600">Destinations</a>
							<a href="#about" className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-emerald-600">About</a>
							<a href="#contact" className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-emerald-600">Contact</a>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar;