import bananaLeaf from "@/assets/photos/banana-leaf.jpg";
import banana from "@/assets/photos/banana.jpg";
import colombo from "@/assets/photos/colombo.jpg";
import cranes from "@/assets/photos/cranes.jpg";
import eggs from "@/assets/photos/eggs.jpg";
import electrical from "@/assets/photos/electrical.jpg";
import garlic from "@/assets/photos/garlic.jpg";
import guava from "@/assets/photos/guava.jpg";
import heroPort from "@/assets/photos/hero-port.jpg";
import heroShip from "@/assets/photos/hero-ship.jpg";
import mango from "@/assets/photos/mango.jpg";
import onions from "@/assets/photos/onions.jpg";
import pipesSection from "@/assets/photos/pipes-section.jpg";
import polymers from "@/assets/photos/polymers.jpg";
import rice from "@/assets/photos/rice.jpg";
import spiceBowls from "@/assets/photos/spice-bowls.jpg";
import spiceMarket from "@/assets/photos/spice-market.jpg";
import spices from "@/assets/photos/spices.jpg";
import sunset from "@/assets/photos/sunset.jpg";

export const photos = {
  "banana-leaf": bananaLeaf,
  banana,
  colombo,
  cranes,
  eggs,
  electrical,
  garlic,
  guava,
  "hero-port": heroPort,
  "hero-ship": heroShip,
  mango,
  onions,
  "pipes-section": pipesSection,
  polymers,
  rice,
  "spice-bowls": spiceBowls,
  "spice-market": spiceMarket,
  spices,
  sunset,
};

export type PhotoKey = keyof typeof photos;
