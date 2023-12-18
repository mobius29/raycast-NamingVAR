import { VariableCase } from "../types/variable";

export const makePrompt = (variable: string) => `
Follow the steps. Only show the JSON result of step 3 to your partner
1. Recommend a variable name for text "${variable}".
  If text is not English, translate it to English first.
  If name has 4 or more words, summarize it.
2. Make it a variable name to be used in the following cases.
    snake_case:
    camelCase:
    PascalCase:
    kebab-case:
3. Make these variable names to JSON Format. Like
  {
    "snake_case": snake case result of step 2,
    "camelCase": camel case result of step 2,
    "PascalCase": Pascal case result of step 2,
    "kebab-case": kebab case result of step 2
  }
`;

export const parseVariableFromText = (text: string): VariableCase => {
  return JSON.parse(text);
};
