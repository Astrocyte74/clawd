#!/usr/bin/env node
/**
 * Auto-fix timestamps in projects.ts
 * Replaces new Date('YYYY-MM-DD') with new Date() (current datetime)
 * Run after adding new projects to ensure correct chronological sorting
 */

const fs = require('fs');
const path = require('path');

const PROJECTS_FILE = path.join(__dirname, '..', 'src', 'lib', 'projects.ts');

console.log('🔧 Fixing timestamps in projects.ts...\n');

// Read the file
let content = fs.readFileSync(PROJECTS_FILE, 'utf8');

// Track changes
const changes = [];

// Find all Date('YYYY-MM-DD') patterns without time component
const dateOnlyRegex = /new Date\('(\d{4}-\d{2}-\d{2})'\)/g;

// Replace with new Date() and track changes
const newContent = content.replace(dateOnlyRegex, (match, dateStr) => {
  const lineNum = content.substring(0, content.indexOf(match)).split('\n').length;
  const context = content.substring(content.indexOf(match) - 50, content.indexOf(match) + 50);

  changes.push({
    line: lineNum,
    old: match,
    new: 'new Date()',
    date: dateStr,
    context: context.trim().substring(0, 60)
  });

  return 'new Date()';
});

// Write back if there were changes
if (changes.length > 0) {
  fs.writeFileSync(PROJECTS_FILE, newContent, 'utf8');

  console.log(`✅ Fixed ${changes.length} timestamp(s):\n`);
  changes.forEach(change => {
    console.log(`  Line ${change.line}: ${change.old} → ${change.new}`);
    console.log(`    (${change.date})`);
  });

  console.log('\n⚠️  Changes written. Please verify and commit:');
  console.log('   git add src/lib/projects.ts');
  console.log('   git commit -m "fix: update timestamps to include time component"');
  console.log('   git push origin main');
} else {
  console.log('✅ No date-only timestamps found! All timestamps include time.');
  console.log('   All entries will sort correctly by creation time.');
}

process.exit(changes.length > 0 ? 1 : 0); // Exit 1 if changes made (to prompt commit)
