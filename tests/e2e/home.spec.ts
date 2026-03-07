import { test, expect } from '@playwright/test';

/**
 * Basic E2E Test Stub
 * 
 * E2E tests drive the real application in a headless browser.
 * Validates full user story flows.
 */
test.describe('Home Page', () => {
    test('should show the landing page', async ({ page }: { page: any }) => {
        await page.goto('/');

        // Check for the presence of the main heading
        const title = page.locator('h1');
        await expect(title).toContainText('Calypso PRD Wizard');
    });

    test('health check endpoint is accessible', async ({ request }: { request: any }) => {
        const response = await request.get('/health');

        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        expect(data.status).toBe('ok');
    });
});
