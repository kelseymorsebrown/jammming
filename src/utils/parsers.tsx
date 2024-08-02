/**
 * Obtains parameters from the hash of the URL
 */
export function getHashParams() {
  type HashParams = {
    [key: string]: string;
  };

  let hashParams: HashParams = {};

  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);

  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

/**
 * Obtains parameters from the hash of the URL
 */
export function getQueryParams() {
  type QueryParams = {
    [key: string]: string;
  };

  let queryParams: QueryParams = {};

  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.search.substring(1);

  while ((e = r.exec(q))) {
    queryParams[e[1]] = decodeURIComponent(e[2]);
  }
  return queryParams;
}
