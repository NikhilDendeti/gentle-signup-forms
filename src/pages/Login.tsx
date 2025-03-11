
import Logo from "@/components/Logo";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col py-10 px-4 sm:px-6 md:py-16">
      <header className="max-w-md mx-auto w-full mb-6">
        <Logo />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <LoginForm />
      </main>
      <footer className="mt-10 text-center">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} EasyHR. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Login;
