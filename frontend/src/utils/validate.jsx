export const validateRegisterForm = (form) => {
    const errs = {};
  
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(form.username)) {
      errs.username = "Логин должен содержать только латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов";
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Неверный формат email";
    }
  
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/.test(form.password)) {
      errs.password = "Пароль: не менее 6 символов, должен содержать 1 заглавную букву, 1 цифру, 1 спецсимвол";
    }
  
    if (!form.fullName.trim()) {
      errs.fullName = "Укажите полное имя";
    }
  
    return errs;
};