"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { BoxPattern } from "@/core/patterns";
import { Card } from "@/components/ui/card";
import { FlowLogo } from "@/assets/svg";
import { useForgetPasswordService } from "../services";
import { ErrorMessageP } from "@/core/components/errorMessage";
import { Loader2 } from "lucide-react";
import { forgetPasswordSchemaType } from "@/schema";
import { cn } from "@/lib/utils";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
    },
    forgetPassword,
    serverError
  } = useForgetPasswordService()

  const onSubmit = async (data: forgetPasswordSchemaType) => {
    await forgetPassword(data)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-6 sm:px-6">
      <BoxPattern />

      {/* Main content: no card fill on mobile, card from md up */}
      <div className="relative z-10 w-full max-w-lg md:mx-auto md:px-6">
        <Card
          className={cn(
            "flex flex-col gap-6 animate-fade-in-up",
            "bg-transparent border-0 shadow-none rounded-2xl p-0 min-w-0",
            "md:bg-card/80 md:backdrop-blur-md md:border md:border-white/20 md:rounded-3xl md:p-8 md:shadow-2xl"
          )}
        >
          {/* Logo and Header */}
          <div className="text-center mb-5 md:mb-8">
            <div className="flex justify-center mb-4 cursor-pointer" onClick={() => router.push("/")}>
              <FlowLogo />
            </div>
            <h1 className="text-2xl font-bold mb-2 md:text-3xl">Forgot your password?</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Enter the email address used to create your account
            </p>
            {serverError && <p className="text-red-500 text-sm mt-2">{serverError}</p>}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium ">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                required
                className='h-12 pr-10'
              />
              <ErrorMessageP error={errors.email?.message} />
            </div>

            <Button
              type="submit"
              variant="default"
              className="w-full group relative px-8 py-4 text-lg font-semibold rounded-full h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  {/* <span>Submitting...</span> */}
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                <span className="relative z-10">Continue</span>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900 to-gray-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-6 md:mt-8">
            <p className="text-sm text-muted-foreground">
              Remembered your password?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-semibold text-foreground hover:underline cursor-pointer transition-colors duration-200"
              >
                Log in
              </button>
            </p>
          </div>
        </Card>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.8;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
