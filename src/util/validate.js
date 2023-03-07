export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validatePhone(phone) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  return re.test(phone)
}
