import Image from "next/dist/client/image";

export default function Footer() {
  return (
    <section className="footer pt-50">
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 text-lg-center text-center">
              <a href="" className="mb-30 text-center">
                <Image src="/icon/construction.png" width={60} height={60} />
              </a>
              <p className="mt-30 text-lg color-palette-1 mb-30">
                Garasi Jogja membantu pelanggan
                <br /> untuk memperbaiki mobil
              </p>
              <p className="mt-30 text-lg color-palette-1 mb-30 contact">
                Contact : 0877-7600-0300 - Al Comra
              </p>
              <p className="mt-30 text-lg color-palette-1 mb-30 contact">
                Instagram : @bengkelgarasijogja
              </p>
              <p className="mt-30 text-lg color-palette-1 mb-30">
                Copyright 2023. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
