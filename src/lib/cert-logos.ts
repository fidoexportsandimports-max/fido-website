import apeda from "@/assets/certs/apeda.png";
import dgft from "@/assets/certs/dgft.png";
import ecgc from "@/assets/certs/ecgc.png";
import fssai from "@/assets/certs/fssai.png";
import gst from "@/assets/certs/gst.png";
import icegate from "@/assets/certs/icegate.png";
import msme from "@/assets/certs/msme.png";
import spicesBoard from "@/assets/certs/spices-board.png";
import udyogAadhaar from "@/assets/certs/udyog-aadhaar.png";

export const certLogos = {
  apeda,
  dgft,
  ecgc,
  fssai,
  gst,
  icegate,
  msme,
  "spices-board": spicesBoard,
  "udyog-aadhaar": udyogAadhaar,
};
export type CertKey = keyof typeof certLogos;
