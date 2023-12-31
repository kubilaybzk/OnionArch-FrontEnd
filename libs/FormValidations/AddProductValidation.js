import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    default: "Geçersiz değer",
    required: " ${path} alanı zorunludur",
  },
  string: {
    min: "${path} en az ${min} karakter olmalıdır",
    max: "${path} en fazla ${max} karakter olmalıdır",
    email: "Geçerli bir e-posta adresi değil",
    matches:
      "${path} geçerli bir şifre formatı değil. Şifre, küçük harf, büyük harf ve özel karakter içermelidir.",
    oneOf: "Değerler eşleşmiyor",
  },
});

export const CrerateProductSchema = Yup.object().shape({
  Name: Yup.string().min(2).max(50).required(),
  Price: Yup.string().min(5).max(10).required(),
  Stock: Yup.string().email().required(),
});

export default { CrerateProductSchema };
