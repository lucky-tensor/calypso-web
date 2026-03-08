import { Database } from "bun:sqlite";
import { PRDSchema } from "@calypso/core";

/**
 * DB Instance
 * Using Bun's native high-performance SQLite engine.
 */
const db = new Database("prd_wizard.sqlite");

// Initialize schema
db.query(`
  CREATE TABLE IF NOT EXISTS prd_sessions (
    id TEXT PRIMARY KEY,
    project_name TEXT,
    data TEXT,
    updated_at TEXT
  )
`).run();

export const PrdDb = {
    saveSession: (id: string, data: PRDSchema) => {
        db.query(`
            INSERT INTO prd_sessions (id, project_name, data, updated_at)
            VALUES ($id, $projectName, $data, $updatedAt)
            ON CONFLICT(id) DO UPDATE SET
                project_name = excluded.project_name,
                data = excluded.data,
                updated_at = excluded.updated_at
        `).run({
            $id: id,
            $projectName: data.projectName,
            $data: JSON.stringify(data),
            $updatedAt: new Date().toISOString()
        });
    },

    getSession: (id: string): PRDSchema | null => {
        const result = db.query("SELECT data FROM prd_sessions WHERE id = ?").get(id) as { data: string } | undefined;
        return result ? JSON.parse(result.data) : null;
    }
};
