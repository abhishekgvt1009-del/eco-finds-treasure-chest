import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const WelcomeOverlay = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const seen = localStorage.getItem("ecofinds_welcome_seen");
    if (!seen) setOpen(true);
  }, []);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="max-w-lg w-full mx-4 rounded-xl border border-border bg-card p-8 text-center shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome to EcoFinds 🇮🇳</h1>
        <p className="text-muted-foreground mb-6">Discover sustainable, pre-loved treasures across India. Ready to start shopping?</p>
        <Button onClick={() => { localStorage.setItem("ecofinds_welcome_seen", "1"); setOpen(false); }}>Let's Go</Button>
      </div>
    </div>
  );
};

export default WelcomeOverlay;
