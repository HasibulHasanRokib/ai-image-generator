import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function GalleyLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-5">
        <Link
          href={"/"}
          className={buttonVariants({
            variant: "outline",
          })}
        >
          <ArrowLeft />
          Back
        </Link>
      </div>
      {children}
      {modal}
    </>
  );
}
