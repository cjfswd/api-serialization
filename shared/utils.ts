export const options = ["json", "yaml", "xml", "csv"] as const;
export type IOption = typeof options[number];