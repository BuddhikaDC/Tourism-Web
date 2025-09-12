import { useMemo, useState } from 'react'

function BookingButton({ isLoading }) {
	return (
		<button
			type="submit"
			disabled={isLoading}
			className={`inline-flex items-center justify-center whitespace-nowrap rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-70 w-full md:w-auto`}
		>
			{isLoading ? (
				<span className="relative inline-flex items-center gap-2">
					<span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
					Booking...
				</span>
			) : (
				'Book Now'
			)}
		</button>
	)
}

function Hero() {
	const [isLoading, setIsLoading] = useState(false)

	function handleSubmit(e) {
		e.preventDefault()
		setIsLoading(true)
		setTimeout(() => setIsLoading(false), 1500)
	}

	const bgStyle = useMemo(
		() => ({
			backgroundImage:
				"url('https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1974&auto=format&fit=crop')",
		}),
		[]
	)

	return (
		<section
			className="relative min-h-[80vh] w-full overflow-hidden bg-center bg-cover"
			style={bgStyle}
		>
			<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
			<div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center gap-8 px-6 text-center text-white">
				<div className="space-y-4">
					<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
						Embark on Your Next Safari Adventure
					</h1>
					<p className="mx-auto max-w-2xl text-sm text-white/90 sm:text-base">
						Discover breathtaking landscapes and unforgettable wildlife experiences across Africa.
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="w-full"
				>
					<div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-3 rounded-2xl bg-white/90 p-3 shadow-2xl backdrop-blur sm:grid-cols-2 md:grid-cols-4">
						<input
							type="text"
							placeholder="Destination"
							className="w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/50 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
							required
						/>
						<input
							type="date"
							className="w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/50 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
							required
						/>
						<input
							type="number"
							min="1"
							placeholder="People"
							className="w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/50 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
							required
						/>
						<div className="flex items-center justify-center md:justify-end">
							<BookingButton isLoading={isLoading} />
						</div>
					</div>
				</form>

				<div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl"></div>
				<div className="pointer-events-none absolute bottom-10 right-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl"></div>
			</div>
		</section>
	)
}

export default Hero



