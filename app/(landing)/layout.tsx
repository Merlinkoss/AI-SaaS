import CookieConsent from "@/components/cookie-consent";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
      <CookieConsent />
      <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
    </main>
  );
};

export default LandingLayout;
