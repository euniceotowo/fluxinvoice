import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">Fluxinvoice</span>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="#features">Features</Link>
            <Link href="#" className="rounded-full bg-primary-100 px-4 py-2 text-white">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-16 md:pb-12 md:pt-24 lg:py-32 text-center">
          <div className="container mx-auto px-4 flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="display-1 text-black">
              Invoices that feel calm and clear.
            </h1>
            <p className="max-w-[42rem] leading-normal text-gray-600 sm:text-xl sm:leading-8">
              Fluxinvoice is a minimal invoicing studio for modern teams. Draft, send, and track payments from a single, elegant workflow.
            </p>
            <div className="space-x-4 mt-4">
              <Link href="#" className="rounded-full bg-primary-100 px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
                Join the beta Waitlist
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 space-y-12 py-12 md:py-24 lg:py-32 border-t">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="header-1 text-black">Features</h2>
            <p className="max-w-[85%] leading-normal text-gray-600 sm:text-lg sm:leading-7">
              Everything you need to get paid faster, without the unnecessary clutter.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center shadow-sm">
              <h3 className="header-3 text-black">Instantly usable</h3>
              <p className="mt-2 text-sm text-gray-600">Create invoices from a crisp template and reuse them in one click.</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center shadow-sm">
              <h3 className="header-3 text-black">Smart reminders</h3>
              <p className="mt-2 text-sm text-gray-600">Nudges that feel human so you get paid without awkward follow ups.</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center shadow-sm">
              <h3 className="header-3 text-black">Multiple Currencies</h3>
              <p className="mt-2 text-sm text-gray-600">Send USD, GBP, or NGN invoices without touching spreadsheets.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-600 md:text-left">
            Built with care. © 2026 Fluxinvoice.
          </p>
        </div>
      </footer>
    </div>
  );
}
