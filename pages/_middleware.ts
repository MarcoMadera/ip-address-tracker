import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  if (request.cookies.resiplocation || !request.ip || !request.geo?.latitude) {
    return NextResponse.next();
  }
  return NextResponse.next().cookie(
    "resiplocation",
    `${request.ip}[;${request.geo?.latitude}[;${request.geo?.longitude}[;${request.geo?.country}[;${request.geo?.region}[;${request.geo?.city}`
  );
}
