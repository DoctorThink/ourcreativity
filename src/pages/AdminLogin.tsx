// --- START OF FILE AdminLogin.tsx ---
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useToast } from "@/components/ui/use-toast";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(password);

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        navigate("/our-admin");
      } else {
        toast({
          title: "Authentication failed",
          description: "Please check your password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1c] text-white overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-60">
        {/* Enhanced background blobs inspired by logo */}
        <div className="absolute w-[60vw] h-[60vh] rounded-full blur-[110px] bg-[#E54646]/10 -top-[15%] -right-[15%]" />
        <div className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-[#3ECAC4]/10 -bottom-[10%] -left-[10%]" />
         <div className="absolute w-[40vw] h-[40vh] rounded-full blur-[90px] bg-[#FFA83E]/5 bottom-[20%] right-[5%]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 space-y-8 backdrop-blur-2xl bg-[#2a2a2e]/60 border border-[#444448]/70 rounded-3xl shadow-2xl shadow-black/30"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#2a2a2e]/80 backdrop-blur-xl border border-[#444448]">
            <Lock className="w-8 h-8 text-[#A855F7]" /> {/* Purple Icon */}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-neutral-100">Admin Access</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-neutral-300">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-[#1a1a1c]/80 border-[#444448] text-white placeholder:text-neutral-500 focus:border-[#A855F7] focus:ring-[#A855F7]/50 rounded-lg"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#A855F7] text-white hover:bg-[#A855F7]/90 rounded-lg transition-colors duration-200 font-semibold"
          >
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </form>

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => navigate("/")}
            className="text-neutral-400 hover:text-[#A855F7]"
          >
            Return to homepage
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
