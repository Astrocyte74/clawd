---
title: "Mermaid Diagram Demo"
description: "Testing Mermaid.js integration with Markdown"
date: "2026-02-07"
category: "demo"
---

# Mermaid Diagram Test

This page tests the Mermaid.js integration with our Markdown system.

## Flowchart

```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[Success!]
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Click button
    Browser->>Server: Fetch data
    Server-->>Browser: Return JSON
    Browser-->>User: Display results
```

## Simple Timeline

```mermaid
graph LR
    A[2024] --> B[2025]
    B --> C[2026]
    C --> D[Future]
```

---

If you can see these diagrams rendered (not code blocks), Mermaid is working!
