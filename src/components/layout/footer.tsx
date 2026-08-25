import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">LUNO</span>
            </div>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              Learn languages through short, interactive practice.
              Built for real progress.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#languages"
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  Languages
                </Link>
              </li>
              <li>
                <Link
                  href="#method"
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  Method
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Learn</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/auth/signup"
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  Start Learning
                </Link>
              </li>
              <li>
                <span className="text-sm text-[var(--color-muted)]">
                  Russian
                </span>
              </li>
              <li>
                <span className="text-sm text-[var(--color-muted)]">
                  German
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-[var(--color-muted)]">
                  Privacy
                </span>
              </li>
              <li>
                <span className="text-sm text-[var(--color-muted)]">
                  Terms
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} LUNO. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            Built for real language learning.
          </p>
        </div>
      </div>
    </footer>
  );
}
