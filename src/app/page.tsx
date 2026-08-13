import Link from "next/link";

const featureCards = [
  {
    title: "Fast invoice creation",
    description: "Turn a draft into a polished invoice in minutes with reusable templates and a guided flow.",
  },
  {
    title: "Smarter follow-ups",
    description: "Automate reminders and keep payment status visible so your team spends less time chasing invoices.",
  },
  {
    title: "Global-friendly payments",
    description: "Support local and cross-border settlement options for modern teams working across currencies.",
  },
];

const steps = [
  {
    step: "01",
    title: "Create",
    description: "Pick a template, add line items, and brand it your way in minutes.",
  },
  {
    step: "02",
    title: "Send",
    description: "Deliver a polished invoice with automated reminders and clear status tracking.",
  },
  {
    step: "03",
    title: "Get paid",
    description: "Accept local and cross-border payments, then reconcile automatically.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,_rgba(94,42,140,0.08),_transparent_55%)]">
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-foreground">Fluxinvoice</span>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium text-foreground/80">
            <Link href="#features" className="transition hover:text-foreground">
              Features
            </Link>
            <Link href="#" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="px-4 pb-8 pt-16 text-center md:pb-12 md:pt-24 lg:py-32">
          <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-5 text-center">
            <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Built for modern teams managing invoices and payments
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Invoices that feel calm, clear, and ready to send.
            </h1>
            <p className="max-w-[42rem] text-lg leading-8 text-muted-foreground sm:text-xl">
              Fluxinvoice helps founders and operators create polished invoices, track payment progress, and stay organized without the clutter of traditional finance tools.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <Link href="#" className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                Join the beta waitlist
              </Link>
              <Link href="#features" className="rounded-full border border-border bg-background px-8 py-3 text-sm font-medium text-foreground transition hover:bg-accent">
                Explore features
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-border/70 px-4 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto space-y-12">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Everything you need to get paid faster.
              </h2>
              <p className="max-w-[85%] text-lg leading-7 text-muted-foreground sm:text-xl">
                A focused invoicing workflow for teams that care about clarity, speed, and a polished client experience.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              {featureCards.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col items-start rounded-xl border border-border/70 bg-background/80 p-8 text-left shadow-sm"
                >
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      <section id="how-it-works" className="border-t border-border/70 px-4 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto space-y-12">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                From draft to payment in three steps.
              </h2>
              <p className="max-w-[85%] text-lg leading-7 text-muted-foreground sm:text-xl">
                A simple flow that keeps every invoice moving forward without the busywork.
              </p>
            </div>
            <div className="mx-auto grid gap-8 sm:max-w-[52rem] sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.step} className="flex flex-col items-start gap-3">
                  <span className="text-sm font-semibold tracking-widest text-primary">{step.step}</span>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{step.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="waitlist" className="border-t border-border/70 px-4 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto flex max-w-[48rem] flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Ready to get paid faster?
            </h2>
            <p className="max-w-[36rem] text-lg leading-7 text-muted-foreground">
              Join the beta waitlist and be first in line when Fluxinvoice opens its doors.
            </p>
            <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row" aria-label="Join the beta waitlist">
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="h-11 flex-1 rounded-full border border-border bg-background px-5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                type="submit"
                className="h-11 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Join waitlist
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 py-6 md:py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with care. © 2026 Fluxinvoice.
          </p>
        </div>
      </footer>
    </div>
  );
}
