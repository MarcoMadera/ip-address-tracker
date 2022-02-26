/* eslint-disable @typescript-eslint/no-explicit-any */
export function makeAPIRequest(
  endpoint: string,
  requestPayload: object,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onSuccess: any,
  onError: (message: string) => void
): void {
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestPayload),
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Something went wrong with that request");
      }
      return res.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => onError(err.message));
}
