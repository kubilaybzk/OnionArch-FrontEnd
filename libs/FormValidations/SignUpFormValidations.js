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

export const SignupSchema = Yup.object().shape({
  NameSurname: Yup.string().min(2).max(50).required(),
  UserName: Yup.string().min(5).max(10).required(),
  Email: Yup.string().email().required(),
  Password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/,
      "Şifre en az bir küçük ve büyük harf ve bir özel karakter içermelidir."
    )
    .min(8)
    .max(50)
    .required(),
  Confirmpassword: Yup.string()
    .oneOf([Yup.ref("Password"), "Şifreler eşleşmiyor"])
    .required(),
});

export default { SignupSchema };
