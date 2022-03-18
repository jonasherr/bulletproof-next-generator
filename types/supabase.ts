/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/comment": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.comment.id"];
          createdAt?: parameters["rowFilter.comment.createdAt"];
          body?: parameters["rowFilter.comment.body"];
          authorId?: parameters["rowFilter.comment.authorId"];
          discussionId?: parameters["rowFilter.comment.discussionId"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["comment"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** comment */
          comment?: definitions["comment"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.comment.id"];
          createdAt?: parameters["rowFilter.comment.createdAt"];
          body?: parameters["rowFilter.comment.body"];
          authorId?: parameters["rowFilter.comment.authorId"];
          discussionId?: parameters["rowFilter.comment.discussionId"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.comment.id"];
          createdAt?: parameters["rowFilter.comment.createdAt"];
          body?: parameters["rowFilter.comment.body"];
          authorId?: parameters["rowFilter.comment.authorId"];
          discussionId?: parameters["rowFilter.comment.discussionId"];
        };
        body: {
          /** comment */
          comment?: definitions["comment"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/discussion": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.discussion.id"];
          createdAt?: parameters["rowFilter.discussion.createdAt"];
          title?: parameters["rowFilter.discussion.title"];
          body?: parameters["rowFilter.discussion.body"];
          teamId?: parameters["rowFilter.discussion.teamId"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["discussion"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** discussion */
          discussion?: definitions["discussion"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.discussion.id"];
          createdAt?: parameters["rowFilter.discussion.createdAt"];
          title?: parameters["rowFilter.discussion.title"];
          body?: parameters["rowFilter.discussion.body"];
          teamId?: parameters["rowFilter.discussion.teamId"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.discussion.id"];
          createdAt?: parameters["rowFilter.discussion.createdAt"];
          title?: parameters["rowFilter.discussion.title"];
          body?: parameters["rowFilter.discussion.body"];
          teamId?: parameters["rowFilter.discussion.teamId"];
        };
        body: {
          /** discussion */
          discussion?: definitions["discussion"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/team": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.team.id"];
          createdAt?: parameters["rowFilter.team.createdAt"];
          name?: parameters["rowFilter.team.name"];
          description?: parameters["rowFilter.team.description"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["team"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** team */
          team?: definitions["team"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.team.id"];
          createdAt?: parameters["rowFilter.team.createdAt"];
          name?: parameters["rowFilter.team.name"];
          description?: parameters["rowFilter.team.description"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.team.id"];
          createdAt?: parameters["rowFilter.team.createdAt"];
          name?: parameters["rowFilter.team.name"];
          description?: parameters["rowFilter.team.description"];
        };
        body: {
          /** team */
          team?: definitions["team"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/users": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.users.id"];
          createdAt?: parameters["rowFilter.users.createdAt"];
          firstName?: parameters["rowFilter.users.firstName"];
          lastName?: parameters["rowFilter.users.lastName"];
          role?: parameters["rowFilter.users.role"];
          teamId?: parameters["rowFilter.users.teamId"];
          bio?: parameters["rowFilter.users.bio"];
          email?: parameters["rowFilter.users.email"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["users"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** users */
          users?: definitions["users"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.users.id"];
          createdAt?: parameters["rowFilter.users.createdAt"];
          firstName?: parameters["rowFilter.users.firstName"];
          lastName?: parameters["rowFilter.users.lastName"];
          role?: parameters["rowFilter.users.role"];
          teamId?: parameters["rowFilter.users.teamId"];
          bio?: parameters["rowFilter.users.bio"];
          email?: parameters["rowFilter.users.email"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.users.id"];
          createdAt?: parameters["rowFilter.users.createdAt"];
          firstName?: parameters["rowFilter.users.firstName"];
          lastName?: parameters["rowFilter.users.lastName"];
          role?: parameters["rowFilter.users.role"];
          teamId?: parameters["rowFilter.users.teamId"];
          bio?: parameters["rowFilter.users.bio"];
          email?: parameters["rowFilter.users.email"];
        };
        body: {
          /** users */
          users?: definitions["users"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  comment: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    createdAt?: string;
    /** Format: text */
    body?: string;
    /** Format: character varying */
    authorId?: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `discussion.id`.<fk table='discussion' column='id'/>
     */
    discussionId?: number;
  };
  discussion: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    createdAt?: string;
    /** Format: character varying */
    title?: string;
    /** Format: text */
    body?: string;
    /** Format: character varying */
    teamId?: string;
  };
  team: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    createdAt?: string;
    /** Format: character varying */
    name?: string;
    /** Format: text */
    description?: string;
  };
  users: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    createdAt: string;
    /** Format: character varying */
    firstName: string;
    /** Format: character varying */
    lastName: string;
    /** Format: character varying */
    role: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `team.id`.<fk table='team' column='id'/>
     */
    teamId?: number;
    /** Format: text */
    bio?: string;
    /** Format: character varying */
    email: string;
  };
}

export interface parameters {
  /** @description Preference */
  preferParams: "params=single-object";
  /** @description Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** @description Preference */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description comment */
  "body.comment": definitions["comment"];
  /** Format: bigint */
  "rowFilter.comment.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.comment.createdAt": string;
  /** Format: text */
  "rowFilter.comment.body": string;
  /** Format: character varying */
  "rowFilter.comment.authorId": string;
  /** Format: bigint */
  "rowFilter.comment.discussionId": string;
  /** @description discussion */
  "body.discussion": definitions["discussion"];
  /** Format: bigint */
  "rowFilter.discussion.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.discussion.createdAt": string;
  /** Format: character varying */
  "rowFilter.discussion.title": string;
  /** Format: text */
  "rowFilter.discussion.body": string;
  /** Format: character varying */
  "rowFilter.discussion.teamId": string;
  /** @description team */
  "body.team": definitions["team"];
  /** Format: bigint */
  "rowFilter.team.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.team.createdAt": string;
  /** Format: character varying */
  "rowFilter.team.name": string;
  /** Format: text */
  "rowFilter.team.description": string;
  /** @description users */
  "body.users": definitions["users"];
  /** Format: bigint */
  "rowFilter.users.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.users.createdAt": string;
  /** Format: character varying */
  "rowFilter.users.firstName": string;
  /** Format: character varying */
  "rowFilter.users.lastName": string;
  /** Format: character varying */
  "rowFilter.users.role": string;
  /** Format: bigint */
  "rowFilter.users.teamId": string;
  /** Format: text */
  "rowFilter.users.bio": string;
  /** Format: character varying */
  "rowFilter.users.email": string;
}

export interface operations {}

export interface external {}
