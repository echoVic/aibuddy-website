Fixes #2054

## Problem
When using qwen ai model via Xcode26, the API returns error about tools array being too short.

This happens when the tools array is empty but still included in the request.

## Solution
- Filter out empty tools arrays in addDashScopeCacheControl
- Exclude tools from request spread to avoid overriding processed tools
- Only include tools param when array has items

## Changes
- packages/core/src/core/openaiContentGenerator/provider/dashscope.ts:
  - Check tools.length > 0 before including in request
  - Destructure tools from requestWithTokenLimits to exclude it
  
- packages/core/src/core/openaiContentGenerator/provider/dashscope.test.ts:
  - Add test for empty tools array exclusion
  - Add test for non-empty tools array inclusion

## Testing
All 43 tests pass including 2 new test cases.