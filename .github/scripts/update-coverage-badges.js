#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

/**
 * Generates coverage badges and updates README.md
 */

// Coverage badge colors based on thresholds
function getBadgeColor(percentage) {
  if (percentage >= 80) return 'brightgreen';
  if (percentage >= 70) return 'green';
  if (percentage >= 60) return 'yellow';
  if (percentage >= 50) return 'orange';
  return 'red';
}

// Generate badge URL
function generateBadge(label, value, color) {
  return `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(value)}-${color}`;
}

// Read coverage summary files
function readCoverageSummary(type) {
  const filePath = path.join(__dirname, '..', '..', 'docs', 'coverage-reports', type, 'coverage-summary.json');
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (error) {
    console.warn(`Could not read ${type} coverage summary:`, error.message);
  }
  return null;
}

// Generate coverage badges section
function generateCoverageSection() {
  const testTypes = ['unit', 'integration', 'e2e'];
  const badges = [];

  for (const type of testTypes) {
    const summary = readCoverageSummary(type);
    if (!summary || !summary.total) {
      console.log(`No coverage data for ${type} tests`);
      continue;
    }

    const total = summary.total;
    const metrics = {
      lines: total.lines.pct,
      statements: total.statements.pct,
      functions: total.functions.pct,
      branches: total.branches.pct
    };

    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    badges.push(`### ${typeLabel} Tests\n`);
    
    for (const [metric, pct] of Object.entries(metrics)) {
      const color = getBadgeColor(pct);
      const label = metric.charAt(0).toUpperCase() + metric.slice(1);
      const badgeUrl = generateBadge(label, `${pct}%`, color);
      badges.push(`![${label} Coverage](${badgeUrl})`);
    }
    badges.push('\n');
  }

  if (badges.length === 0) {
    return null;
  }

  return `## 📊 Test Coverage\n\n${badges.join(' ')}\n`;
}

// Update README.md
function updateReadme() {
  const readmePath = path.join(__dirname, '..', '..', 'README.md');
  let content = fs.readFileSync(readmePath, 'utf8');

  const coverageSection = generateCoverageSection();
  
  if (!coverageSection) {
    console.log('No coverage data available');
    return;
  }

  // Remove existing coverage section if present
  const startMarker = '## 📊 Test Coverage';
  const nextSectionRegex = /\n## /;
  
  const startIndex = content.indexOf(startMarker);
  if (startIndex !== -1) {
    const afterStart = content.substring(startIndex + startMarker.length);
    const nextSectionMatch = afterStart.match(nextSectionRegex);
    
    if (nextSectionMatch) {
      const endIndex = startIndex + startMarker.length + nextSectionMatch.index;
      content = content.substring(0, startIndex) + content.substring(endIndex);
    } else {
      // Coverage section is at the end
      content = content.substring(0, startIndex);
    }
  }

  // Add new coverage section after the Testing section
  const testingSectionIndex = content.indexOf('## Testing');
  if (testingSectionIndex !== -1) {
    const afterTesting = content.substring(testingSectionIndex);
    const nextSectionMatch = afterTesting.match(nextSectionRegex);
    
    if (nextSectionMatch) {
      const insertPosition = testingSectionIndex + nextSectionMatch.index;
      content = content.substring(0, insertPosition) + '\n' + coverageSection + content.substring(insertPosition);
    } else {
      // Testing section is at the end
      content = content + '\n' + coverageSection;
    }
  } else {
    // No Testing section, add at the beginning (after title and intro)
    const firstSectionMatch = content.match(/\n## /);
    if (firstSectionMatch) {
      const insertPosition = firstSectionMatch.index;
      content = content.substring(0, insertPosition) + '\n' + coverageSection + content.substring(insertPosition);
    } else {
      content = content + '\n' + coverageSection;
    }
  }

  fs.writeFileSync(readmePath, content, 'utf8');
  console.log('✅ README.md updated with coverage badges');
}

// Main execution
try {
  updateReadme();
} catch (error) {
  console.error('❌ Error updating README:', error);
  process.exit(1);
}
