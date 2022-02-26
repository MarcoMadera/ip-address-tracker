import type { NextApiRequest, NextApiResponse } from "next";
import { isValidIp } from "utils/isValidIp";

export default async function playlists(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const ip = isValidIp((req.query.ip as string) || "") ? req.query.ip : "";
  if (!(req.method === "GET")) {
    res.status(405).end();
    return;
  }

  try {
    const response = await fetch(
      `https://api.ipdata.co/${ip}?api-key=${process.env.IP_DATA_KEY}`
    );
    const data = await response.json();
    const mappedData = {
      ip: data.ip,
      lat: data.latitude,
      lon: data.longitude,
      country: data.country_name,
      region: data.region,
      city: data.city,
      isp: data.asn.name,
      time_zone: data.time_zone.name,
      region_code: data.region_code,
      postal: data.postal,
    };
    res.status(200).json(mappedData);
  } catch (err) {
    res.status(400).json(err);
  }
}
