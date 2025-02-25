export const messagesDBReflection = `
<div class="space-y-2">
  <div class=" rounded-lg p-4  border-l-4 border-[#10B981] ">
    <p class="text-gray-300 leading-relaxed ">
      This <span class="text-[#10B981]">Flask-based web application</span> processes and visualizes SMS and MMS message history from XML files, providing users with interactive insights into their messaging data and communication patterns.
    </p>
  </div>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Key Features</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Interactive Visualizations</strong> – Leveraged Bokeh to generate dynamic charts, including message frequency over time and sender activity, enabling users to explore their messaging trends visually.</li>
        <li><strong class="text-[#10B981]">Search and Filtering</strong> – Implemented a search feature allowing users to filter messages by contact name or keyword, making it easy to locate specific conversations.</li>
        <li><strong class="text-[#10B981]">Random Message Generator</strong> – Added a fun feature that retrieves a random message from the user's history, offering a nostalgic or entertaining experience.</li>
        <li><strong class="text-[#10B981]">Verbose Contact List</strong> – Analyzed message length relative to the number of messages sent, providing insights into communication patterns.</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Technical Implementation</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Backend</strong> – Built with Flask to handle XML parsing, data processing, and API endpoints</li>
        <li><strong class="text-[#10B981]">Database</strong> – Initially SQLite, later migrated to PostgreSQL for improved performance</li>
        <li><strong class="text-[#10B981]">ORM</strong> – Used SQLAlchemy for database interactions and schema management</li>
        <li><strong class="text-[#10B981]">Visualization</strong> – Implemented Bokeh for interactive data visualization</li>
        <li><strong class="text-[#10B981]">Data Processing</strong> – Custom XML parsers for handling SMS and MMS message formats</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Challenges and Solutions</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Parsing SMS and MMS Data</strong> – Developed separate parsers for SMS and MMS messages to handle their distinct XML structures, with special attention to multimedia attachments and group messages in MMS.</li>
        <li><strong class="text-[#10B981]">Handling Large Files</strong> – Implemented a pre-processing function that scanned and excluded excessively large messages before saving the cleaned dataset, overcoming crashes caused by large video attachments.</li>
        <li><strong class="text-[#10B981]">Database Migration</strong> – Migrated from SQLite to PostgreSQL using SQLAlchemy's ORM for seamless schema adjustments and data transfer, significantly improving scalability and concurrent request handling.</li>
        <li><strong class="text-[#10B981]">Git History Cleanup</strong> – After accidentally pushing sensitive data and encountering issues with rebasing, made the difficult decision to start fresh with a new repository to maintain clean version control.</li>
        <li><strong class="text-[#10B981]">Optimizing Online Performance</strong> – Refactored and optimized the XML parsing process to improve efficiency for deployment, creating a functional online prototype despite hosting limitations.</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Learning Outcomes</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        This project strengthened my <span class="text-[#10B981]">full-stack development skills</span>, particularly in handling complex data processing, database optimization, and interactive data visualization. I gained valuable experience in refactoring code for performance and learned important lessons about Git workflow and sensitive data handling.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        The challenges I faced with large XML files and database scaling provided practical experience in <span class="text-[#10B981]">optimizing applications for real-world use</span>, while the interactive visualization components improved my front-end development capabilities.
      </p>
    </div>
  </details>
</div>
`;