import Button from "../UI/Button";

export default function CTA() {
  return (
    <section className="relative py-32 px-6 z-10 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-emerald-900/10 to-amber-900/20 blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative p-16 md:p-24 bg-zinc-900/40 backdrop-blur-xl border border-emerald-500/20 rounded-3xl shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Ready to transform your team's workflow?
        </h2>
        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-loose">
          Join thousands of teams already working smarter with CollabHub. Set up in minutes, see results instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button variant="primary" size="lg" className="shadow-emerald-500/20">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg">
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
}