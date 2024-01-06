import { verifyEmail } from "@/services/request";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function VerifyEmail() {
  const router = useRouter();
  const token = router.query;
  console.log("token:", token);
  useEffect(() => {
    verifyEmail(token, router);
  });
  return <div>verifying email</div>;
}

export default VerifyEmail;
