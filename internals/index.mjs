import dotenv from "dotenv"
import axios from "axios";
import {readFileSync} from "fs";
import {featureGenerator} from "./feature/featureGenerator.mjs";

dotenv.config()

if (process.env.SWAGGER_SPECIFICATION_FILE_PATH)
 {
     const swaggerSpecification = JSON.parse(readFileSync(process.env.SWAGGER_SPECIFICATION_FILE_PATH).toString())
     featureGenerator({swaggerSpecification, mode: "filePath"})
} else if (!process.env.SWAGGER_SPECIFICATION_URL && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { data: swaggerSpecification } = await axios(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`);
    featureGenerator({swaggerSpecification, mode: "supabase"})
} else {
    const { data: swaggerSpecification } = await axios(process.env.SWAGGER_SPECIFICATION_URL);
    featureGenerator({swaggerSpecification, mode: "url"})
}
