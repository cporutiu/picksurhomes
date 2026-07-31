import { ImageResponse } from "next/og";
import {
  OgImageContent,
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
} from "./shared-og-image";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return new ImageResponse(<OgImageContent />, { ...size });
}
