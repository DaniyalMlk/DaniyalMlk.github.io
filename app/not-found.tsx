import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <main className="nf">
        <div className="th">Statement of account · No. 0001</div>
        <h1>No such line item.</h1>
        <p className="lede">This page does not exist in the books.</p>
        <p>
          <Link href="/">Return to the statement →</Link>
        </p>
      </main>
    </div>
  );
}
