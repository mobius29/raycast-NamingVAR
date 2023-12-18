import { Action, ActionPanel, openExtensionPreferences } from "@raycast/api";
import { FormValues } from "../types/form";
import { VariableType } from "../types/variable";

interface Props {
  handleSubmit: (values: FormValues) => void;
  handleCopy: (variable: VariableType) => void;
}

const Actions: React.FC<Props> = ({ handleSubmit, handleCopy }) => {
  return (
    <ActionPanel>
      <Action.SubmitForm onSubmit={handleSubmit} />
      <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
      <Action
        title="Copy Snake Case to Clipboard"
        shortcut={{ modifiers: ["cmd", "shift"], key: "s" }}
        onAction={() => handleCopy("snake_case")}
      />
      <Action
        title="Copy Camel Case to Clipboard"
        shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
        onAction={() => handleCopy("camelCase")}
      />
      <Action
        title="Copy Pascal Case to Clipboard"
        shortcut={{ modifiers: ["cmd", "shift"], key: "p" }}
        onAction={() => handleCopy("PascalCase")}
      />
      <Action
        title="Copy Kebab Case to Clipboard"
        shortcut={{ modifiers: ["cmd", "shift"], key: "k" }}
        onAction={() => handleCopy("kebab-case")}
      />
    </ActionPanel>
  );
};

export default Actions;
