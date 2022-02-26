const domainValidate = RegExp(
  /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
);

export function isValidDomain(domain: string): boolean {
  return domainValidate.test(domain);
}
