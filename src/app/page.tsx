import SmoothScroll from "@/components/SmoothScroll";
import ProgressBar from "@/components/ProgressBar";
import Nav from "@/components/Nav";
import Marquee from "@/components/Marquee";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Season from "@/components/sections/Season";
import Works from "@/components/sections/Works";
import Numbers from "@/components/sections/Numbers";
import Coda from "@/components/sections/Coda";

export default function Home() {
  return (
    <SmoothScroll>
      <ProgressBar />
      <Nav />
      <main>
        <Hero />
        <Marquee
          items={[
            "R01 Silverpine",
            "R07 Azure Coast",
            "R14 Nordwall",
            "R22 Mirage Valley",
            "Car Nº 27",
            "P1 · P1 · P2 · P1",
          ]}
        />
        <Manifesto />
        <Season />
        <Marquee
          dark
          items={[
            "Sector 1 · 28.441",
            "Sector 2 · 31.006",
            "Sector 3 · 24.854",
            "DRS enabled",
            "Box box box",
          ]}
        />
        <Works />
        <Numbers />
        <Coda />
      </main>
    </SmoothScroll>
  );
}
