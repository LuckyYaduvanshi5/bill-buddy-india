
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wait a moment before navigating to show the splash screen
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-brand-blue to-brand-purple text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Bill Buddy</h1>
      <p className="text-xl mb-8 text-center">
        Track shared expenses with friends and settle up easily
      </p>
      
      <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center mb-8">
        <div className="text-7xl font-bold">BB</div>
      </div>
      
      <Button 
        onClick={() => navigate("/")} 
        size="lg" 
        className="bg-white text-brand-purple hover:bg-white/90 font-semibold"
      >
        Get Started
      </Button>
    </div>
  );
};

export default Index;
