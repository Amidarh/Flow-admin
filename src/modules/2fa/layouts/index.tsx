"use client";

import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { useRouter } from "next/navigation";
import { BoxPattern } from "@/core/patterns";
import { Card } from "@/components/ui/card";
import { FlowLogo } from "@/assets/svg";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { ErrorMessageP } from "@/core/components/errorMessage";
import { Loader2 } from "lucide-react";
import { useTwoFactorService } from "../services";
import { cn } from "@/lib/utils";

export default function TwoFactorForm() {
    const router = useRouter();
    const {
        form: {
            register,
            handleSubmit,
            formState: { errors, isSubmitting },
            setValue,
            watch
        },
        twoFactor,
        resentOtp,
        loading,
        serverError
    } = useTwoFactorService()
    // Watch OTP value for controlled input
    const otpValue = watch('verificationCode');

    const handleOtpChange = (value: string) => {
        setValue('verificationCode', value, { shouldValidate: true });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-6 sm:px-6 w-full">
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
                        <h1 className="text-2xl font-bold mb-2 md:text-3xl">Two-factor authentication</h1>
                        <p className="text-muted-foreground text-sm md:text-base">
                            Enter the code sent to your email
                        </p>
                        {serverError && <p className="text-red-500 text-sm mt-2">{serverError}</p>}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(twoFactor)} className="space-y-5 md:space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="verificationCode" className="text-sm font-medium">
                                Verification code
                            </label>
                            <InputOTP
                                maxLength={6}
                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                value={otpValue}
                                onChange={handleOtpChange}
                                id='verificationCode'
                            >
                                <InputOTPGroup className='w-full flex gap-1'>
                                    {[...Array(6)].map((_, index) => (
                                        <InputOTPSlot
                                            key={index}
                                            index={index}
                                            className='w-full h-[52px] border rounded-md text-center text-lg'
                                            {...register('verificationCode', {
                                                required: 'OTP is required',
                                                pattern: {
                                                    value: /^[0-9]{6}$/,
                                                    message: 'OTP must be 6 digits',
                                                },
                                            })}
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                            <ErrorMessageP error={errors.verificationCode?.message} />
                        </div>

                        <Button
                            type="submit"
                            variant="default"
                            className="w-full group relative px-8 py-4 text-lg font-semibold rounded-full h-12"
                            disabled={isSubmitting || loading}
                        >
                            {isSubmitting || loading ? (
                                <div className="flex items-center gap-2">
                                    {/* <span className="text-sm">Submitting...</span> */}
                                    <Loader2 className="animate-spin" />
                                </div>
                            ) : (
                                <span className="relative z-10">Continue</span>
                            )}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900 to-gray-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </Button>

                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={resentOtp}
                                disabled={loading}
                                className="text-sm text-muted-foreground hover:text-foreground hover:underline cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Sending code…" : "Resend code"}
                            </button>
                        </div>
                    </form>

                    {/* Back to Login */}
                    <div className="text-center mt-6 md:mt-8">
                        <p className="text-sm text-muted-foreground">
                            Back to sign in?{" "}
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
