
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Navigate to the home page
    navigate("/", { replace: true });
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <img 
        src="/lovable-uploads/9847c9cf-f02c-4e42-b7b2-e7636e4eb49f.png" 
        alt="Bill Buddy Logo" 
        className="h-16 w-auto animate-pulse"
      />
    </div>
  );
};

export default Index;
