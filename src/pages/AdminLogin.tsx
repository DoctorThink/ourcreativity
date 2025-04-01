
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[70vw] h-[70vh] rounded-full blur-[120px] bg-foreground/5 -top-[20%] -right-[20%]" />
        <div className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px] bg-foreground/3 -bottom-[10%] -left-[10%]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 space-y-8 backdrop-blur-xl bg-foreground/5 border border-foreground/10 rounded-3xl"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-foreground/5 backdrop-blur-xl border border-foreground/10">
            <Lock className="w-8 h-8" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-foreground">Admin Access</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground/70">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-foreground/5 border-foreground/10"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-foreground text-background hover:bg-foreground/90"
          >
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </form>

        <div className="text-center">
          <Button 
            variant="link" 
            onClick={() => navigate("/")}
            className="text-foreground/70"
          >
            Return to homepage
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
