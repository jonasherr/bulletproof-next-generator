import { authHandlers } from "./auth";
import { commentsHandlers } from "./comments";
import { discussionsHandlers } from "./discussions";
import { usersHandlers } from "./users";

export const handlers = [
  ...authHandlers,
  ...commentsHandlers,
  ...discussionsHandlers,
  ...usersHandlers,
];
