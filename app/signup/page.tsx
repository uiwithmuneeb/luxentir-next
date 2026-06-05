import Link from "next/link";

export default function SignUpPage() {
  return (
    <main>
      <section className="section">
        <div className="container auth-wrap">
          <div>
            <span className="eyebrow">New customer</span>
            <h1 className="serif">Create your account</h1>
            <p className="auth-note">
              Customer registration will be connected during the CMS and
              database phase.
            </p>
          </div>

          <div className="auth-card">
            <input className="field" placeholder="Full name" />
            <input className="field" placeholder="Email address" />
            <input className="field" placeholder="Password" type="password" />
            <button className="btn gold">Create Account</button>
            <Link className="btn ghost" href="/signin">
              Already have an account?
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}