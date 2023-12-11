import { useEffect } from "react";
import { useRouter } from "next/router";

const InitPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/products");
  }, []);
};

export default InitPage;
