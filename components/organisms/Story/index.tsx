import Image from "next/dist/client/image";

export default function Story() {
  const renderCard = (
    title: String,
    icon: String,
    width: number,
    height: number
  ) => {
    return (
      <div className="col-lg-4 text-center">
        <div className=" feature-card border-0 step-card">
          <Image
            src={`/icon/${icon}.png`}
            alt="icon step"
            className="mb-30"
            width={width}
            height={height}
          />
          <p className="fw-semibold text-2xl mt-3 color-palette-1">{title}</p>
        </div>
      </div>
    );
  };

  return (
    <section id="feature" className="feature pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 text-center mb-30">
          Our Services
        </h2>
        <div className="row gap-lg-0 gap-4">
          {renderCard("General Services", "services1", 100, 90)}
          {renderCard("Denting & Painting Services", "services2", 100, 90)}
          {renderCard("Major Services", "services3", 100, 90)}
        </div>
      </div>
    </section>
  );
}
