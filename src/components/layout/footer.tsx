import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm font-[family-name:var(--font-display)]">
                  L
                </span>
              </div>
              <span className="font-[family-name:var(--font-display)] text-white font-bold text-lg">
                LUNO
              </span>
            </Link>
            <p className="text-sm text-sky/50 leading-relaxed">
              Learn languages through short, interactive practice sessions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Languages
            </h4>
            <ul className="space-y-2 text-sm text-sky/50">
              <li className="hover:text-white transition-colors cursor-pointer">
                Russian
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                German
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-sky/50">
              <li className="hover:text-white transition-colors cursor-pointer">
                Features
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                How It Works
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-sky/50">
              <li className="hover:text-white transition-colors cursor-pointer">
                Privacy
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Terms
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-sky/40">
            &copy; {new Date().getFullYear()} LUNO. All rights reserved.
          </p>
          <p className="text-sm text-sky/40">
            Built with care for language learners everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
