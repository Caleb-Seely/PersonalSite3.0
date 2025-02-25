export const predictingSalesReflection = `
<div class="space-y-2">
  <div class=" rounded-lg p-4 border-l-4 border-[#10B981] ">
    <p class="text-gray-300 leading-relaxed ">
      This sales prediction project was a <span class="text-[#10B981]">challenging opportunity to apply machine learning</span> to real-world business data. Working with inconsistent datasets helped me develop stronger data preprocessing skills while the model optimization process deepened my understanding of Random Forest algorithms.
    </p>
  </div>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Summary</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
         This project aimed to predict sales for various products using machine learning techniques on real-world, inconsistent, and incomplete data. The problem was framed as a regression task, with a Random Forest algorithm chosen for its ability to handle multiple features and data inconsistencies.      </p>
         <ul class="list-disc pl-5 mt-1 text-gray-300">
            <li><strong class="text-[#10B981]">Dataset</strong> - 5,100 items across 42 stores.</li>
            <li><strong class="text-[#10B981]">Timeframe</strong> - 2013 to October 2015.</li>
            <li><strong class="text-[#10B981]">Structure</strong> - Daily records of product sales per store.</li>
            <li><strong class="text-[#10B981]">Challenges</strong> - Missing data, seasonal trends, and fluctuating sales patterns.</li>
         </ul>

    
   </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Approach</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Feature Selection</strong> - Considered multiple attributes affecting sales.</li>
        <li><strong class="text-[#10B981]">Algorith Choice</strong> - Used Random Forest for its robustness in handling complex datasets.</li>
         <li><strong class="text-[#10B981]">Parameter Tuning:</strong> </br> - Tested different tree depths and numbers.</br> - Found optimal results with 10 trees, balancing accuracy and training time. </br> - Achieved an R² score of 93%.   </li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Data Analysis & Validation</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
         <li><strong class="text-[#10B981]">Identified </strong> downward sales trends over time with notable seasonal spikes in December.</li>
         <li><strong class="text-[#10B981]">Compared </strong> predicted vs. actual sales trends using Matplotlib.</li>
         <li><strong class="text-[#10B981]">Evaluated </strong> individual item sales behavior to understand model strengths and weaknesses. </li>
         <li><strong class="text-[#10B981]">Used</strong> Facebook Prophet to forecast total sales and benchmark results.</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Results</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
         <li>The model successfully captured seasonal trends and sales fluctuations.</li>
         <li>Predicted total <strong class="text-[#10B981]">sales aligned with historical patterns</strong> but slightly overestimated December sales due to data gaps</li>
         <li>Model <strong class="text-[#10B981]">performance varied</strong> across different product categories</li>
      </ul>
    </div>
  </details>
</div>
`