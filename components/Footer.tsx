export function Footer() {
  return (
    <footer className="border-t border-panelBorder/60 py-10">
      <div className="section flex flex-col items-center justify-between gap-4 text-sm text-textDim sm:flex-row">
        <p>© {new Date().getFullYear()} PopSpine · built by @popspinedev</p>
        <div className="flex gap-6">
          <a href="https://x.com/popspinedev" className="hover:text-white">X / Twitter</a>
          <a href="#how-it-works" className="hover:text-white">How it works</a>
          <a href="#waitlist" className="hover:text-white">Early access</a>
        </div>
      </div>
      <p className="section mt-6 text-xs text-textDim/70">
        Not financial advice. Trading involves risk of loss. Automation
        reduces manual effort, not market risk.
      </p>
    </footer>
  );
}
