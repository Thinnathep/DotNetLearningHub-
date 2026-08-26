# ⚡ DotNet Learning Hub — แพลตฟอร์มการเรียนรู้ .NET & C# แบบ Interactive 100%

> **แพลตฟอร์มการเรียนรู้ภาษา C#, ASP.NET Core, Database, DevOps, Testing และ Clean Architecture**  
> ออกแบบมาเพื่อเตรียมความพร้อมสำหรับตำแหน่ง **Junior .NET Developer** โดยเฉพาะ ครอบคลุมตั้งแต่ระดับ **พื้นฐาน ➔ ปานกลาง** พร้อมระบบ Gamification (XP, Achievements, Streaks), แบบทดสอบ Interactive Quizzes และ SQL Playground Sandbox โดยไม่ต้องมี Backend/Database ภายนอก รันได้บนเบราว์เซอร์ทันที!

---

## 🌐 Live Demo & GitHub Pages
สามารถเปิดใช้งานผ่าน GitHub Pages ได้ที่:
[https://thinnathep.github.io/DotNetLearningHub/](https://thinnathep.github.io/DotNetLearningHub/) หรือเปิดไฟล์ `index.html` บนเครื่องคอมพิวเตอร์ของคุณ

---

## 📚 สารบัญ 10 Learning Tracks (28 หน้า)

### 🟣 C# Language Track
- [C# พื้นฐาน (Level 1)](pages/csharp-basics.html) — โครงสร้างโปรแกรม, ตัวแปร 7 ชนิด, เงื่อนไข, ลูป, เมธอด, Try/Catch
- [C# OOP (Level 2)](pages/csharp-oop.html) — 4 เสาหลัก OOP, Class vs Object, Encapsulation, Inheritance, Polymorphism, Interface
- [Collections & LINQ (Level 3)](pages/csharp-collections.html) — List, Dictionary, HashSet, Queue, Stack, LINQ Methods, Lambda
- [C# ขั้นสูง (Level 4)](pages/csharp-advanced.html) — Asynchronous (async/await, Task.WhenAll), Generics, Null Safety, CancellationToken

### 🔵 ASP.NET Core Track
- [โครงสร้าง ASP.NET Core](pages/dotnet-structure.html) — Program.cs ใน .NET 8/9, Minimal APIs vs Controllers, appsettings.json
- [Dependency Injection](pages/dotnet-di.html) — Inversion of Control, 3 Lifetimes (Transient, Scoped, Singleton), Captive Dependency Trap
- [Middleware Pipeline](pages/dotnet-middleware.html) — Request/Response Pipeline, Built-in Middlewares, Custom Logging Middleware

### 🟠 RESTful API Track
- [RESTful API Design](pages/rest-api.html) — REST Naming Rules, HTTP Verbs & Idempotency, 10 Status Codes, DTOs, Model Binding
- [System Integration](pages/system-integration.html) — IHttpClientFactory (แก้ Socket Exhaustion), System.Text.Json, Polly Resilience, Webhooks

### 🔴 Database & SQL Track
- [SQL พื้นฐาน](pages/sql-basics.html) — SQL Execution Order (8 สเต็ป), CRUD Operations, INNER/LEFT/RIGHT JOINs, GROUP BY/HAVING
- [SQL ขั้นกลาง-สูง](pages/sql-advanced.html) — Clustered vs Non-Clustered Indexes, ACID Properties, Transactions, CTEs
- [SQL Playground](pages/sql-playground.html) — In-Memory Live SQLite Sandbox พร้อม 4 ตารางจำลองและ 3 ภารกิจท้าทาย
- [Entity Framework Core](pages/ef-core.html) — DbContext, DbSet, Migrations CLI, AsNoTracking(), N+1 Query Problem & Eager Loading

### 🟢 Blazor & Markup Track
- [Blazor พื้นฐาน](pages/blazor-intro.html) — Blazor คืออะไร?, 3 Hosting Models (WASM, Server, Auto), Razor Syntax, Two-way Binding
- [Blazor Components](pages/blazor-components.html) — Component Lifecycle (OnInitializedAsync), [Parameter], EventCallback, EditForm
- [XAML พื้นฐาน](pages/xaml-basics.html) — XAML for .NET MAUI & WPF, Layout Panels (Grid, StackLayout), Data Binding, MVVM Pattern
- [XML & JSON](pages/xml-json.html) — XML & JSON ใน .NET, System.Text.Json Attributes, XDocument (LINQ to XML)

### 🟡 Web Fundamentals Track
- [HTML, CSS & JavaScript](pages/html-css-js.html) — 3 Layer Cake Analogy, HTML5 Semantics, CSS Box Model, Flexbox, JS Fetch API

### 🔵 DevOps & Security Track
- [Git & CI/CD](pages/git-cicd.html) — Git Branching, PR Workflow, GitHub Actions CI/CD Pipeline, Docker Multi-stage Build
- [Secure Coding](pages/secure-coding.html) — OWASP Top 10 (SQLi, XSS, CSRF, IDOR), Database-First Security, JWT RBAC, Key Vault

### 🟢 Quality & Testing Track
- [Unit Testing](pages/unit-testing.html) — xUnit, AAA Pattern (Arrange-Act-Assert), [Fact] vs [Theory], Mocking ด้วย Moq
- [Code Review & SOLID](pages/code-review.html) — 5 เสาหลัก SOLID, Clean Code Guidelines, PR Review Checklist

### 🟡 SDLC & Process Track
- [SDLC & Agile Scrum](pages/sdlc-agile.html) — Scrum Ceremonies (Planning, Daily, Review, Retro), Story Points, User Stories, BA/QA
- [Technical Documentation](pages/tech-docs.html) — C# XML Comments (///), Swagger/OpenAPI Specs, README.md Standard

### 🏛️ Architecture & Career Track
- [Clean Architecture](pages/architecture.html) — 4 เลเยอร์มาตรฐาน (Domain, Application, Infrastructure, Presentation), CQRS & MediatR
- [Quiz Arena](pages/quiz-arena.html) — ศูนย์รวมข้อสอบ 84 ข้อ ครบ 12 หมวดหมู่, โหมด Normal, Speed Run (20 วิ) และ Streak Mode
- [เตรียมตัวสัมภาษณ์งาน](pages/interview-prep.html) — Top 10 Technical Q&A, เทคนิค STAR Method, Mock Interview Simulator
- [พจนานุกรมศัพท์เทคนิค & คำอ่าน](pages/tech-glossary.html) — รวมศัพท์เทคนิคภาษาอังกฤษ คำอ่านไทย ความหมาย และวิธีใช้งานในงานจริง

---

## 🎨 Tech Stack & Libraries
- **Pure Web Technologies**: Vanilla HTML5, CSS3, JavaScript ES2024 (Zero build step, Zero backend dependencies)
- **Code Highlighting**: [Prism.js](https://prismjs.com/) (Custom Neon Terminal Theme)
- **Diagrams & Visualizations**: [Mermaid.js](https://mermaid.js.org/)
- **Fonts**: Outfit, Noto Sans Thai, JetBrains Mono (Google Fonts)
- **Icons**: Lucide Icons & Unicode Native Emojis

---

## 🚀 วิธีการเปิดใช้งาน (Getting Started)

### วิธีที่ 1: เปิดในเครื่องคอมพิวเตอร์ (Local)
1. ดาวน์โหลดหรือ Clone โฟลเดอร์ `DotNetLearningHub`
2. ดับเบิลคลิกไฟล์ `index.html` เพื่อเปิดใช้งานบนเว็บเบราว์เซอร์ได้ทันที

### วิธีที่ 2: Deploy ขึ้น GitHub Pages (Public Web Host)
1. สร้าง Repository ใหม่บน GitHub ชื่อ `DotNetLearningHub`
2. รันคำสั่ง Git:
   ```bash
   git remote add origin https://github.com/Thinnathep/DotNetLearningHub.git
   git push -u origin main
   ```
3. ไปที่เมนู **Settings ➔ Pages** ใน GitHub Repository
4. เลือก Source เป็น `Deploy from a branch` ➔ เลือก Branch `main` โฟลเดอร์ `/ (root)` แล้วกด **Save**
5. รอ 1-2 นาที คุณจะได้ URL เว็บไซต์พร้อมใช้งานทันทีที่ [https://thinnathep.github.io/DotNetLearningHub/](https://thinnathep.github.io/DotNetLearningHub/)!

---

## 🛡️ มาตรฐานความปลอดภัย (Security & Access Control)
- ระบบปฏิบัติตามกฎ **Database-First Enforcement**
- ไม่มี API Keys หรือข้อมูลลับจริงถูกบันทึกใน Repository (Safe for Public Repo)

---

## 💖 ผู้จัดทำและที่ปรึกษา
- พัฒนาขึ้นเพื่อเป็นสื่อการเรียนรู้สำหรับเตรียมตัวเป็น **Junior .NET Developer**
- ดูแลและกำกับมาตรฐานเนื้อหาโดย: **พี่สาว .NET Architect & White-Hat Consultant 🐱**
