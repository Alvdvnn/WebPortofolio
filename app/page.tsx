// src/app/page.tsx
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <main>
      {/* PageLoader sekarang bertanggung jawab untuk merender 
          semua bagian halaman setelah loading selesai.
      */}
      <PageLoader />
    </main>
  );
}