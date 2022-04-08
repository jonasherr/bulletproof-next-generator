import * as dotenv from "dotenv";
import axios from "axios";
import { readFileSync } from "fs";
import { featureGenerator, modeEnum } from "./feature/featureGenerator";

dotenv.config();

const index = async () => {
  if (process.env.SWAGGER_SPECIFICATION_FILE_PATH) {
    const swaggerSpecification = JSON.parse(
      readFileSync(process.env.SWAGGER_SPECIFICATION_FILE_PATH).toString()
    );
    await featureGenerator({ swaggerSpecification, mode: modeEnum.FILEPATH });
  } else if (
    !process.env.SWAGGER_SPECIFICATION_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const { data: swaggerSpecification } = await axios(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
    );
    await featureGenerator({ swaggerSpecification, mode: modeEnum.SUPABASE });
  } else if (process.env.SWAGGER_SPECIFICATION_URL) {
    const { data: swaggerSpecification } = await axios(
      process.env.SWAGGER_SPECIFICATION_URL
    );
    await featureGenerator({ swaggerSpecification, mode: modeEnum.URL });
  } else {
    console.error("Swagger file, or URL to specification must be set in .env.");
  }
};

index();
