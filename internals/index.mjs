import dotenv from "dotenv"
import {featureGenerator} from "./feature/featureGenerator.mjs";

dotenv.config()

export const OPENAPITSURL =
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`;

featureGenerator();
