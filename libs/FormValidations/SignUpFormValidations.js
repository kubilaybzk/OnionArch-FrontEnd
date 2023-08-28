import * as Yup from 'yup';


Yup.setLocale({
  mixed: {
    default: 'Geçersiz değer',
    required: ' ${path} alanı zorunludur',
  },
  string: {
    min: '${path} en az ${min} karakter olmalıdır',
    max: '${path} en fazla ${max} karakter olmalıdır',
    email: 'Geçerli bir e-posta adresi değil',
    matches: '${path} geçerli bir şifre formatı değil. Şifre en az bir küçük harf, bir büyük harf ve bir özel karakter içermelidir.',
    oneOf: 'Değerler eşleşmiyor',
  },
});

export const SignupSchema = Yup.object().shape({
  NameSurname: Yup.string()
    .min(2)
    .max(50)
    .required(),
  UserName: Yup.string()
    .min(5)
    .max(10)
    .required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/,
      'Şifre en az bir küçük harf, bir büyük harf ve bir özel karakter içermelidir.'
    )
    .min(8)
    .max(50)
    .required(),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null],)
    .required(),
});









export function SignUpFormValidations(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } 
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.NameSurname) {
    errors.email = "Required";
  } 
  else if (values.NameSurname.leghth<3) {
    errors.email = "Invalid email address";
  }
  return errors;
}



export default {SignupSchema,SignUpFormValidations}