export type ValidationBody = "VERIFIED" | "INVALID";

interface ValidationResponse {
  data: ValidationBody;
}

export default ValidationResponse;
