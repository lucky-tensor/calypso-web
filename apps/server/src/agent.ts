import { spawn } from "node:child_process";
import { PRDSchema } from "@calypso/core";

/**
 * Agent Bridge
 * Executes the Claude CLI to generate a PRD based on captured schema.
 */
export const AgentBridge = {
    generatePRD: async (data: PRDSchema): Promise<string> => {
        const prompt = `
            Generate a comprehensive PRD (prd.md) based on the following architectural blueprint:
            Project: ${data.projectName}
            Vision: ${data.vision}
            Units: ${JSON.stringify(data.units)}
            
            Follow the Calypso documentation standards.
        `;

        return new Promise((resolve, reject) => {
            const claude = spawn("claude", ["-p", prompt]);
            let output = "";

            claude.stdout.on("data", (data) => {
                output += data.toString();
            });

            claude.on("close", (code) => {
                if (code === 0) resolve(output);
                else reject(new Error(`Claude CLI exited with code ${code}`));
            });
        });
    }
};
