import Image from "next/image";
import { Button } from "./button";

interface IAuthGoogleButton {
  children: React.ReactNode;
}

export function AuthGoogleButton({ children }: IAuthGoogleButton) {
  const loginWithGoogle = () => {
    console.log("login with google");
  };

  return (
    <Button
      className="w-full border-2 border-blue-500"
      onClick={loginWithGoogle}
    >
      {children}
      <Image src="/google-icon.svg" alt="Google logo" width={24} height={24} />
    </Button>
  );
}
