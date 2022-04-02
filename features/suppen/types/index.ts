export type SuppenType = {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.&lt;pk/&gt;
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string;
    /** Format: character varying */
    title: string;
    /** Format: text */
    body?: string;
    /** Format: real */
    Float?: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to &#x60;discussions.id&#x60;.&lt;fk table&#x3D;&#x27;discussions&#x27; column&#x3D;&#x27;id&#x27;/&gt;
     */
    ForeignKeyTest?: number;
  };