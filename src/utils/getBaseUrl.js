const baseUrl = import.meta.env.BASE_URL;

export function getBaseUrl() {
  return window.location.host.includes(baseUrl) ? "" : baseUrl;
}
