/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — C# Lessons Data
   All lesson content in Thai
   ══════════════════════════════════════════════════════════ */

const CSharpLessons = {

  basics: {
    title: 'C# พื้นฐาน — Level 1',
    description: 'เรียนรู้โครงสร้างภาษา C# ตั้งแต่ศูนย์',
    level: 'basic',
    sections: [
      {
        id: 'program-structure',
        title: 'โครงสร้างโปรแกรม C#',
        icon: '🏗️',
        analogy: 'เหมือนที่อยู่บ้าน — namespace คือจังหวัด, class คือบ้าน, Main() คือประตูเข้าบ้าน',
        concepts: [
          { term: 'namespace', read: 'เนมสเปซ', meaning: 'ที่อยู่/กลุ่มของ class เพื่อไม่ให้ชื่อซ้ำกัน' },
          { term: 'class', read: 'คลาส', meaning: 'แบบพิมพ์เขียวของสิ่งของ รวม method + property ไว้ด้วยกัน' },
          { term: 'static void Main()', read: 'สแตติก วอยด์ เมน', meaning: 'จุดเริ่มต้นของโปรแกรม — ทุกอย่างเริ่มจากตรงนี้' },
          { term: 'using', read: 'ยูซิ่ง', meaning: 'ประกาศว่าจะใช้ library/namespace ไหนในไฟล์นี้' },
        ],
        code: `using System;

namespace MyFirstApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("สวัสดี .NET!");
        }
    }
}`,
        output: 'สวัสดี .NET!',
      },
      {
        id: 'variables',
        title: 'ตัวแปรและชนิดข้อมูล',
        icon: '📦',
        analogy: 'ตัวแปรคือ "กล่องใส่ของ" — แต่ละกล่องรับของคนละประเภท เช่น กล่องตัวเลข กล่องข้อความ',
        types: [
          { name: 'int', emoji: '🔢', desc: 'ตัวเลขจำนวนเต็ม', example: 'int age = 25;', range: '-2.1 พันล้าน ถึง 2.1 พันล้าน' },
          { name: 'string', emoji: '📝', desc: 'ข้อความ (ต้องใส่ "")', example: 'string name = "สมชาย";', range: 'ข้อความอะไรก็ได้' },
          { name: 'bool', emoji: '✅', desc: 'จริง/เท็จ', example: 'bool isActive = true;', range: 'true หรือ false เท่านั้น' },
          { name: 'double', emoji: '📊', desc: 'ทศนิยม', example: 'double price = 99.50;', range: 'ทศนิยม 15 ตำแหน่ง' },
          { name: 'decimal', emoji: '💰', desc: 'ทศนิยมแม่นยำ (เงิน)', example: 'decimal salary = 35000.00m;', range: 'แม่นยำ 28 ตำแหน่ง' },
          { name: 'char', emoji: '🔤', desc: 'ตัวอักษรเดียว', example: "char grade = 'A';", range: 'ตัวอักษร 1 ตัว (ใส่ \'\')' },
          { name: 'var', emoji: '🎁', desc: 'ให้ compiler เดาชนิด', example: 'var count = 10;', range: 'ขึ้นกับค่าที่ใส่' },
        ],
      },
      {
        id: 'conditions',
        title: 'เงื่อนไข (Conditions)',
        icon: '🚦',
        analogy: 'เหมือนไฟจราจร — ถ้าเขียว→ไป, ถ้าแดง→หยุด, ถ้าเหลือง→ชะลอ',
        subtopics: [
          {
            name: 'if / else',
            code: `int age = 20;

if (age >= 18)
{
    Console.WriteLine("เป็นผู้ใหญ่");
}
else
{
    Console.WriteLine("ยังไม่บรรลุนิติภาวะ");
}`,
            output: 'เป็นผู้ใหญ่',
          },
          {
            name: 'switch / case',
            code: `string day = "จันทร์";

switch (day)
{
    case "จันทร์":
        Console.WriteLine("เริ่มสัปดาห์ใหม่!");
        break;
    case "ศุกร์":
        Console.WriteLine("ใกล้วันหยุดแล้ว!");
        break;
    default:
        Console.WriteLine("วันธรรมดา");
        break;
}`,
            output: 'เริ่มสัปดาห์ใหม่!',
          },
        ],
      },
      {
        id: 'loops',
        title: 'ลูป (Loops)',
        icon: '🔁',
        analogy: 'เหมือนวิ่งรอบสนาม — for กำหนดจำนวนรอบ, while วิ่งจนกว่าจะเหนื่อย, foreach วิ่งผ่านทุกจุด',
        subtopics: [
          {
            name: 'for loop',
            desc: 'ใช้เมื่อรู้จำนวนรอบที่แน่นอน',
            code: `for (int i = 1; i <= 5; i++)
{
    Console.WriteLine($"รอบที่ {i}");
}`,
            output: 'รอบที่ 1\nรอบที่ 2\nรอบที่ 3\nรอบที่ 4\nรอบที่ 5',
          },
          {
            name: 'foreach loop',
            desc: 'ใช้วนดูของทุกชิ้นใน collection',
            code: `string[] fruits = { "แอปเปิ้ล", "กล้วย", "ส้ม" };

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}`,
            output: 'แอปเปิ้ล\nกล้วย\nส้ม',
          },
        ],
      },
      {
        id: 'methods',
        title: 'Method (ฟังก์ชัน)',
        icon: '🏭',
        analogy: 'เหมือนเครื่องจักรในโรงงาน — ใส่วัตถุดิบ(parameters) → เครื่องจักรประมวลผล → ได้ผลิตภัณฑ์(return)',
        code: `// Method ที่ return ค่า
static int Add(int a, int b)
{
    return a + b;
}

// Method ที่ไม่ return ค่า (void)
static void SayHello(string name)
{
    Console.WriteLine($"สวัสดี {name}!");
}

// เรียกใช้
int result = Add(5, 3);
Console.WriteLine(result);
SayHello("น้องเจ");`,
        output: '8\nสวัสดี น้องเจ!',
      },
      {
        id: 'error-handling',
        title: 'การจัดการ Error (try/catch)',
        icon: '🛡️',
        analogy: 'เหมือนร่มกันฝน — ถ้าฝนตก(error) → กางร่ม(catch) → ไม่เปียก(โปรแกรมไม่ crash)',
        code: `try
{
    int number = int.Parse("abc"); // จะ error!
    Console.WriteLine(number);
}
catch (FormatException ex)
{
    Console.WriteLine("ข้อมูลไม่ใช่ตัวเลข!");
    Console.WriteLine($"Error: {ex.Message}");
}
finally
{
    Console.WriteLine("ทำงานเสร็จ (จะรันเสมอ)");
}`,
        output: 'ข้อมูลไม่ใช่ตัวเลข!\nError: Input string was not in a correct format.\nทำงานเสร็จ (จะรันเสมอ)',
      },
    ],
  },

  oop: {
    title: 'C# OOP — Level 2',
    description: 'Object-Oriented Programming ที่ใช้จริงในงาน',
    level: 'basic',
    concepts: [
      { term: 'Class', read: 'คลาส', meaning: 'แบบพิมพ์เขียว — กำหนดว่าวัตถุมีอะไรบ้าง' },
      { term: 'Object', read: 'ออบเจกต์', meaning: 'สิ่งของจริงที่สร้างจาก class' },
      { term: 'Encapsulation', read: 'เอ็นแคปซูเลชัน', meaning: 'ซ่อนข้อมูลภายใน ให้เข้าถึงผ่านทางที่กำหนดเท่านั้น' },
      { term: 'Inheritance', read: 'อินเฮอริแทนซ์', meaning: 'สืบทอดคุณสมบัติจาก class แม่' },
      { term: 'Polymorphism', read: 'โพลีมอร์ฟิซึม', meaning: 'รูปร่างเดียวกัน แต่พฤติกรรมต่างกัน' },
      { term: 'Abstraction', read: 'แอ็บสแตรกชัน', meaning: 'ซ่อนรายละเอียดที่ไม่จำเป็น เหลือแค่สิ่งที่ต้องรู้' },
      { term: 'Interface', read: 'อินเทอร์เฟซ', meaning: 'สัญญาที่บอกว่า class ต้องทำอะไรบ้าง' },
    ],
  },

  collections: {
    title: 'Collections & LINQ — Level 3',
    description: 'จัดการข้อมูลกลุ่มและ query ข้อมูลอย่าง pro',
    level: 'mid',
  },

  advanced: {
    title: 'C# ขั้นกลาง-สูง — Level 4',
    description: 'Feature ที่ใช้ในงาน production จริง',
    level: 'mid',
  }
};
