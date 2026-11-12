# Devpost submission preparation

## Suggested title
ReceiptRelay — AI Financial Operations Agent

## Short description
An AI-assisted finance operations workspace for bookkeepers that connects PayPal Sandbox invoices and transaction evidence with invoice follow-up, candidate reconciliation, and human-approved actions.

## Problem
Bookkeepers spend time switching between invoice records, payment evidence, and client follow-ups. Missing documents and overdue invoices are often discovered late, and manual matching can create false confidence.

## Solution
ReceiptRelay combines a client document checklist with a finance workspace. It can create and send PayPal Sandbox invoices, retrieve PayPal invoice and transaction records, analyze open items with Gemini, draft contextual follow-ups, and record human approvals. Verified PayPal webhooks are used for invoice payment state transitions.

## What is technically demonstrated
- PayPal OAuth 2.0 server-side authentication.
- PayPal Invoicing API invoice create, list and send.
- PayPal Transaction Search API retrieval.
- PayPal webhook signature verification and duplicate-event handling.
- Gemini structured analysis, with a clearly labelled rules fallback.
- Candidate reconciliation based on payment evidence; amount equality alone never proves payment.
- Human-in-the-loop review and audit records.

## Significant updates to the pre-existing MVP
The earlier ReceiptRelay prototype focused on client checklists, missing-document tracking, reminder templates and browser-local storage. This hackathon update adds a Node/Express backend, PayPal Sandbox invoice and transaction integration, webhook verification, Gemini analysis, reconciliation recommendations, approval records, audit history, an integration setup UI, an MIT license and reproducible setup documentation. Describe only changes that are actually completed and demonstrated in your final build.

## Three-minute demo outline
- 0:00–0:20: Problem and target user (bookkeepers / small businesses).
- 0:20–0:55: Open finance workspace and show PayPal Sandbox connection status.
- 0:55–1:25: Create and send a Sandbox invoice to a Sandbox buyer.
- 1:25–2:00: Fetch transaction evidence and run Gemini analysis.
- 2:00–2:35: Edit a reminder recommendation and approve/record it; explain the human approval boundary.
- 2:35–2:55: Show webhook setup and explain verified payment status updates.

## Submission checklist
- [ ] Verify current eligibility and registration in Devpost.
- [ ] Configure PayPal Sandbox credentials and demonstrate real Sandbox API calls.
- [ ] Configure Gemini and demonstrate generative AI (do not present rules fallback as AI).
- [ ] Deploy a public functional demo or provide complete setup instructions and test credentials.
- [ ] Publish this repository publicly with its MIT license.
- [ ] Record a public YouTube video under 3 minutes showing the app functioning.
- [ ] Add project description, screenshots, repository URL, demo URL and video URL to Devpost.
- [ ] Ensure judges can test the project without paying or requesting private access.
- [ ] Do not claim features that are not enabled or tested in the final demo.

Official rules: https://paypalaihackathon.devpost.com/rules
