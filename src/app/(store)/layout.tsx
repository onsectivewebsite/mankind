import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OfferPopup } from "@/components/OfferPopup";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <OfferPopup />
    </>
  );
}
