import { VariableCase } from "../types/variable";

export const makePrompt = (variable: string) => `
Follow the steps. Only show the result of step 3 to your partner
1. Translate "${variable}" to English.
2. Make it a variable name to be used in the following cases.
    snake_case:
    camelCase:
    PascalCase:
    kebab-case:
3. Make these variable names to JSON Format. Like
  {
    "snake_case": snake_case_result,
    "camelCase": camelCase_result,
    "PascalCase": PascalCase_result,
    "kebab-case": kebab-case_result
  }
`;

export const parseVariableFromText = (text: string): VariableCase | null => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};
