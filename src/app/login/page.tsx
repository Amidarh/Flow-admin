"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FlowLogo } from "@/assets/svg";
import { BoxPattern } from "@/core/patterns";
import { Card } from "@/components/ui/card";
// import { GoogleAuthButton } from "@/core/commons/components/googleButton";
import { useLoginService } from "@/modules/login/services";
import { ErrorMessageP } from "@/core/components/errorMessage";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { LoginSchemaType } from "@/schema";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();
  const {
    form: {
      formState: { errors, isSubmitting },
      handleSubmit,
      register
    },
    login,
    serverError
  } = useLoginService()

  const onSubmit = async (data: LoginSchemaType) => {
    await login(data)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-6 sm:px-6">
      <BoxPattern />
      {/* <AnimatedSvg /> */}
      {/* <CursorFollow /> */}

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
            <h1 className="text-2xl font-bold mb-2 md:text-3xl">Welcome Back</h1>
            <p className="text-muted-foreground text-sm md:text-base">Sign in to your account to continue</p>
            {serverError && <p className="text-red-500">{serverError}</p>}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium ">
                Email Address
              </label>
              <Input
                id="email"
                // type="email"
                placeholder="Enter your email"
                {...register("email")}
                required
                className="w-full border border-white/30 placeholder:text-muted-foreground/50 focus:border-white/50 focus:ring-white/20"
              />
              <ErrorMessageP error={errors.email?.message} />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium ">
                Password
              </label>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  placeholder='Enter your password'
                  className='h-12 pr-10'
                  {...register('password')}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ErrorMessageP error={errors.password?.message} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="flex items-center space-x-2 shrink-0">
                <input
                  type="checkbox"
                  className="rounded border-white/30 bg-white/20 focus:ring-white/20"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer hover:underline"
              >
                Forgot password?
              </button>
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
                <span className="relative z-10">Sign In</span>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900 to-gray-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          </form>

          {/* Divider */}
          {/* <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/10 /70">Or continue with</span>
            </div>
          </div> */}

          {/* Social Login */}
          {/* <div className="gap-4">
            <GoogleAuthButton />
          </div>

          {/* Sign Up Link */}
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
