import Head from "next/head";
import Navbar from "../components/organisms/Navbar";
import MainBanner from "../components/organisms/MainBanner";
import TransactionStep from "../components/organisms/TransactionStep";
import Story from "../components/organisms/Story";
import Footer from "../components/organisms/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Aos from "aos";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    Aos.init();
  }, []);

  const onService = () => {
    return router.push("/service");
  };
  return (
    <>
      <Head>
        <title>Bring your car here & Let see what happen</title>
        <meta
          name="description"
          content="Kami menyediakan cara untuk membuat mobil anda berjalan seperti biasanya"
        />
        <meta
          property="og:title"
          content="StoreGG - Get a New Experience in Gaming"
        />
        <meta
          property="og:description"
          content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati"
        />
        <meta property="og:image" content="https://imageurlkalian" />
        <meta property="og:url" content="https://storegg.com" />
      </Head>
      <Navbar />
      <MainBanner onService={onService} />
      <TransactionStep />
      <Story />
      <Footer />
    </>
  );
}
