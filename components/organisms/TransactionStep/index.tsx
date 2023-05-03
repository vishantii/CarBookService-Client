import StepItem from "../../molecules/StepItem";

export default function TransactionStep() {
  return (
    <section id="feature" className="feature pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 text-center mb-30">
          About Us
        </h2>
        <div className="row gap-lg-0 gap-4">
          <StepItem
            icon="step1"
            title="1. Who we are?"
            desc1="Founded in 2016, with a Vision to Provide Customers a Transparent, Convenient and Reliable Car Service and Repair"
          />
          <StepItem
            icon="step2"
            title="2. What is the problem?"
            desc1="Car owners often lack visibility regarding the quality of Mechanics, usage of Spare parts and Transparency in price. "
          />
          <StepItem
            icon="step3"
            title="3. How do we help?"
            desc1="Now, Citra Saputra is a Car Maintenance Workshop that provides Car Services with Professional Technicians."
          />
        </div>
      </div>
    </section>
  );
}
