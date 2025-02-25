export const mediaArchiveReflection = `
<div class="space-y-2">
  <div class=" rounded-lg p-4 border-l-4 border-[#10B981] ">
    <p class="text-gray-300 leading-relaxed ">
      This project was a personal endeavor to preserve my family's history by digitizing our collection of print photos, VHS tapes, DVDs, and slides. The scale of the project was massive, but the end result was a <span class="text-[#10B981]"> well-organized, easily accessible digital archive </span>that ensures these memories will last for generations to come.
    </p>
  </div>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Scope of the Project</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Print Photos</strong> - Scanned and digitized approximately 15,000 family photos.</li>
        <li><strong class="text-[#10B981]">Disks</strong> - Moved all home videos from DVDs onto an external drive.</li>
        <li><strong class="text-[#10B981]">VHS</strong> - Converted all home-recorded VHS tapes to digital format.</li>
        <li><strong class="text-[#10B981]">Scans</strong> - Scanned over 10,000 slides.</li>
      </ul>
    </div>
  </details>
   <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Organization & Storage</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        To keep everything accessible and secure, I implemented a structured file organization system. Each file was meticulously <span class="text-[#10B981]"> labeled, categorized, and backed up </span> to both an external drive and the cloud. This ensures that even as I continue finding and adding more photos, the collection remains structured and manageable.
      </p>
    </div>
  </details> 
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Technical Challenges</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Storage Optimization</strong> - The slide scans produced enormous raw files that would have been costly to store. I implemented lossless compression techniques to reduce file sizes without compromising the image quality.</li>
        <li><strong class="text-[#10B981]">Metadata Management</strong> - To improve searchability, I included metadata such as dates, locations, and event names where possible.</li>
        <li><strong class="text-[#10B981]">Video Preservation</strong> - Converting VHS tapes demanded careful attention to preserve the already degrading quality. I researched modern encoding methods that balanced file size with quality while ensuring compatibility with current playback technologies.</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Final Thoughts</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
         This project was <span class="text-[#10B981]">a labor of love.</span> It reinforced the importance of preservation, organization, and the value of maintaining family history in an easily accessible format. Looking back on these digitized memories has been an incredible experience, and I’m excited to continue adding to and refining this archive over time.      </p>
    </div>
  </details>
</div>
`