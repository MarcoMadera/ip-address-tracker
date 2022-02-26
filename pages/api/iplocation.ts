import type { NextApiRequest, NextApiResponse } from "next";
import { isValidDomain } from "utils/isValidDomain";
import { isValidIp } from "utils/isValidIp";
import { getDomainOnly } from "utils/getDomainOnly";
import { Type } from "types/data";

export default async function ipLocation(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const ipAddress = req.body.ipAddress;
  const type = req.body.type;
  const isValidIpAddress = isValidIp(ipAddress);
  const isValidDomainAddress = isValidDomain(ipAddress);
  const ip = isValidIpAddress || isValidDomainAddress ? ipAddress : "";
  const onloadIpEndpoint = `https://ipwhois.app/json/${ip}`;
  const ipAdressEndpoint = `https://api.ipdata.co/${ip}?api-key=${process.env.IP_DATA_KEY}`;
  const domainAdressEndpoint = `https://geo.ipify.org/api/v1?apiKey=${
    process.env.DOMAIN_DATA_KEY
  }&domain=${getDomainOnly(ip)}`;
  const endpoint =
    type === Type.ONLOAD
      ? onloadIpEndpoint
      : isValidIpAddress
      ? ipAdressEndpoint
      : domainAdressEndpoint;

  if (!(req.method === "POST")) {
    res.status(405).end();
    return;
  }

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Something went wrong with that request");
    }
    const data = await response.json();
    const mappedData = {
      ip: data.ip,
      lat: data?.latitude || data?.location?.lat,
      lon: data?.longitude || data?.location?.lng,
      country: data?.country_name || data?.location?.country || data?.country,
      region: data?.region || data?.location?.region,
      city: data?.city || data?.location?.city,
      isp: data?.asn?.name || data?.isp,
      time_zone:
        data?.time_zone?.name ||
        data?.location?.timezone ||
        data?.timezone_name ||
        data?.timezone,
      region_code: data?.region_code || null,
      postal: data?.postal || data?.location?.postalCode || null,
    };
    res.status(200).json(mappedData);
  } catch (err) {
    res.status(400).json(err);
  }
}
