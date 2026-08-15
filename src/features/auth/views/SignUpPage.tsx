import Link from "next/link";
import AuthForm from "../components/AuthForm";
import TopNavbar from "~/components/navbar/TopNavbar";

const SignUpPage = () => {
  return (
    <div className="flex h-screen flex-col bg-white">
      <TopNavbar header="Daftar akun" />
      <div className="flex flex-col px-4 pt-6">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Buat akun baru</h2>
            <h3 className="text-sm">
              Daftar dan mulai masak lebih praktis hari ini.
            </h3>
          </div>

          <AuthForm isSignUp />

          <p className="text-foreground mt-6 text-center text-sm">
            Sudah punya akun?{" "}
            <Link
              href={"/sign-in"}
              className="text-primary font-medium hover:underline"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
