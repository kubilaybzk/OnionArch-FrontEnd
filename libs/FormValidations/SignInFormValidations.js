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
      "${path} geçerli bir şifre formatı değil.",
    oneOf: "Değerler eşleşmiyor",
  },
});

export const SigInSchema = Yup.object().shape({
  UserNameOrEmail: Yup.string().min(5).max(10).required(),
  Password: Yup.string()
    .min(8)
    .max(50)
    .required(),
});

export default { SigInSchema };
