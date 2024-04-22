from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Initialize the Firefox options
firefox_options = webdriver.FirefoxOptions()

# Set the browser window to be visible
firefox_options.headless = False

# Initialize the Firefox driver with options
driver = webdriver.Firefox(options=firefox_options)

# Open the Google Search Console URL
search_console_url = "https://search.google.com/u/0/search-console?resource_id=https://how-old-am-i.online/"
driver.get(search_console_url)

# Wait for the page to load (adjust the time as needed)
time.sleep(5)

# Find the search bar element
search_bar = driver.find_element_by_css_selector("input.xxNVPc")

# Sitemap URLs list
sitemap_urls = [
    "https://how-old-am-i.online/?birthdate=1963",
    "https://how-old-am-i.online/?birthdate=1952",
    "https://how-old-am-i.online/?birthdate=1951",
    "https://how-old-am-i.online/?birthdate=1950",
    "https://how-old-am-i.online/?birthdate=2023",
    "https://how-old-am-i.online/?birthdate=2019"
]

# Iterate through the sitemap URLs and submit them for indexing
for url in sitemap_urls:
    print(f"Submitting URL: {url}")

    # Enter the URL in the search bar
    search_bar.clear()
    search_bar.send_keys(url)
    search_bar.submit()

    # Wait for the URL to be loaded and inspected
    wait = WebDriverWait(driver, 10)
    request_indexing_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.CerIhf span[data-event-action='request-indexing']")))

    # Click the "Request indexing" button
    request_indexing_button.click()

    # Wait for the indexing request to be processed (adjust the time as needed)
    time.sleep(60)

# Close the browser
driver.quit()