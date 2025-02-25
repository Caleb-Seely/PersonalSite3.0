export const capstoneReflection = `
<div class="space-y-2">
  <div class=" rounded-lg p-4  border-l-4 border-[#10B981] ">
    <p class="text-gray-300 leading-relaxed ">
      Our senior capstone project explored the potential of utilizing <span class="text-[#10B981]">On-Board Diagnostics II (OBDII) data</span> to predict when a vehicle would run out of fuel, integrating real-time diagnostics with Google Maps for enhanced user awareness.
    </p>
  </div>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Technologies Used</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Android Studio</strong> – Primary development environment for the mobile application</li>
        <li><strong class="text-[#10B981]">Java</strong> – Core programming language for application functionality</li>
        <li><strong class="text-[#10B981]">Google Maps API</strong> – Integration for route visualization and location services</li>
        <li><strong class="text-[#10B981]">OBDII Interface</strong> – Hardware connection for accessing vehicle diagnostic data</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Key Contributions</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Leveraging Existing Resources</strong> – Utilized an existing GitHub project that successfully transmitted vehicle OBDII data to a mobile device using Java, providing a foundation for our development.</li>
        <li><strong class="text-[#10B981]">Applying SDLC Methodologies</strong> – Followed Software Development Life Cycle approaches throughout the project, ensuring we met milestones and satisfied client requirements.</li>
        <li><strong class="text-[#10B981]">Technical Innovations</strong> – Established a one-to-one intake manifold correlation with fuel consumption, resolving a critical issue for our client and enabling more accurate predictions.</li>
        <li><strong class="text-[#10B981]">Proof of Concept</strong> – Created a working prototype incorporating Google Maps functionality, allowing users to visualize their route and potential fuel depletion points.</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Implementation Details</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        Working as a team of four, we developed a mobile application that connects to a vehicle's OBDII port to collect real-time diagnostic data. The application processes this data to calculate:
      </p>
      <ul class="list-disc pl-5 mt-2 text-gray-300">
        <li>Current fuel consumption rates based on intake manifold readings</li>
        <li>Estimated remaining distance before fuel depletion</li>
        <li>Visual representation of this information overlaid on Google Maps</li>
        <li>Potential refueling locations along the planned route</li>
      </ul>
      <p class="text-gray-300 leading-relaxed mt-2">
        We implemented a <span class="text-[#10B981]">correlation algorithm</span> that accurately translates OBDII data into meaningful fuel consumption metrics, providing users with actionable information about their vehicle's performance and range.
      </p>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Challenges Faced</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Skill Gaps</strong> – Our team encountered significant challenges with Android Studio's complexity, as none of us had prior experience with this development environment, initially slowing our progress.</li>
        <li><strong class="text-[#10B981]">Limited Java Experience</strong> – Minimal collective experience with Java further hindered our development speed and required additional learning time.</li>
        <li><strong class="text-[#10B981]">Accessing Gas Prices</strong> – Faced difficulties obtaining up-to-date gas prices, which are essential for accurate fuel cost predictions. Real-time fuel pricing data proved complex to access due to variability and accessibility issues.</li>
        <li><strong class="text-[#10B981]">OBDII Data Interpretation</strong> – Developing accurate algorithms to interpret raw OBDII data and correlate it with actual fuel consumption required extensive testing and calibration.</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Project Outcomes</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        Our project successfully demonstrated the <span class="text-[#10B981]">viability of using OBDII data for predicting fuel depletion</span>. Through our research and development efforts, we provided our client with a robust understanding of the potential applications of this technology.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        The final proof of concept highlighted the effective integration of vehicle diagnostics with mobile technology and geographic information systems, creating a foundation for future development of more sophisticated fuel management applications.
      </p>
      <p class="text-gray-300 leading-relaxed mt-2">
        Despite the challenges faced, the project served as an excellent capstone experience, combining practical application of software development principles with real-world problem-solving in the automotive technology space.
      </p>
    </div>
  </details>
</div>
`