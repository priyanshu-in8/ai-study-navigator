import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { authApi } from "@/services/api";

const VerifyEmail = () => {
  const [params] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] =
    useState("Verifying your email...");

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      setLoading(false);
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const data = await authApi.verifyEmail(token);

        setSuccess(data.success || !!data);
        setMessage(
          data.message ||
            "Email verified successfully."
        );
      } catch (error: any) {
        setMessage(
          error.message || "Verification failed."
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [params]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="glass rounded-2xl p-8 max-w-md w-full text-center">

        {loading ? (
          <>
            <h1 className="text-2xl font-bold mb-4">
              Verifying...
            </h1>

            <p className="text-muted-foreground">
              Please wait...
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">
              {success
                ? "✅ Verified"
                : "❌ Failed"}
            </h1>

            <p className="text-muted-foreground mb-6">
              {message}
            </p>

            <Link
              to="/auth"
              className="inline-block px-5 py-2 rounded-xl bg-primary text-white"
            >
              Go to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;