import Image from "next/dist/client/image";

export default function MainBanner({ onService }) {
  return (
    <section className="jumbotron text-center">
      <h1 className="display-4 title-repair">Car repair at your Services</h1>
      <div>
        <a className="mt-5 btn btn-repair" role="button" onClick={onService}>
          Repair Now
        </a>
      </div>
      <Image
        alt="logo"
        src="/img/landing.png"
        width={1438}
        height={466}
        className="banner-landing mt-5"
      />
    </section>
  );
}
