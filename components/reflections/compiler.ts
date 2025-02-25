export const compilerReflection = `
<div class="space-y-2">
  <!-- Introduction - Always visible -->
  <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
    <p class="text-gray-300 leading-relaxed">
      Building a compiler from scratch was one of the most challenging and rewarding projects I undertook during my undergraduate studies. This multi-stage project deepened my understanding of programming language internals, parsing strategies, and code generation. Here are the key takeaways:
    </p>
  </div>

  <!-- Compilation Pipeline -->
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Understanding the Compilation Pipeline</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">
        ▼
      </span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <div class="space-y-4">
        <div>
          <h4 class="text-[#10B981] font-medium">Lexical Analysis</h4>
          <p class="text-gray-300 leading-relaxed mt-1">
            I used Flex and Bison to tokenize raw input into meaningful symbols, such as keywords, identifiers, and operators. Handling escape sequences like \n and \0 presented unique challenges, requiring careful precedence adjustments to ensure accurate recognition.
          </p>
        </div>

        <div>
          <h4 class="text-[#10B981] font-medium">Parsing and AST Construction</h4>
          <p class="text-gray-300 leading-relaxed mt-1">
            I implemented a parser to enforce the language’s grammar and construct an Abstract Syntax Tree (AST). Recursive rules in Bison allowed structured representation of programs, aiding further analysis and transformations.
          </p>
        </div>
      </div>
    </div>
  </details>

  <!-- Semantic Analysis and Memory Management -->
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Semantic Analysis & Memory Management</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">
        ▼
      </span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <h4 class="text-[#10B981] font-medium">Ensuring Correctness & Efficient Memory Use</h4>
      <p class="text-gray-300 leading-relaxed mt-1">
        This stage involved type checking, scope management, and error handling. I implemented safeguards to catch mismatched types and invalid operations. Additionally, I designed a memory management system that tracked stack frames and assigned local/global memory efficiently.
      </p>
    </div>
  </details>

  <!-- Code Generation and Execution -->
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Code Generation & Execution</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">
        ▼
      </span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <h4 class="text-[#10B981] font-medium">Translating AST to Machine Code</h4>
      <p class="text-gray-300 leading-relaxed mt-1">
        The final phase translated AST nodes into machine instructions. This involved handling stack operations, assigning memory offsets, and executing compiled code on a custom-built virtual machine. Debugging this stage was especially complex due to low-level execution details.
      </p>
    </div>
  </details>

  <!-- Lessons Learned -->
  <details class="group bg-gray-800/30 rounded-lg border border-gray-700">
    <summary class="flex items-center justify-between p-4 cursor-pointer select-none">
      <h3 class="text-xl font-semibold text-[#8DB7F5]">Lessons Learned</h3>
      <span class="text-[#8DB7F5] transition-transform duration-300 group-open:-rotate-180">
        ▼
      </span>
    </summary>
    <div class="p-4 pt-2 border-t border-gray-700 cursor-pointer" onclick="this.parentElement.removeAttribute('open')">
      <h4 class="text-[#10B981] font-medium">Problem-Solving at Scale</h4>
      <p class="text-gray-300 leading-relaxed mt-1">
        This project refined my ability to break down abstract, large-scale problems into structured, solvable components. Despite challenges—such as debugging memory allocation errors and refining parsing rules—it strengthened my understanding of language design and compiler theory.
      </p>
    </div>
  </details>
</div>
`;