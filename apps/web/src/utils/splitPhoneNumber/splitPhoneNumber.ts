export function splitPhoneNumber(phone: string) {
  return phone.match(/.{2}/g)?.join('-') ?? phone;
}
