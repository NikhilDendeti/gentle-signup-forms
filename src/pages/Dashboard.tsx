
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col p-6">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold">EasyHR Dashboard</h1>
      </header>
      
      <main className="flex-1">
        <div className="max-w-3xl mx-auto text-center py-12 px-4">
          <h2 className="text-3xl font-bold mb-4">Welcome to your HR dashboard</h2>
          <p className="text-lg text-gray-600 mb-8">
            This is a placeholder dashboard page for demonstration purposes.
          </p>
          
          <Button onClick={() => navigate("/login")} className="mx-2">
            Back to Login
          </Button>
          
          <Button onClick={() => navigate("/")} className="mx-2">
            Back to Home
          </Button>
        </div>
      </main>
      
      <footer className="mt-auto text-center py-4 border-t">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} EasyHR. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
