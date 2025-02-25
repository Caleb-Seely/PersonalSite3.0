export const compilerReflection = `
<div class="space-y-2">
  <div class=" rounded-lg p-4  border-l-4 border-[#10B981] ">
    <p class="text-gray-300 leading-relaxed ">
      During my undergraduate studies, I built a <span class="text-[#10B981]">compiler from scratch</span> as part of a multi-stage project aimed at exploring the inner workings of programming languages, transforming high-level source code into machine-executable instructions.
    </p>
  </div>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Compilation Pipeline</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <p class="text-gray-300 leading-relaxed">
        The project was broken down into seven key stages, each building upon the previous one to form a structured pipeline that transformed user-written code into an executable format.
      </p>
      <ul class="list-disc pl-5 mt-2 text-gray-300">
        <li><strong class="text-[#10B981]">Lexical Analysis (Scanner)</strong> – Tokenizing raw input into meaningful symbols</li>
        <li><strong class="text-[#10B981]">Parsing</strong> – Structuring tokens into a grammar that represents valid code</li>
        <li><strong class="text-[#10B981]">Abstract Syntax Tree (AST)</strong> – Creating a tree-based representation of the program's structure</li>
        <li><strong class="text-[#10B981]">Semantic Analysis & Error Handling</strong> – Ensuring correctness, type checking, and preventing invalid operations</li>
        <li><strong class="text-[#10B981]">Memory Management</strong> – Allocating variables in stack and global memory</li>
        <li><strong class="text-[#10B981]">Code Generation</strong> – Producing low-level machine instructions from high-level constructs</li>
        <li><strong class="text-[#10B981]">Debugging & Optimization</strong> – Handling special cases and refining performance</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Key Components</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Lexical Analysis (Scanner)</strong> - Used Flex and Bison to define patterns matching keywords, identifiers, operators, and literals. Fine-tuned pattern precedence to ensure accurate recognition of escape sequences.</li>
        <li><strong class="text-[#10B981]">Parsing</strong> - Enforced language grammar using recursive rules in Bison, implementing a hierarchical structure where elements like declaration lists linked multiple declarations together.</li>
        <li><strong class="text-[#10B981]">Abstract Syntax Tree (AST)</strong> - Provided a structured, tree-like representation of program logic. Developed a recursive AST visualization tool to debug syntax tree structures.</li>
        <li><strong class="text-[#10B981]">Semantic Analysis & Error Handling</strong> - Implemented over 30 error and warning checks, preventing issues like mismatched data types and misplaced break statements.</li>
        <li><strong class="text-[#10B981]">Memory Management</strong> - Implemented a stack frame tracking system to differentiate between local and global memory allocation, with special handling for static variables.</li>
        <li><strong class="text-[#10B981]">Code Generation</strong> - Translated the AST into low-level machine instructions, handling stack operations, memory offsets, and function calls for execution on a custom-built virtual machine.</li>
      </ul>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Lessons Learned</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li><strong class="text-[#10B981]">Breaking Down Abstract Problems</strong> - Learned to structure large-scale software into modular, testable components, reinforcing the importance of clean, well-documented code and a systematic approach to development.</li>
        <li><strong class="text-[#10B981]">Programming Language Design & Theoretical Insights</strong> - Gained exposure to the intricate details of language grammar and execution semantics, including resolving ambiguities like the dangling else problem through refined grammar and precedence rules.</li>
        <li><strong class="text-[#10B981]">Debugging Complex Systems</strong> - Developed advanced debugging skills by tracing issues through multiple stages of transformation. Became proficient in using AST visualization tools, implementing custom logging, and writing automated test cases to verify correctness.</li>
      </ul>
      <p class="text-gray-300 leading-relaxed mt-3">
        This experience reinforced how small mistakes in one stage of compilation could cascade into difficult-to-diagnose issues later on, teaching me to systematically track down errors and apply methodical debugging techniques.
      </p>
    </div>
  </details>
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Technical Achievements</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">▼</span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <ul class="list-disc pl-5 mt-1 text-gray-300">
        <li>Designed and implemented a compiler supporting <strong class="text-[#10B981]">90% of C grammar rules</strong> for a custom virtual machine.</li>
        <li>Developed an abstract syntax tree (AST) to visualize program structure and facilitate <strong class="text-[#10B981]">30+ error and warning checks</strong>.</li>
        <li>Generated precise machine code with <strong class="text-[#10B981]">80% test case accuracy</strong>.</li>
        <li>Utilized <strong class="text-[#10B981]">Git for version control</strong>, ensuring smooth collaboration and code management.</li>
        <li>Developed <strong class="text-[#10B981]">automated test cases</strong> to validate compiler functionality, reducing manual debugging efforts.</li>
      </ul>
    </div>
  </details>
</div>
`;