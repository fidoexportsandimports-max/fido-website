import { ViewTransition } from "react";
import EnquiryTray from "@/components/EnquiryTray";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavProgress from "@/components/NavProgress";
import Preloader from "@/components/Preloader";
import Tracker from "@/components/Tracker";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <NavProgress />
      <Tracker />
      <Header />
      <main className="flex-1">
        <ViewTransition default="page-fade">{children}</ViewTransition>
      </main>
      <Footer />
      <WhatsAppButton />
      <EnquiryTray />
    </>
  );
}
