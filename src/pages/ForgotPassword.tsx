import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
      <p className="text-muted-foreground mb-4">Enter your email to receive a reset link.</p>
      <form className="max-w-md space-y-3" onSubmit={(e)=>{e.preventDefault(); alert('Password reset requires backend. Connect Supabase to enable email OTP/reset.');}}>
        <input className="w-full rounded-md border border-border bg-background p-3" placeholder="Email" />
        <Button type="submit">Send Reset Link</Button>
      </form>
    </main>
    <Footer />
  </div>
);

export default ForgotPassword;
