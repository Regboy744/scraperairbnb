const express = require("express");
const app = express();
const PORT = 3000;

// LOCAL MODULES
const scraper = require("./scraper");

const urlInit =
  "https://www.airbnb.ie/s/Copenhagen/homes?refinement_paths%5B%5D=%2Fhomes&click_referer=t%3ASEE_ALL%7Csid%3A9ea0a18e-f8e0-4eec-8840-b5a4290dfd22%7Cst%3ASTOREFRONT_DESTINATION_GROUPINGS&title_type=HOMES_WITH_LOCATION&query=Copenhagen%2C%20Denmark&s_tag=UrkEXloL&tab_id=home_tab&flexible_trip_lengths%5B%5D=one_week&search_type=unknown&price_filter_input_type=0&federated_search_session_id=e97255d6-ce61-45ad-be94-6ede81f525ef&pagination_search=true&items_offset=0&section_offset=2";

app.listen(PORT, async (err) => {
  try {
    if (err) console.log("Error in server setup");
    console.log("\nServer listening on Port", `http://localhost:${PORT}`);
    await scraper.init(urlInit);
  } catch (error) {
    console.log(error);
  }
});
