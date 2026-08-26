/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — SQL & Entity Framework Core Lessons Data
   ══════════════════════════════════════════════════════════ */

const SQLLessons = {
  basics: {
    title: 'SQL พื้นฐานสำหรับ Backend Developer',
    description: 'การสืบค้นข้อมูล การกรอง การรวมตาราง (JOIN) และการจัดกลุ่มข้อมูล',
    orderOfExecution: [
      { step: 1, clause: 'FROM & JOIN', meaning: 'ระบุตารางต้นทางและรวมตาราง' },
      { step: 2, clause: 'WHERE', meaning: 'กรองข้อมูลรายแถวก่อนนำไปประมวลผล' },
      { step: 3, clause: 'GROUP BY', meaning: 'จัดกลุ่มข้อมูลตามคอลัมน์ที่กำหนด' },
      { step: 4, clause: 'HAVING', meaning: 'กรองผลลัพธ์หลังจากการ GROUP BY' },
      { step: 5, clause: 'SELECT', meaning: 'เลือกคอลัมน์ที่ต้องการแสดง' },
      { step: 6, clause: 'DISTINCT', meaning: 'ตัดข้อมูลที่ซ้ำกันออก' },
      { step: 7, clause: 'ORDER BY', meaning: 'เรียงลำดับผลลัพธ์ ASC / DESC' },
      { step: 8, clause: 'OFFSET / LIMIT (TOP)', meaning: 'จำกัดจำนวนแถวสำหรับการทำ Pagination' }
    ],
    joins: [
      { name: 'INNER JOIN', desc: 'เอาเฉพาะแถวที่มีข้อมูลตรงกันทั้งสองตาราง' },
      { name: 'LEFT JOIN', desc: 'เอาข้อมูลทั้งหมดจากตารางซ้าย แม้ตารางขวาจะไม่มีคู่' },
      { name: 'RIGHT JOIN', desc: 'เอาข้อมูลทั้งหมดจากตารางขวา' },
      { name: 'FULL OUTER JOIN', desc: 'เอาข้อมูลทั้งหมดจากทั้งสองตาราง' }
    ]
  },

  efCore: {
    title: 'Entity Framework Core (ORM)',
    description: 'การจัดการฐานข้อมูลผ่าน C# Objects และ DbContext',
    concepts: [
      { term: 'DbContext', meaning: 'สะพานเชื่อมระหว่าง C# Application กับ Database' },
      { term: 'DbSet<T>', meaning: 'ตัวแทนของตาราง (Table) ใน Database ที่ถูกแปลงเป็น C# Entity Collection' },
      { term: 'Migrations', meaning: 'ระบบ Version Control สำหรับโครงสร้างฐานข้อมูล (Database Schema)' },
      { term: 'AsNoTracking()', meaning: 'ปิดระบบติดตามการเปลี่ยนแปลงเพื่อเพิ่มความเร็วในการ Query แบบ Read-Only' },
      { term: 'Include()', meaning: 'Eager Loading ดึงข้อมูลตารางที่สัมพันธ์กันมาพร้อมกัน เพื่อแก้ปัญหา N+1 Query' }
    ]
  }
};
