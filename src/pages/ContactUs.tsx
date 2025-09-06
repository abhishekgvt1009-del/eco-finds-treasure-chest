import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const ContactUs = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="max-w-lg space-y-3">
        <input className="w-full rounded-md border border-border bg-background p-3" placeholder="Your Name" />
        <input className="w-full rounded-md border border-border bg-background p-3" placeholder="Email" />
        <textarea className="w-full min-h-[140px] rounded-md border border-border bg-background p-3" placeholder="How can we help?" />
        <Button type="submit">Send Message</Button>
      </form>
    </main>
    <Footer />
  </div>
);

export default ContactUs;
