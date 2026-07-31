# Module-Wise Requirements Specification

**Product:** Multi-Tenant SaaS Fleet Maintenance Management System (Odoo)  
**Companion to:** [SRS-Fleet-Maintenance-SaaS.md](./SRS-Fleet-Maintenance-SaaS.md)  
**Version:** 1.0  
**Date:** 31 July 2026  

---

## How to Use This Document

Each module section includes:

- Purpose and actors  
- Features and business rules  
- Key data fields  
- Odoo mapping (Standard vs Custom)  
- Dependencies  
- Module-level acceptance criteria  

---

## Module Index

1. [Authentication](#1-authentication)  
2. [Subscription Management](#2-subscription-management)  
3. [Customer Tenant Management](#3-customer-tenant-management)  
4. [Company Profile](#4-company-profile)  
5. [User Management](#5-user-management)  
6. [Fleet Management](#6-fleet-management)  
7. [Vehicle Management](#7-vehicle-management)  
8. [Service Management](#8-service-management)  
9. [Preventive Maintenance](#9-preventive-maintenance)  
10. [Documents](#10-documents)  
11. [Reports](#11-reports)  
12. [Dashboard](#12-dashboard)  
13. [Notifications](#13-notifications)  
14. [Billing](#14-billing)  
15. [Settings](#15-settings)  
16. [Audit Logs](#16-audit-logs)  
17. [Spare Parts Cross-Cutting](#17-spare-parts-cross-cutting)  
18. [Vehicle Valuation Cross-Cutting](#18-vehicle-valuation-cross-cutting)  

---

## 1. Authentication

### 1.1 Purpose

Provide secure, tenant-aware identity for SaaS Admin and Tenant users.

### 1.2 Actors

SaaS Admin, all Tenant roles, unauthenticated visitors (signup/reset).

### 1.3 Features & Rules

| Feature | Rule |
|---------|------|
| Login | Email + password; tenant resolved from user membership |
| Logout | Invalidate session |
| Password reset | Time-limited token via email |
| Failed attempts | Lock after configurable N failures (default 5) |
| Session timeout | Configurable idle timeout |
| MFA | Mandatory for SaaS Super Admin; optional for tenants (P1) |
| Invite accept | New users set password via invite link |

### 1.4 Key Fields

| Field | Description |
|-------|-------------|
| login / email | Unique platform-wide |
| password_hash | Never stored plain |
| tenant_id | Null only for pure platform staff |
| last_login | Audit |
| mfa_enabled | Boolean |

### 1.5 Odoo Mapping

| Component | Type |
|-----------|------|
| `res.users`, Auth controllers | Standard |
| MFA / lockout policy extensions | Custom (light) |

### 1.6 Dependencies

Email gateway; Company/User modules for invite.

### 1.7 Acceptance Criteria

- Valid credentials grant access only to the user’s tenant data.  
- Reset link expires and is single-use.  
- Locked accounts cannot login until admin unlock or timeout.

---

## 2. Subscription Management

### 2.1 Purpose

Enable the platform owner to sell and govern subscription plans that constrain tenant usage and features.

### 2.2 Actors

SaaS Super Admin, SaaS Finance, Tenant Owner (view/upgrade).

### 2.3 Features & Rules

| Feature | Details |
|---------|---------|
| Plan CRUD | Name, code, description, active flag |
| Billing cycles | Monthly, Quarterly, Yearly, Lifetime |
| Quotas | Max Users, Max Vehicles, Max Storage (GB) |
| Feature flags | e.g. WhatsApp, Valuation, Advanced Reports, API access |
| Trial days | Integer; 0 = no trial |
| Expiry handling | Soft warning → Past Due → Expired/Suspended |
| Upgrade | Immediate quota increase; proration invoice (P1) |
| Downgrade | Effective next cycle if usage fits; else block |
| Renewal | Auto-invoice before period end |

### 2.4 Example Plan Matrix

| Plan | Users | Vehicles | Storage | Trial |
|------|-------|----------|---------|-------|
| Starter | 5 | 25 | 10 GB | 14 days |
| Growth | 20 | 100 | 50 GB | 14 days |
| Enterprise | Unlimited* | Unlimited* | 500 GB | 30 days |
| Lifetime | Per contract | Per contract | Per contract | 0 |

\*Soft-capped commercially; technical caps still configured.

### 2.5 Key Fields — `saas_plan`

plan_code, name, interval_type, price, currency, max_users, max_vehicles, max_storage_gb, feature_json, trial_days, active.

### 2.6 Odoo Mapping

| Component | Type |
|-----------|------|
| `sale.subscription` / Subscriptions app | Standard (Enterprise) or Custom equivalent on Community |
| Plan quotas & feature flags | Custom |
| Proration engine | Custom on top of Accounting |

### 2.7 Dependencies

Billing, Tenant Management, Notifications.

### 2.8 Acceptance Criteria

- Creating 26th vehicle on a 25-vehicle plan is blocked.  
- Trial tenant auto-moves to Expired when trial ends without payment.  
- Upgrade increases quotas immediately after successful payment.

---

## 3. Customer (Tenant) Management

### 3.1 Purpose

Lifecycle management of customer companies from the SaaS Admin console.

### 3.2 Actors

SaaS Super Admin, SaaS Support.

### 3.3 Features & Rules

| Feature | Rule |
|---------|------|
| Create tenant | Admin-assisted or from self-signup |
| Statuses | Draft, Trial, Active, Past Due, Suspended, Expired, Churned |
| Suspend | Blocks login for tenant users; preserves data |
| Impersonation | Disabled by default; break-glass audited (optional P2) |
| Usage meters | Users, vehicles, storage refreshed periodically |
| Notes / tickets | Support context without exposing fleet PII unnecessarily |

### 3.4 Key Fields

See SRS §5.6 / §9.2 Company-Tenant table.

### 3.5 Odoo Mapping

| Component | Type |
|-----------|------|
| `res.company` multi-company | Standard base |
| `saas.tenant` metadata & status | Custom |
| Support tickets | Standard Helpdesk (Enterprise) or Custom |

### 3.6 Dependencies

Subscription, Auth, Billing.

### 3.7 Acceptance Criteria

- Admin can filter tenants by status and plan.  
- Suspended tenant users cannot authenticate.  
- Storage meter reflects uploaded document sizes within ±5%.

---

## 4. Company Profile

### 4.1 Purpose

Allow each tenant to maintain legal and contact identity used on documents and invoices.

### 4.2 Actors

Owner, Admin.

### 4.3 Features & Rules

- Edit Company Name, GST, Address, Phone, Email, Logo.  
- GST format validation (country-configurable; India GSTIN length/pattern in MVP).  
- Logo used on PDF exports where applicable.  
- Read-only: Subscription Plan, Status, Created Date, Storage Usage (from system).

### 4.4 Odoo Mapping

Standard `res.company` + custom fields for GST/storage display.

### 4.5 Acceptance Criteria

- Logo appears on at least one exported PDF report header.  
- Invalid GST rejected with clear message (when validation enabled).

---

## 5. User Management

### 5.1 Purpose

Tenant-controlled workforce access with role-based permissions.

### 5.2 Actors

Owner, Admin (invite/manage); all users (profile).

### 5.3 Roles

Owner, Admin, Fleet Manager, Service Manager, Mechanic, Operator, Driver, Accountant, Viewer.

### 5.4 Features & Rules

| Feature | Rule |
|---------|------|
| Invite | Email invite; consumes user quota |
| Role assign | Single primary role MVP; multi-group P1 |
| Deactivate | Soft; retains audit & historical refs |
| Transfer ownership | Owner only; requires confirmation |
| Permission config | Map roles to Odoo groups; Admin may toggle optional rights (P1) |

### 5.5 Odoo Mapping

| Component | Type |
|-----------|------|
| `res.users`, `res.groups` | Standard |
| Role presets for fleet SaaS | Custom data/module |
| Quota check on invite | Custom |

### 5.6 Acceptance Criteria

- Mechanic cannot edit subscription.  
- Viewer cannot create service records.  
- Deactivated user cannot login; historical services still show their name.

---

## 6. Fleet Management

### 6.1 Purpose

Organize vehicles into fleets/sites/cost centers for reporting and assignment.

### 6.2 Actors

Fleet Manager, Admin, Owner.

### 6.3 Features

- Create fleets (e.g., “North Zone”, “Rental Pool”).  
- Assign vehicles to a fleet.  
- Optional site/location master.  
- Fleet-level dashboard filters.

### 6.4 Key Fields

name, code, site, manager_id, tenant_id, active, notes.

### 6.5 Odoo Mapping

Extend standard Fleet structures or custom `fleet.fleet` model.

### 6.6 Acceptance Criteria

- Filtering vehicles by fleet returns only members.  
- Deleting a fleet with vehicles requires reassignment or block.

---

## 7. Vehicle Management

### 7.1 Purpose

Single source of truth for every asset in the tenant fleet.

### 7.2 Actors

Fleet Manager, Admin, Owner; Operator/Driver (limited); Viewer (read).

### 7.3 Features & Rules

| Feature | Rule |
|---------|------|
| CRUD | Full create/read/update; delete restricted (prefer Scrap/Sold status) |
| Uniqueness | `vehicle_number` unique per tenant |
| Meters | KM and/or Engine Hours; non-decreasing unless Admin override with reason |
| Status | Active, Idle, In Service, Under Repair, Sold, Scrapped |
| Assignments | Driver, Operator, Current Site |
| Compliance dates | Insurance, Permit, Fitness, Pollution |
| Photo | At least one primary image |
| Quota | Enforce max vehicles from plan |

### 7.4 Complete Field List

| Field | Required | Notes |
|-------|----------|-------|
| Vehicle Number | Yes | Plate / asset code |
| Vehicle Name | Yes | Display name |
| Vehicle Type | Yes | Seed or custom |
| Brand | No | |
| Model | No | |
| Year | No | |
| Purchase Date | No | Valuation input |
| Purchase Cost | No | Valuation input |
| Current Kilometer | Conditional | If KM-based |
| Current Engine Hours | Conditional | If hours-based |
| Fuel Type | No | Diesel/Petrol/CNG/Electric/Hybrid |
| Insurance Expiry | No | Reminder source |
| Permit Expiry | No | |
| Fitness Expiry | No | |
| Pollution Expiry | No | |
| Engine Number | No | |
| Chassis Number | No | |
| Photo | No | Recommended |
| Status | Yes | Default Active |
| Assigned Driver | No | |
| Assigned Operator | No | |
| Current Site | No | |

### 7.5 Vehicle Types Seed

JCB, Excavator, Truck, Tipper, Bulldozer, Loader, Crane, Backhoe Loader, Road Roller, Forklift, Trailer, Concrete Mixer, Water Tanker + **unlimited custom**.

### 7.6 Odoo Mapping

| Component | Type |
|-----------|------|
| `fleet.vehicle` | Standard (extended heavily) |
| Custom vehicle type admin | Custom |
| Meter & compliance fields | Custom |

### 7.7 Acceptance Criteria

- Duplicate vehicle number in same tenant rejected.  
- Custom vehicle type usable immediately in vehicle form.  
- Status “In Service” visible on dashboard counts.

---

## 8. Service Management

### 8.1 Purpose

Capture every maintenance event with cost, parts, media, and accountability.

### 8.2 Actors

Service Manager, Mechanic, Fleet Manager, Admin.

### 8.3 Service Record Fields

| Field | Description |
|-------|-------------|
| Vehicle | Required FK |
| Date | Service date |
| Current KM | Snapshot |
| Current Engine Hours | Snapshot |
| Mechanic | User/contact |
| Workshop | Internal or vendor |
| Invoice Number | Text |
| Invoice Upload | File |
| PDF Upload | Report PDF |
| Image Upload | Multi |
| Video Upload | Multi (size capped) |
| Parts Replaced | Lines → Parts module |
| Cost | Labor + parts or total |
| Remarks | Text |
| Warranty | Warranty end date / notes |
| Service Duration | Hours |
| Service Status | Draft / In Progress / Done / Cancelled |
| Template | Optional link |

### 8.4 Business Rules

- On Done: update vehicle meters if higher; consume stock; schedule next due.  
- Media counts toward storage quota.  
- Cancelled services do not consume parts.  
- Cost rolls into expense/valuation inputs.

### 8.5 Odoo Mapping

| Component | Type |
|-----------|------|
| Maintenance requests / equipment | Standard base |
| `fleet.service.record` rich form | **Custom — Fleet Service Management** |
| Attachments | Standard Documents / ir.attachment |

### 8.6 Acceptance Criteria

- Done service with 2 parts reduces stock by quantities used.  
- Vehicle KM updates when service KM ≥ previous.  
- All uploads remain listed on vehicle history.

---

## 9. Preventive Maintenance

### 9.1 Purpose

Standardize service intervals and automate “next due” calculation.

### 9.2 Example Templates

**Truck — every 10,000 KM**

- Replace Engine Oil  
- Replace Oil Filter  
- Replace Fuel Filter  
- Replace Air Filter  

**Excavator — every 250 Engine Hours**

- Replace Hydraulic Oil  
- Replace Hydraulic Filter  
- Grease Pins  
- Check Track Tension  
- Check Bucket Teeth  
- Inspect Boom  
- Inspect Engine  

### 9.3 Features & Rules

| Feature | Rule |
|---------|------|
| Template per vehicle type | Tenant-customizable |
| Interval basis | KM, Engine Hours, or both (whichever comes first) |
| Checklist lines | Ordered tasks; optional mandatory flag |
| Apply to vehicle | On create or manual link |
| Next due | Last service meter + interval |
| Calendar | P1 view of upcoming |

### 9.4 Odoo Mapping

| Component | Type |
|-----------|------|
| Service Templates module | **Custom** |
| Maintenance Scheduler cron | **Custom** |
| Activities for due items | Standard |

### 9.5 Acceptance Criteria

- Changing interval recalculates open “next due” for linked vehicles.  
- Template checklist appears pre-filled on new service from template.  
- Dual-basis template triggers when either threshold is crossed.

---

## 10. Documents

### 10.1 Purpose

Permanent compliance and media vault attached to each vehicle.

### 10.2 Document Types

Insurance, Registration, Invoice, Service Reports, Photos, Videos, Warranty, Permits, Fitness Certificates, Pollution Certificates.

### 10.3 Rules

- Documents **remain permanently attached** to the vehicle (soft-delete only with Admin + audit).  
- Optional expiry date drives reminders.  
- Storage billed against plan quota.  
- Preview for images/PDF; download for all.

### 10.4 Odoo Mapping

| Component | Type |
|-----------|------|
| Documents app / attachments | Standard |
| Vehicle document metadata + expiry | Custom |
| S3 storage backend | Infra + Odoo config |

### 10.5 Acceptance Criteria

- Expiring insurance within lead days creates notification.  
- Document still listed after related service is archived.  
- Upload blocked when storage quota exceeded.

---

## 11. Reports

### 11.1 Purpose

Operational and executive insights with export.

### 11.2 Report Catalog

| Report | Description |
|--------|-------------|
| Vehicle Report | Master list with status, meters, assignments |
| Maintenance Report | Services in date range |
| Expense Report | Costs by vehicle/fleet/period |
| Upcoming Services | Due within N days |
| Overdue Services | Past due |
| Vehicle-wise Expenses | Ranked cost |
| Monthly / Annual Summary | Aggregates |
| Company Dashboard Export | Snapshot |

### 11.3 Export

PDF and Excel for all P0 reports.

### 11.4 Odoo Mapping

Standard reporting engine + custom QWeb/PDF and XLSX wizards.

### 11.5 Acceptance Criteria

- Filters by date, fleet, vehicle type work correctly.  
- Excel opens in mainstream spreadsheet software.  
- Tenant isolation applies to all report queries.

---

## 12. Dashboard

### 12.1 Tenant Dashboard Widgets

| Widget |
|--------|
| Total Vehicles |
| Vehicles in Service |
| Upcoming Services |
| Overdue Services |
| Total Expenses |
| Today’s Services |
| Monthly Expenses |
| Notifications |
| Recent Activity |
| Documents Expiring |

### 12.2 SaaS Admin Dashboard Widgets

| Widget |
|--------|
| Total Customers |
| Active Customers |
| Trial Customers |
| Expired Customers |
| Revenue |
| MRR |
| ARR |
| Active Users |
| Subscriptions |
| Payments |
| Storage Usage |
| Support Tickets |

### 12.3 Odoo Mapping

**Custom Fleet Dashboard** module using OWL client actions; KPIs from SQL/ORM aggregated securely by tenant or platform.

### 12.4 Acceptance Criteria

- Widget numbers match underlying list views for sample dataset.  
- Click-through from widget to filtered list (P1 where noted).

---

## 13. Notifications

### 13.1 Purpose

Proactive alerts for service and compliance risk, plus commercial events.

### 13.2 Channels

| Channel | Phase |
|---------|-------|
| In-app | P0 |
| Email | P0 |
| SMS | P1 |
| WhatsApp | P1 |

### 13.3 Events

Next service due; Insurance/Permit/Fitness/Pollution/Warranty expiry; Subscription expiry; Payment failure; Quota warning (80%/100%).

### 13.4 Rules

- Lead days configurable in Settings (default 7/15/30).  
- Deduplicate: one notification per entity/event/day.  
- User can mark in-app as read.  
- Channel preferences per tenant (and optionally per user P1).

### 13.5 Odoo Mapping

| Component | Type |
|-----------|------|
| Mail / Activities | Standard |
| Notification center UI | Custom |
| SMS gateway connector | Custom |
| WhatsApp Business API | **Custom WhatsApp Integration** |

### 13.6 Acceptance Criteria

- Disabling email stops email but not in-app.  
- Cron creates reminders for fixtures with known due dates.  
- WhatsApp failures logged without crashing scheduler.

---

## 14. Billing

### 14.1 Purpose

Invoice tenants for subscriptions and record payments.

### 14.2 Features

- Auto invoice on subscribe/renew  
- Manual payment recording (admin)  
- Online payment gateway checkout (P0)  
- Tax lines (GST)  
- Credit notes on downgrade adjustments (P1)  
- Payment history visible to Owner  

### 14.3 Odoo Mapping

Accounting (`account.move`), payment providers — **Standard**; SaaS linkage — **Custom**.

### 14.4 Acceptance Criteria

- Successful payment sets subscription Active and extends end date.  
- Invoice PDF available to Owner.  
- Failed payment sets Past Due and triggers notification.

---

## 15. Settings

### 15.1 Purpose

Tenant-level configuration without code changes.

### 15.2 Settings Groups

| Group | Examples |
|-------|----------|
| Regional | Timezone, language, currency, date format |
| Units | KM vs miles display |
| Reminders | Lead days per document/service type |
| Notifications | Channel toggles |
| Sequences | Vehicle / service number patterns |
| Valuation | Depreciation rate defaults |

### 15.3 Odoo Mapping

`res.config.settings` extensions — Custom fields on Standard settings UI.

### 15.4 Acceptance Criteria

- Changing lead days affects next cron run.  
- Currency change reflects on new cost entries (historical untouched).

---

## 16. Audit Logs

### 16.1 Purpose

Immutable accountability for security and compliance.

### 16.2 Logged Actions (Minimum)

Login success/failure; user invite/role/deactivate; plan/subscription changes; vehicle create/update/status/delete; document delete; service cancel; payment post; settings changes.

### 16.3 Fields

id, tenant_id, actor_user_id, timestamp, model, res_id, action, ip_address, before_json, after_json.

### 16.4 Rules

- No UI edit/delete for tenant users.  
- Retention: minimum 12 months (configurable).  
- Platform admin can query across tenants only with privilege.

### 16.5 Odoo Mapping

Custom `fleet.audit.log` (+ optional mail tracking on fields).

### 16.6 Acceptance Criteria

- Role change produces audit row with before/after.  
- Tenant Admin cannot purge logs.

---

## 17. Spare Parts (Cross-Cutting)

### 17.1 Purpose

Inventory control for parts used in services.

### 17.2 Fields

Parts, Brands, Categories, Stock qty, Price, Warranty months, Supplier, Compatible Vehicles (M2M types or models).

### 17.3 Rules

- Negative stock blocked unless “Allow backorder” setting enabled.  
- Compatibility warning (not hard block) when part used on unmatched vehicle type.

### 17.4 Odoo Mapping

Can extend `product.product` Inventory **Standard** with fleet compatibility **Custom**, or dedicated `fleet.part` Custom model for simpler SaaS UX.

**Decision for implementation:** Dedicated `fleet.part` in MVP for speed; optional map to Inventory in Enterprise phase.

---

## 18. Vehicle Valuation (Cross-Cutting)

### 18.1 Purpose

Estimate current vehicle value to support sell/retain/insure decisions.

### 18.2 Inputs

Purchase Cost, Vehicle Age, Total KM, Total Engine Hours, Maintenance Cost, Service Frequency, Parts Replacement, Major Repairs, Accident History.

### 18.3 Basic Depreciation Method (P1 / Phase 4)

```
Estimated Value = Purchase Cost
                  × (1 - AnnualDepreciationRate) ^ AgeYears
                  × ConditionFactor
                  − MajorRepairPenalty
                  + RecentOverhaulCredit
```

Where ConditionFactor derives from meters vs expected usage bands and service compliance ratio (services done on time / services due).

### 18.4 Future AI-based Valuation (P2 / Phase 5+)

- Train on anonymized sold-vehicle outcomes and market datasets.  
- Explainability: top factors contributing to estimate.  
- Human override with reason (audited).

### 18.5 Odoo Mapping

**Custom Vehicle Valuation** module; results stored per vehicle with as-of date.

### 18.6 Acceptance Criteria (Basic)

- Valuation runs without error when purchase cost and age exist.  
- Missing optional inputs degrade gracefully with listed assumptions.  
- Result visible on vehicle form and exportable.

---

## Technology Stack Reminder

| Layer | Choice |
|-------|--------|
| ERP Framework | Odoo 17+ |
| Language | Python |
| Database | PostgreSQL |
| Frontend | OWL + XML views |
| Deploy | Docker, Nginx |
| Cache/Queue | Redis |
| Files | Amazon S3 |
| Messaging | WhatsApp Business API, SMS, Email |
| Integration | REST APIs |

---

*End of Module-Wise Requirements — Version 1.0*
