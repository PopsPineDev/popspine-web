import { WaitForm } from "./WaitForm";

export function WaitSection() {
  return (
    <section className="wait">
      <div className="wrap rv">
        <div className="eyebrow">Early access</div>
        <h2
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            maxWidth: "20ch",
          }}
        >
          Watch it get built, receipts and all.
        </h2>
        <p
          className="lede"
          style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
        >
          Weekly ledgers: signals fired, orders executed, rejections caught,
          bugs found. Good weeks and ugly ones.
        </p>
        <WaitForm className="form" showMessage />
      </div>
    </section>
  );
}
