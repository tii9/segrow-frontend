import Link from "next/link";
import AuthForm from "../components/AuthForm";
import TopNavbar from "~/components/navbar/TopNavbar";

const SignInPage = () => {
  return (
    <div className="flex h-screen flex-col bg-white">
      <TopNavbar header="Masuk" />
      <div className="mt-6 flex flex-col px-4">
        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Selamat Datang</h2>
            <h3 className="text-sm">
              Masuk dan lanjut belanja meal kit favoritmu.
            </h3>
          </div>

          <AuthForm />

          <p className="text-foreground mt-6 text-center text-sm">
            Belum punya akun?{" "}
            <Link
              href={"/sign-up"}
              className="text-primary font-medium hover:underline"
            >
              Daftar akun
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
