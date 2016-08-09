export function uncomment(str) {
  let regex = /(<!--)([\s\S]*?)(-->)/g;
  let res = regex.exec(str);
  let cleaned = '';
  if (res !== null) {
    cleaned = res[2];
  }
  return cleaned;
}
