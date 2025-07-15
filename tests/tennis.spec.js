// @ts-check
import { test, expect } from '@playwright/test';
import { gotoCart, navigateToCourtsPage, navigateToTennisHomePage, selectCourts, waitForBookingDetailsToLoad, waitForCartToLoad } from '../testutils/testutils';

const storageStatePath = 'playwright/.auth/session.json';

test('create-auth', async ({ page }) => {
  await navigateToTennisHomePage({ page });
  await page.pause();
  // Do login manually
  console.info('Test will pause here, do login manually. Playwright will capture the session.');
  await page.context().storageState({ path: storageStatePath });
  console.info('Session captured');
});

test.use({ storageState: storageStatePath });  // Apply session to all tests below

test('booking', async ({ page }) => {

  // Navigate to the courts page
  // select courts
  // wait for court details and timings to load
  // select day, time, court --> js obejct input

  await navigateToCourtsPage({ page, court: 'bethnal-green-gardens', date: '2025-07-22' });
  await waitForBookingDetailsToLoad({ page });
  await selectCourts({ page, timeslots: ['11am', '2pm', '3pm', '4pm'] });
  await gotoCart({ page });
  await waitForCartToLoad({ page });

});


