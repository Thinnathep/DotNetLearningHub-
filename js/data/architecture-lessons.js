/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — Architecture, Testing & Process Lessons Data
   ══════════════════════════════════════════════════════════ */

const ArchitectureLessons = {
  cleanArch: {
    title: 'Clean Architecture & N-Tier Architecture',
    layers: [
      { name: '1. Domain Layer', desc: 'Entities, Enums, Exceptions (หัวใจของระบบ ไม่ขึ้นกับใครเลย)' },
      { name: '2. Application Layer', desc: 'Interfaces, DTOs, Use Cases, CQRS Handlers, Business Logic' },
      { name: '3. Infrastructure Layer', desc: 'EF Core DbContext, Email Service, External API Clients, File Storage' },
      { name: '4. Presentation / API Layer', desc: 'Controllers, Minimal APIs, Middleware, Swagger, Program.cs' }
    ]
  },
  testing: {
    title: 'Unit Testing ด้วย xUnit & Moq',
    aaaPattern: {
      arrange: 'เตรียมข้อมูลและ Mock dependencies (IProductRepository)',
      act: 'เรียกฟังก์ชันหรือเมธอดที่ต้องการทดสอบจริง',
      assert: 'ตรวจสอบผลลัพธ์ว่าตรงตามที่คาดหวังหรือไม่ (Assert.Equal, Assert.NotNull)'
    }
  },
  agile: {
    title: 'Agile & Scrum ในชีวิตจริงของ Junior Developer',
    events: [
      { name: 'Sprint Planning', desc: 'ประเมิน Story Points และหยิบงานเข้า Sprint Backlog' },
      { name: 'Daily Standup', desc: '3 คำถาม: เมื่อวานทำอะไร? วันนี้จะทำอะไร? มีปัญหาติดขัดอะไรไหม (Blocker)?' },
      { name: 'Sprint Review & Demo', desc: 'นำเสนอระบบที่สร้างเสร็จให้ Product Owner และ Stakeholders ดู' },
      { name: 'Sprint Retrospective', desc: 'ทบทวนกระบวนการทำงาน: Good, Bad, Action Items เพื่อปรับปรุงทีม' }
    ]
  }
};
