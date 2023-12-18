import OpenAI from "openai";

import { Clipboard, Form, getPreferenceValues, showToast } from "@raycast/api";

import { makePrompt, parseVariableFromText } from "./utils/chat";
import { FormValues } from "./types/form";
import Actions from "./components/Actions";
import { useState } from "react";
import { VariableCase, VariableType } from "./types/variable";

export default function Command() {
  const prefernces = getPreferenceValues<Preferences>();
  const openai = new OpenAI({ apiKey: prefernces.API_Key });
  const [cases, setCases] = useState<VariableCase>({
    snake_case: "",
    camelCase: "",
    PascalCase: "",
    "kebab-case": "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    const content = makePrompt(values.variable);

    setIsLoading(true);
    const response = await openai.chat.completions.create({
      model: values.model,
      messages: [{ role: "user", content }],
    });

    if (!response.choices[0].message.content) {
      return;
    }

    // remove line breaks
    const jsonData = response.choices[0].message.content.replace(/\n/g, "").match(/\{.*\}/)?.[0] ?? '';
    const json = parseVariableFromText(jsonData);
    if (!json) {
      showToast({ title: "JSON Parsing Error", message: "Failed to parse variable from text. Please try again" });
      return;
    }

    setCases(json);
    setIsLoading(false);
  };

  const handleCopy = async (variable: VariableType) => {
    await Clipboard.copy(cases[variable]);

    showToast({ title: "Copied to Clipboard", message: `${variable} copied to clipboard` });
  };

  return (
    <Form actions={<Actions handleSubmit={handleSubmit} handleCopy={handleCopy} />} isLoading={isLoading}>
      <Form.Dropdown id="model" title="Model" defaultValue="gpt-3.5-turbo">
        <Form.Dropdown.Item title="gpt-3.5-turbo" value="gpt-3.5-turbo" />
        <Form.Dropdown.Item title="gpt-4" value="gpt-4" />
      </Form.Dropdown>
      <Form.TextField
        id="variable"
        title="Variable"
        placeholder="Enter description of what you want to make variable"
        defaultValue=""
      />
      <Form.Separator />
      <Form.TextField id="snake_case" title="Snake Case" value={cases["snake_case"]} />
      <Form.TextField id="camelCase" title="Camel Case" value={cases["camelCase"]} />
      <Form.TextField id="PascalCase" title="Pascal Case" value={cases["PascalCase"]} />
      <Form.TextField id="kebab-case" title="Kebab Case" value={cases["kebab-case"]} />
    </Form>
  );
}
