import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

/**
 * Golden Fixture Utility
 * 
 * This tool manages "golden" fixtures of real production API responses.
 * Per the Calypso Blueprint, we never mock; we use recorded real data.
 */
export class GoldenFixtureManager {
    private fixturesDir: string;

    constructor(fixturesDir: string = './tests/fixtures') {
        this.fixturesDir = fixturesDir;
    }

    /**
     * Loads a recorded fixture by name.
     */
    async loadFixture<T>(name: string): Promise<T> {
        const filePath = path.join(this.fixturesDir, `${name}.json`);
        const content = await readFile(filePath, 'utf-8');
        return JSON.parse(content) as T;
    }

    /**
     * Records a new fixture from a real API response.
     * This should only be used during "Fixture Recording" sessions.
     */
    async recordFixture(name: string, data: any): Promise<void> {
        await mkdir(this.fixturesDir, { recursive: true });
        const filePath = path.join(this.fixturesDir, `${name}.json`);
        await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`[GOLDEN] Recorded fixture: ${name}`);
    }
}
