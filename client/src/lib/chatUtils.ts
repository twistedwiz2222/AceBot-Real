// Convert markdown to HTML
export function formatMessage(content: string): string {
  // Convert headers
  content = content.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-3 mb-2">$1</h3>');
  content = content.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>');
  content = content.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-3">$1</h1>');
  
  // Convert bold and italic text
  content = content.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  content = content.replace(/\*(.*?)\*/gim, '<em>$1</em>');
  
  // Convert unordered lists
  content = content.replace(/^\s*\n\*/gim, '<ul class="list-disc pl-5 my-2">\n*');
  content = content.replace(/^(\*.+)\s*\n([^\*])/gim, '$1\n</ul>\n\n$2');
  content = content.replace(/^\*(.+)/gim, '<li>$1</li>');
  
  // Convert ordered lists
  content = content.replace(/^\s*\n\d\./gim, '<ol class="list-decimal pl-5 my-2">\n1.');
  content = content.replace(/^(\d\..*)\s*\n([^\d\.])/gim, '$1\n</ol>\n\n$2');
  content = content.replace(/^\d\.(.+)/gim, '<li>$1</li>');
  
  // Convert paragraphs
  content = content.replace(/^\s*\n\n/gim, '</p><p class="mb-3">');
  
  // Convert code blocks
  content = content.replace(/```([^`]+)```/gim, '<pre class="bg-gray-200 p-2 rounded-md mb-3 font-mono text-sm">$1</pre>');
  
  // Convert inline code
  content = content.replace(/`([^`]+)`/gim, '<code class="bg-gray-100 p-1 rounded font-mono text-sm">$1</code>');
  
  // Convert mathematical formulas by just preserving them
  content = content.replace(/\$\$(.*?)\$\$/gim, '$$$$');
  content = content.replace(/\$(.*?)\$/gim, '$$$1$$');
  
  // Final wrapping in paragraph
  content = '<p class="mb-3">' + content + '</p>';
  
  // Clean up empty paragraphs
  content = content.replace(/<p>\s*<\/p>/gim, '');
  
  return content;
}
