import Link from "next/link";

export default function SignInPage() {
  return (
    <main>
      <section className="section">
        <div className="container auth-wrap">
          <div>
            <span className="eyebrow">Member access</span>
            <h1 className="serif">Sign in to Luxentir</h1>
            <p className="auth-note">
              Customer login will be connected during the CMS and database
              phase.
            </p>
          </div>

          <div className="auth-card">
            <input className="field" placeholder="Email address" />
            <input className="field" placeholder="Password" type="password" />
            <button className="btn gold">Sign In</button>
            <Link className="btn ghost" href="/signup">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}