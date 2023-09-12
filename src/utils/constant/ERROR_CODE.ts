import {
  ValidationError,
  UniqueConstraintError,
  EmptyResultError,
  DatabaseError,
} from "sequelize";

const ERROR_CODE = {
  SequelizeValidationError: {
    message: "Input validation ERROR",
    errorInstance: ValidationError,
    code: 422,
  },
  SequelizeUniqueConstraintError: {
    message: "Input validation ERROR: Unique",
    errorInstance: UniqueConstraintError,
    code: 422,
  },
  NotFoundError: {
    message: "Result Not Found",
    errorInstance: EmptyResultError,
    code: 404,
  },
  SequelizeDatabaseError: {
    message: "Database Error",
    errorInstance: DatabaseError,
    code: 500,
  },
};

export default ERROR_CODE;
