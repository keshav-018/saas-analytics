import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { redirect } from 'next/navigation'
import "../globals.css";
import "../theme.css";
import LayoutWrapper from "./LayoutWrapper";
import { createClient } from '@/lib/supabase/server'

const NunitoSans = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaS Analytics",
  description: "Open-source analytics platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()

  if (error || !data?.claims) {
    redirect('/')
  }

  return (
        <LayoutWrapper>
            {children}
        </LayoutWrapper>
  );
}
