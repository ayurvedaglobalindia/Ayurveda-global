import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Ayurvedic Wellness Journal & Health Articles | Ayur Veda Global",
  description:
    "Explore in-depth articles on classical Ayurveda, herbal nutrition, Dinacharya (daily rituals), hair restoration, and ancient Rasayana vitality therapies.",
  openGraph: {
    title: "Ayurvedic Wellness Journal & Health Articles | Ayur Veda Global",
    description:
      "Explore in-depth articles on classical Ayurveda, herbal nutrition, Dinacharya, and natural vitality therapies.",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
