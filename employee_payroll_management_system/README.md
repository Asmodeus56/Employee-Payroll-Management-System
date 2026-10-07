# Employee Payroll Management System (EPMS)

## Overview
The Employee Payroll Management System (EPMS) is a centralized, web-based platform designed to automate and streamline payroll processes. Developed as an academic case study for the Xavier Institute of Engineering, this system replaces manual, spreadsheet-based payroll processing to reduce human error, prevent delayed payments, and ensure compliance with applicable labor laws.

For detailed system requirements, please refer to the primary requirements document: **exp2 srs sel.docx**.

## Key Features
* **Employee Profile Management:** Centralized creation and maintenance of employee master records, including personal details, employment status, and compensation structures.
* **Attendance and Leave Tracking:** Daily logging of employee attendance and automated routing/updating of leave requests.
* **Automated Payroll Batch Processing:** High-performance calculation engine capable of computing gross pay, taxes, deductions, and net pay for up to 1,000 employees in under two minutes.
* **Tax and Deduction Engine:** Configurable tax tables to calculate localized statutory taxes and deductions accurately.
* **Self-Service Portal & Payslips:** Automatic generation of PDF payslips following payroll runs, accessible to employees via a secure, self-service web dashboard.
* **Role-Based Access Control (RBAC):** Strict security protocols ensuring users only access data and functions appropriate to their roles.

## User Roles
The system enforces strict data visibility and functionality based on four primary roles:
1. **System Administrator:** Manages overall system configuration, user accounts, and access permissions.
2. **HR / Payroll Officer:** Maintains employee records, reviews daily attendance, and triggers payroll batch runs.
3. **Finance Reviewer:** Validates payroll totals, ensures accurate tax configurations, and reviews compliance reports.
4. **Employee:** Uses the self-service portal to view personal attendance, track leave balances, and download PDF payslips.

## System Architecture & Technologies
EPMS is built on a standard 3-tier architecture:
* **Presentation Tier:** A responsive, cross-platform web dashboard accessible via modern desktop and mobile browsers.
* **Application Tier (Backend):** A backend calculation engine exposing secure RESTful API endpoints (using JSON payloads over HTTPS). Includes a PDF Generation Component for payslips.
* **Data Tier:** A Relational SQL Database ensuring data integrity and secure storage of employee, attendance, and payroll data.

## Security & Performance
* **Encryption:** All sensitive data is encrypted at rest and in transit using industry-standard AES-256 encryption.
* **Performance:** Optimized to complete batch runs rapidly (< 2 minutes for 1,000 users) and maintain 99.9% uptime during payday windows.
* **Audit Trails:** Comprehensive logging of all changes to employee profiles and denied access attempts.

## Documentation and References
* **Software Requirements Specification:** `exp2 srs sel.docx` (Authored by Sonu Sen, v1.0)
* Administrator Guide (PDF - Upcoming)
* HR/Payroll Officer Guide (PDF - Upcoming)
* Employee Self-Service Quick-Start Guide (PDF - Upcoming)

---
*Note: Direct bank fund-transfer integrations and performance-appraisal functionalities are explicitly out of scope for Version 1.0.*