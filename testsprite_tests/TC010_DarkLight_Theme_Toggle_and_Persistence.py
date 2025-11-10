import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:5173", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Locate and click the theme toggle button to switch theme
        frame = context.pages[-1]
        # Click the theme toggle button to switch between dark and light modes
        elem = frame.locator('xpath=html/body/div/div/header/nav/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Refresh the page to check if the dark mode theme persists after reload
        await page.goto('http://localhost:5173/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Click the theme toggle button again to switch back to light mode and verify UI and localStorage update
        frame = context.pages[-1]
        # Click the theme toggle button to switch back to light mode
        elem = frame.locator('xpath=html/body/div/div/header/nav/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Refresh the page to confirm the light theme persists after reload
        await page.goto('http://localhost:5173/', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        # Assert that the page contains the text 'Kiran Regmi' to confirm page loaded correctly
        await expect(frame.locator('text=Kiran Regmi').first).to_be_visible(timeout=30000)
        # Assert that the page contains the text 'Home' to confirm navigation elements are visible
        await expect(frame.locator('text=Home').first).to_be_visible(timeout=30000)
        # Assert that the page contains the text 'About' to confirm navigation elements are visible
        await expect(frame.locator('text=About').first).to_be_visible(timeout=30000)
        # Assert that the page contains the text 'Skills' to confirm navigation elements are visible
        await expect(frame.locator('text=Skills').first).to_be_visible(timeout=30000)
        # Assert that the page contains the text 'Projects' to confirm navigation elements are visible
        await expect(frame.locator('text=Projects').first).to_be_visible(timeout=30000)
        # Assert that the page contains the text 'Resume' to confirm navigation elements are visible
        await expect(frame.locator('text=Resume').first).to_be_visible(timeout=30000)
        # Assert that the page contains the text 'Contact' to confirm navigation elements are visible
        await expect(frame.locator('text=Contact').first).to_be_visible(timeout=30000)
        # Assert that the page contains the text 'Hi, I'm Kiran Regmi' to confirm introduction text is visible
        await expect(frame.locator('text=Hi, I'm Kiran Regmi').first).to_be_visible(timeout=30000)
        # Assert that the page contains the text 'I build performant, delightful apps with React, React Native, Firebase, MySQL, and Node.js.' to confirm introduction details are visible
        await expect(frame.locator('text=I build performant, delightful apps with React, React Native, Firebase, MySQL, and Node.js.').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    