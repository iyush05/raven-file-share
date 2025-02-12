
export default function RandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  let randomString = '';
  while (counter < length) {
    randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return randomString;
}