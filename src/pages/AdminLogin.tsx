
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User, Key, Shield } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useToast } from "@/components/ui/use-toast";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { login, isAuthenticated, isLoading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/our-admin";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      toast({
        title: "Password diperlukan",
        description: "Silakan masukkan password admin",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const success = await login(password);

      if (success) {
        toast({
          title: "Login berhasil",
          description: "Selamat datang di dashboard admin",
          className: "bg-emerald/10 border-emerald/20",
        });
        
        // Navigate to the previous page or admin dashboard
        const from = location.state?.from?.pathname || "/our-admin";
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Login gagal",
          description: "Password yang Anda masukkan salah",
          variant: "destructive",
        });
        setShowHint(true);
      }
    } catch (error) {
      toast({
        title: "Error login",
        description: "Terjadi kesalahan saat proses login",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1c]">
        <div className="text-center space-y-4 text-white">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="h-16 w-16 mx-auto text-[#A855F7]" />
          </motion.div>
          <p className="text-lg">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient colors */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute w-[60vw] h-[60vh] rounded-full blur-[110px] bg-gradient-to-r from-coral/20 via-emerald/10 to-amethyst/20 -top-[15%] -right-[15%]"></div>
        <div className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-gradient-to-r from-turquoise/10 via-blueLight/10 to-amber/10 -bottom-[10%] -left-[10%]"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/90"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md p-8 space-y-8 backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-3xl shadow-xl"
      >
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2 
            }}
            className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald/20 via-amethyst/30 to-coral/20 backdrop-blur-xl border border-foreground/10 shadow-lg"
          >
            <User className="w-10 h-10 text-foreground/90" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold mt-6 text-foreground font-serif"
          >
            Admin Access
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-foreground/60 mt-2 text-center"
          >
            Masuk untuk mengakses panel admin
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleLogin} 
          className="space-y-6"
        >
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground/70 flex items-center">
              <Key className="w-4 h-4 mr-2" />
              <span>Password</span>
            </label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin"
                className="pr-10 bg-foreground/5 border-foreground/10 placeholder-foreground/30 focus:ring-offset-amethyst/20 focus:border-amethyst/50"
                required
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/30" />
            </div>
            
            {showHint && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs text-amber mt-1"
              >
                Hint: Default password is the project name followed by numbers
              </motion.p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amethyst/90 via-blueLight/90 to-emerald/90 hover:from-amethyst hover:via-blueLight hover:to-emerald text-foreground-dark transition-all duration-300 font-medium py-6"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <Lock className="h-4 w-4" />
              </motion.div>
            ) : (
              <Shield className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Mengautentikasi..." : "Masuk"}
          </Button>
        </motion.form>

        <div className="text-center pt-4">
          <Button
            variant="link"
            onClick={() => navigate("/")}
            className="text-foreground/50 hover:text-amethyst transition-colors"
          >
            Kembali ke beranda
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
