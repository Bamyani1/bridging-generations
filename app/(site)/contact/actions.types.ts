export type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<"name" | "email" | "message", string>>;
};

export const initialContactState: ContactActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
