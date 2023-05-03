import Image from "next/dist/client/image";
import Illustration from "./Illustration";
import Link from "next/dist/client/link";

export default function MainBanner() {
  return (
    <section className="jumbotron text-center">
      <h1 className="display-4 title-repair">Car repair at your Services</h1>
      <div className="mt-5">
        <Link href="/service">
          <a className="btn btn-repair" href="#" role="button">
            Repair Now
          </a>
        </Link>
      </div>
      <div className="mt-5">
        <Image
          src="/img/landing.png"
          width={1438}
          height={466}
          className="banner-landing"
        />
      </div>
    </section>
  );
}
