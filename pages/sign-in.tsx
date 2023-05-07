import Image from "next/image";
import Link from "next/link";
import SignInForm from "../components/organisms/SignInForm";

export default function SignIn() {
  return (
    <section className="sign-in mx-auto">
      <div className="row">
        <div className="col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0">
          <div className="container mx-auto">
            <div className="pb-50">
              <Link href="/">
                <a className="navbar-brand">
                  <Image
                    src="/icon/construction.png"
                    width={60}
                    height={60}
                    alt="logo"
                  />
                </a>
              </Link>
            </div>
            <SignInForm />
          </div>
        </div>
        <div className="col-xxl-7 col-lg-6 text-center pt-lg-145 pb-lg-145 d-lg-block d-none sign-in-back">
          <img
            src="/img/wrench.png"
            width="502"
            height="391.21"
            className="img-fluid pb-50"
            alt=""
          />
          <h2 className="text-4xl fw-bold text-black mb-30">
            Service your car
            <br />
            if it is not in prime condition
          </h2>
          <p className="text-black m-0">Driving More Comfortable And Safer</p>
        </div>
      </div>
    </section>
  );
}
