export type VariableType = "snake_case" | "camelCase" | "PascalCase" | "kebab-case";

export type VariableCase = {
  [key in VariableType]: string;
};
