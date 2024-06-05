import { randAlphaNumeric } from "@ngneat/falso";

export const createOrderId = () => {
  return randAlphaNumeric({ length: 5 }).join("");
};
