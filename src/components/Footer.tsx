export function Footer() {
  return (
    <footer className="bg-stone-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-2xl tracking-[0.3em] text-amber-50">AURÉLIA</p>
            <p className="text-stone-400 text-xs tracking-widest mt-2">MAISON DE PARFUM · PARIS</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs tracking-widest text-stone-400">
            {['Privacy', 'Terms', 'Shipping', 'Returns', 'FAQ'].map((l) => (
              <a key={l} href="#" className="hover:text-amber-200 transition-colors">{l}</a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center text-stone-500 text-xs tracking-wider">
          © {new Date().getFullYear()} Aurélia Maison de Parfum. Crafted in Grasse, France.
        </div>
      </div>
    </footer>
  );
}
