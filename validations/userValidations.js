import yup from "yup";
import parse from "date-fns/parse/index.js";

const schemas = {
  updateUserInfoSchema: yup.object({
    body: yup.object({
      first_name: yup
        .string()
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr)),
      last_name: yup
        .string()
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr)),
      gender: yup
        .boolean()
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr)),
      phone: yup
        .string()
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr))
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "not a valid Vietnam phone number"
        ),
      address: yup
        .string()
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr)),
      //   DoB: yup
      //     .date()
      //     .nullable()
      //     .transform((curr, orig) => (orig === "" ? null : curr))
      //     .transform(function (value, originalValue) {
      //       if (!value || this.isType(value)) {
      //         return value;
      //       }
      //       const result = parse(originalValue, "dd.MM.yyyy", new Date());
      //       return result;
      //     })
      //     .typeError("please enter a valid date"),
    }),
  }),

  changePasswordSchema: yup.object({
    body: yup.object({
      current_password: yup.string().required(),
      new_password: yup.string().required(),
      confirm_password: yup.string().required(),
    }),
  }),
};

export default schemas;
