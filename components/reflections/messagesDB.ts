export const messagesDBReflection = `
<div class="space-y-2">
  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
    <p class="text-gray-300 leading-relaxed">
      This Flask-based web application analyzes and visualizes SMS and MMS message history from XML files, providing users with interactive insights into their messaging data.
    </p>
  </div>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Key Parts</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <div>
        <p class="text-gray-300 leading-relaxed">
          <strong>Interactive Visualizations</strong> - Used Bokeh to generate dynamic charts, such as message frequency over time and sender activity, enabling users to explore their messaging patterns visually.
        </p>
      </div>

      <div class="mt-2">
        <p class="text-gray-300 leading-relaxed">
          <strong>Search and Filtering</strong> - Implemented a search feature allowing users to filter messages by contact name or keyword, making it easier to locate specific conversations or topics.
        </p>
      </div>

      <div class="mt-2">
        <p class="text-gray-300 leading-relaxed">
          <strong>Random Message Generator</strong> - Added a fun feature that retrieves a random message from the user’s history, providing a nostalgic or entertaining experience.
        </p>
      </div>
    </div>
  </details>

  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Challenges and Solutions</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <div>
        <p class="text-gray-300 leading-relaxed">
          <strong>Parsing SMS and MMS</strong> - Developed separate parsers for SMS and MMS messages to handle their distinct XML structures. For SMS, the parser extracted message content, timestamps, and sender information. For MMS, additional logic was implemented to handle multimedia attachments and group messages, ensuring all data was accurately captured and stored.
        </p>
      </div>

      <div class="mt-2">
        <p class="text-gray-300 leading-relaxed">
          <strong>Database Migration</strong> - Transitioned from SQLite to PostgreSQL to improve performance and scalability. Leveraged SQLAlchemy’s ORM to ensure a seamless migration process, including schema adjustments and data transfer. This change significantly enhanced the application's ability to handle larger datasets and concurrent users.
        </p>
      </div>

      <div class="mt-2">
        <p class="text-gray-300 leading-relaxed">
          <strong>Git History Cleanup</strong> - Resolved issues with duplicate commits and a detached HEAD state by using interactive rebasing to consolidate commits and force-pushing to update the remote repository. This streamlined the commit history, making it easier to track changes and maintain a clean project timeline.
        </p>
      </div>
    </div>
  </details>
</div>
`;