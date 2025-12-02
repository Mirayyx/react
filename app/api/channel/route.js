// app/api/channel/route.js
import { NextResponse } from "next/server";

const REMOTE_API = "https://api-faa.my.id/faa/react-channel";

export async function GET() {
  try {
    const res = await fetch(REMOTE_API, {
      // Biar Vercel boleh cache dikit tapi tetap bisa di-refresh kalau mau.
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { status: false, message: "Gagal memuat data dari server asli." },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        status: false,
        message: "Terjadi kesalahan saat menghubungi API.",
        error: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
