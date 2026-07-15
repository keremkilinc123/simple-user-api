const { body, validationResult } = require("express-validator");

// Register Validation
const registerValidation = [

    body("name")
        .trim()
        .isLength({ min: 3 })
        .withMessage("İsim en az 3 karakter olmalıdır."),

    body("email")
        .isEmail()
        .withMessage("Geçerli bir email giriniz."),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Şifre en az 6 karakter olmalıdır."),

    body("age")
        .isInt({ min: 0 })
        .withMessage("Yaş 0 veya daha büyük olmalıdır.")

];

// Login Validation
const loginValidation = [

    body("email")
        .isEmail()
        .withMessage("Geçerli bir email giriniz."),

    body("password")
        .notEmpty()
        .withMessage("Şifre boş olamaz.")

];

// Validation Sonucu
function validate(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            errors: errors.array()
        });

    }

    next();

}

module.exports = {
    registerValidation,
    loginValidation,
    validate
};