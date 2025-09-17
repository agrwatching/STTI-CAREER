import { Suspense } from "react";
import BuatLowonganContent from "./BuatLowonganContent";

export default function BuatLowonganPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuatLowonganContent />
    </Suspense>
  );
}
