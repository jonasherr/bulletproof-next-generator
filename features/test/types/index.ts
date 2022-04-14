import { BaseEntity } from "@/types";

export type TestType = {
  createdAt?: string, 
  test?: string, 
  testNumber?: number, 
  mitLeerzeichen?: string, 
} & BaseEntity;