import React from "react";
import { Button } from "@/components/ui/button";

export interface CertificateCardProps {
  certificate_name: string;
  certificate_issuer: string;
  completion_score: number;
  showCertificate?: () => void;
}
function Certificatecard({
  certificate_name,
  certificate_issuer,
  completion_score,
  showCertificate,
}: CertificateCardProps) {
  return (
    <div
      className={
        "p-4 flex flex-col justify-between gap-4 items-center bg-white rounded-2xl sm:flex-row w-full"
      }
    >
      <div className={"flex gap-4 items-center"}>
        <div className={"flex flex-col gap-2"}>
          <h3 className={"text-lg font-bold text-neutral-950"}>
            Certificate of {certificate_name}
          </h3>
          <div className={"flex flex-col gap-2"}>
            <p className={"text-xs text-neutral-600"}>
              Certificate Issuer: {certificate_issuer}
            </p>
            <p className={"text-xs text-neutral-600"}>
              Your Grade: {completion_score}
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={showCertificate}
        className={"w-full sm:w-fit"}
        variant={"outline"}
        size={"sm"}
      >
        Show Certificate
      </Button>
    </div>
  );
}

export default Certificatecard;
