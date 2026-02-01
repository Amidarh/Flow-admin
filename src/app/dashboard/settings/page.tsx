"use client";

import {
  ProfileSection,
  PasswordSection,
  TwoFactorSection,
  LogoutSection,
} from "@/modules/settings";

// Mock current user – replace with real auth state
const MOCK_CURRENT_USER = {
  displayName: "Admin",
  email: "admin@Flow.com",
  twoFactorEnabled: false,
};

export default function SettingsPage() {
  const handleProfileUpdate = async (data: { displayName: string; email: string }) => {
    // TODO: Call API to update profile
    await new Promise((r) => setTimeout(r, 600));
    console.log("Profile update", data);
  };

  const handlePasswordUpdate = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    // TODO: Call API to update password
    await new Promise((r) => setTimeout(r, 600));
    console.log("Password update");
  };

  const handleTwoFactorToggle = async (enabled: boolean) => {
    // TODO: Call API to enable/disable 2FA
    await new Promise((r) => setTimeout(r, 400));
    console.log("2FA toggle", enabled);
  };

  const handleTwoFactorVerify = async (code: string) => {
    // TODO: Call API to verify 2FA setup
    await new Promise((r) => setTimeout(r, 500));
    console.log("2FA verify", code);
  };

  const handleLogout = async () => {
    // TODO: Call API to invalidate session / clear tokens
    await new Promise((r) => setTimeout(r, 200));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">Settings</h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Manage your account, security, and sign out.
        </p>
      </div>

      <div className="space-y-6">
        <ProfileSection
          defaultDisplayName={MOCK_CURRENT_USER.displayName}
          defaultEmail={MOCK_CURRENT_USER.email}
          onUpdate={handleProfileUpdate}
        />
        <PasswordSection onUpdate={handlePasswordUpdate} />
        <TwoFactorSection
          defaultEnabled={MOCK_CURRENT_USER.twoFactorEnabled}
          onToggle={handleTwoFactorToggle}
          onVerifySetup={handleTwoFactorVerify}
        />
        <LogoutSection onLogout={handleLogout} />
      </div>
    </div>
  );
}
