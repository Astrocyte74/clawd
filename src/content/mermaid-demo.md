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
    B -->| Yes | C[Great!]
    B -->| No | D[Debug]
    D --> B
    C --> E[Success!]

    style A fill:#6366f1,stroke:#818cf8,color:#fff
    style C fill:#10b981,stroke:#34d399,color:#fff
    style D fill:#f59e0b,stroke:#fbbf24,color:#fff
    style E fill:#10b981,stroke:#34d399,color:#fff
    style B fill:#8b5cf6,stroke:#a78bfa,color:#fff
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
