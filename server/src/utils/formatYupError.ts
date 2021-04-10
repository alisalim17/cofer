import { ValidationError } from "apollo-server-express";
import { FieldError } from "../modules/resolvers/types/Response/FieldError";

export const formatYupError = (err: ValidationError) => {
  const errors: Array<FieldError> = [];
  err.inner.forEach((e: { path: string; message: string }) => {
    errors.push({
      field: e.path,
      message: e.message,
    });
  });
  return errors;
};
