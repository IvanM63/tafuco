import { getCartCount } from "@/utils/actions/cart.action";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useCartCount = () => {
  const { data: session, status } = useSession();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleCartNotification = async () => {
      if (session?.user && status === "authenticated") {
        const count = await getCartCount({ id: String(session.user.id) });
        setCount(count);
      }
    };

    handleCartNotification();
  }, [session?.user, status]);

  return count;
};

export default useCartCount;
