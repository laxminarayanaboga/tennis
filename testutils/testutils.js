
import { expect } from "@playwright/test";

export async function navigateToTennisHomePage({ page }) {
    const url = `https://tennistowerhamlets.com/`;
    console.info(`Navigating to tennis home page: ${url}`);
    await page.goto(url);
    console.info(`Navigated to tennis home page: ${url}`);
}

export async function navigateToCourtsPage({ page, court, date }) {
    // format: https://tennistowerhamlets.com/book/courts/bethnal-green-gardens/2025-07-22#book
    const url = `https://tennistowerhamlets.com/book/courts/${court}/${date}#book`;
    console.info(`Navigating to courts page: ${url}`);
    await page.goto(url);
    console.info(`Navigated to courts page: ${url}`);

}

export async function waitForBookingDetailsToLoad({page}) {
    await expect(page.getByRole('heading', { name: 'Book courts at' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Today' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tomorrow' })).toBeVisible();
    console.info(`Booking details loaded successfully.`);
}

export async function selectCourts({ page, timeslots }) {
    for (const t of timeslots) {
        await selectCourt({ page, timeslot: t });
    }
}

// Attempts to select exactly **one** available court for the specified timeslot.
// - If any court is available, selects and returns it immediately.
// - If no courts are available, logs a warning and returns without selection.
export async function selectCourt({ page, timeslot }) {
    console.info(`Selecting one available court for time: ${timeslot}`);
    const xpath_court_checkbox = `//table//tr[./th[text()="${timeslot}"]]//input[@class="bookable"]`;
    const courts = page.locator(`xpath=${xpath_court_checkbox}`);
    const count = await courts.count();
    if (count > 0) {
        const courtInfo = await courts.nth(0).locator(`xpath=/following-sibling::span[1]`).textContent();
        console.info(`Found available court for ${timeslot}: ${courtInfo}`);
        await courts.nth(0).click();
    } else {
        console.warn(`No available courts found for time: ${timeslot}`);
    }
}

export async function gotoCart({ page }) {
    await page.getByRole('link', { name: 'Shopping basket' }).click();
}

export async function waitForCartToLoad({ page }) {
    await expect(page.getByText('Order summary')).toBeVisible();
    await page.pause();
}