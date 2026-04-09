export function interpolate(
  text: string,
  params?: Record<string, unknown>,
): string {
  if (!params) return text;

  return text.replace(
    /\{\{(\w+)\}\}|\{(\w+)\}/g,
    (_, doubleKey: string | undefined, singleKey: string | undefined) => {
      const key = doubleKey ?? singleKey ?? "";
      const value = params[key];
      return value == null ? `{{${key}}}` : String(value);
    },
  );
}
