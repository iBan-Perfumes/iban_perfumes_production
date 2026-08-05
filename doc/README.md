# Fleet Maintenance Management System — Requirements Pack

**Product:** Multi-Tenant SaaS Fleet Maintenance Management System  
**Platform:** Odoo 17+ (PostgreSQL, OWL, Docker)  
**Document Pack Version:** 1.0  
**Status:** Draft for Client Review  
**Classification:** Confidential — Client & Delivery Team

---

## Purpose

This folder contains the complete pre-development requirements package for a multi-tenant SaaS fleet maintenance platform sold on monthly/quarterly/yearly/lifetime subscriptions. Each customer (tenant) is an independent company with strict data isolation.

Use this pack as the foundation for:

- Client sign-off before development
- UI/UX design and screen inventory
- Database and Odoo module design
- Sprint planning and project estimation
- QA acceptance criteria

---

## Document Index

| # | Document | Audience | Description |
|---|----------|----------|-------------|
| 1 | [SRS-Fleet-Maintenance-SaaS.md](./SRS-Fleet-Maintenance-SaaS.md) | Client, BA, Architect, PM | Master Software Requirements Specification (Sections 1–20) |
| 2 | [Module-Wise-Requirements.md](./Module-Wise-Requirements.md) | Product, Dev, QA | Detailed specs for all 16 SaaS modules |
| 3 | [Phase-Wise-Delivery-Plan.md](./Phase-Wise-Delivery-Plan.md) | PM, Delivery, Client | Step/phase roadmap, milestones, exit criteria |

**Recommended reading order:** Master SRS → Module-Wise → Phase-Wise Delivery Plan.

---

## Target Customers (Tenants)

- Construction companies  
- JCB / heavy equipment rental companies  
- Earth movers & excavation contractors  
- Mining companies  
- Logistics companies  
- Fleet owners  

---

## Locked Architecture Decisions

| Decision | Choice |
|----------|--------|
| Tenancy | Shared database, company/tenant row-level isolation |
| Billing | Odoo Subscriptions + Accounting; plan quotas & feature flags |
| Notifications (MVP) | Email + In-app |
| Notifications (Later) | SMS + WhatsApp Business API |
| Valuation (MVP) | Formula-based depreciation |
| Valuation (Later) | AI-assisted valuation |
| Vehicle types | Seed catalog + unlimited custom categories |

---

## How to Export for Client Presentation

1. Open the Markdown files in Cursor / VS Code / GitHub preview (Mermaid diagrams render natively).  
2. Export to PDF/DOCX via preferred tool (e.g. Pandoc, Markdown PDF extension, or Notion import).  
3. Combined pack targets approximately **40–60 pages** when exported with diagrams.

---

## Document Control

| Field | Value |
|-------|-------|
| Owner | Product / Business Analysis |
| Reviewers | Solution Architect, SaaS ERP Consultant, Client Stakeholder |
| Next review | After client workshop / sign-off |

---

## Related Project Notes

Application source code for this SaaS product is **not** included in this repository pack. These documents are the contractual and technical baseline for a separate Odoo implementation project.
