/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — Comprehensive Quiz Data
   Contains interactive questions for all tracks and categories
   ══════════════════════════════════════════════════════════ */

const QuizData = {
  /* ───────────────────────────────────────────────────────────
     1. C# Basics (10 Questions)
     ─────────────────────────────────────────────────────────── */
  csharp_basics: [
    {
      type: 'multiple-choice',
      question: 'ข้อใดอธิบายความแตกต่างระหว่าง Value Types และ Reference Types ใน C# ได้ถูกต้องที่สุด?',
      options: [
        'Value Types เก็บข้อมูลใน Heap ส่วน Reference Types เก็บใน Stack',
        'Value Types (เช่น int, bool, struct) เก็บข้อมูลจริงใน Stack ส่วน Reference Types (เช่น string, class) เก็บที่อยู่หน่วยความจำ (Reference) ชี้ไปยัง Heap',
        'Value Types สามารถเป็น null ได้เสมอโดยไม่ต้องใส่เครื่องหมาย ?',
        'Reference Types ไม่มีการจองหน่วยความจำใน RAM'
      ],
      answer: 1,
      explanation: 'ใน C# ชนิดข้อมูล Value Type (เช่น int, double, bool, struct) จะเก็บค่าจริงไว้ใน Stack โดยตรง ส่วน Reference Type (เช่น class, string, object, array) จะเก็บตัวแปรอ้างอิง (pointer) ไว้ใน Stack ซึ่งชี้ไปยังข้อมูลจริงที่จัดสรรใน Managed Heap',
      difficulty: 'basic',
      category: 'csharp_basics',
      language: 'csharp'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมคีย์เวิร์ดในการประกาศค่าคงที่ (Constant) ใน C# ที่ต้องกำหนดค่าทันทีขณะ compile-time',
      code: 'public class MathConstants\n{\n    public ___0___ double Pi = 3.14159265359;\n}',
      blanks: [
        { answer: ['const', 'const '], hint: 'คีย์เวิร์ดค่าคงที่' }
      ],
      explanation: 'คีย์เวิร์ด const ใช้สำหรับประกาศตัวแปรค่าคงที่ที่ต้องกำหนดค่าทันที ณ ตอนคอมไพล์ (Compile-time constant) และไม่สามารถเปลี่ยนแปลงค่าได้ตลอดการทำงาน',
      difficulty: 'basic',
      category: 'csharp_basics'
    },
    {
      type: 'bug-hunt',
      question: 'โค้ดด้านล่างมีข้อผิดพลาด (Bug) ที่ทำให้เกิด Unhandled Exception หากผู้ใช้ป้อนข้อความที่ไม่ใช่ตัวเลข บรรทัดใดคือต้นเหตุ?',
      buggyCode: 'Console.Write("กรุณากรอกอายุ: ");\nstring input = Console.ReadLine();\nint age = int.Parse(input);\nConsole.WriteLine($"ปีหน้าคุณจะอายุ {age + 1} ปี");',
      options: [
        'Console.Write("กรุณากรอกอายุ: ");',
        'string input = Console.ReadLine();',
        'int age = int.Parse(input);',
        'Console.WriteLine($"ปีหน้าคุณจะอายุ {age + 1} ปี");'
      ],
      answer: 2,
      explanation: 'การใช้ int.Parse() จะทำให้โปรแกรม Throw FormatException ทันทีหาก input เป็นตัวหนังสือหรือไม่ใช่ตัวเลข ในการทำงานจริงควรใช้ int.TryParse(input, out int age) เพื่อความปลอดภัย',
      difficulty: 'mid',
      category: 'csharp_basics'
    },
    {
      type: 'multiple-choice',
      question: 'ผลลัพธ์ของ Switch Expression ด้านล่างนี้คืออะไร เมื่อส่งคะแนน score = 85 เข้ามา?',
      context: 'int score = 85;\nstring grade = score switch\n{\n    >= 80 => "A",\n    >= 70 => "B",\n    >= 60 => "C",\n    >= 50 => "D",\n    _ => "F"\n};\nConsole.WriteLine(grade);',
      options: [
        'A',
        'B',
        'F',
        'เกิด Compile Error เพราะไม่มีคีย์เวิร์ด case และ default'
      ],
      answer: 0,
      explanation: 'C# 8.0+ แนะนำ Pattern Matching Switch Expression ซึ่งตรวจสอบเงื่อนไขจากบนลงล่าง เมื่อ score = 85 เข้าเงื่อนไขแรก >= 80 ทันที จึงคืนค่า "A" สัญลักษณ์ _ ทำหน้าที่เหมือน default case',
      difficulty: 'basic',
      category: 'csharp_basics',
      language: 'csharp'
    },
    {
      type: 'code-complete',
      question: 'ต้องการจัดการ Exception และการันตีว่าคำสั่งปิดการเชื่อมต่อ Resource จะทำงานเสมอแม้มี Error เกิดขึ้น ควรใช้บล็อกคำสั่งใดในตำแหน่งที่ว่างไว้?',
      partialCode: 'try\n{\n    dbConnection.Open();\n    dbConnection.ExecuteQuery();\n}\ncatch (Exception ex)\n{\n    logger.LogError(ex.Message);\n}\n/* เติมส่วนนี้เพื่อการันตีการคืน Resource เสมอ */\n{\n    dbConnection.Close();\n}',
      options: [
        'finally',
        'end',
        'defer',
        'always'
      ],
      answer: 0,
      explanation: 'บล็อก finally จะทำงานเสมอไม่ว่าจะเกิด Exception ขึ้นหรือไม่ เหมาะสำหรับการคืน Resource เช่น ปิดไฟล์, ปิด Database Connection หรือ Network Stream',
      difficulty: 'basic',
      category: 'csharp_basics'
    },
    {
      type: 'multiple-choice',
      question: 'หากเราต้องการวนลูปอ่านข้อมูลใน List<string> แต่มีการพยายามลบ Element ออกระหว่างวนลูปโดยใช้คำสั่ง foreach จะเกิดผลลัพธ์อย่างไร?',
      context: 'var list = new List<string> { "A", "B", "C" };\nforeach (var item in list)\n{\n    if (item == "B") list.Remove(item);\n}',
      options: [
        'ลบรายการ "B" สำเร็จ และวนลูปต่อจนจบ',
        'เกิด InvalidOperationException: Collection was modified',
        'เกิด NullReferenceException',
        'โปรแกรมค้างอยู่ใน Infinite Loop'
      ],
      answer: 1,
      explanation: 'foreach ใช้ IEnumerator ในการท่องไปตามข้อมูล ซึ่งมีกลไกป้องกันการแก้ไข Collection ระหว่างการวนลูป หากมีการ Add/Remove จะเกิด InvalidOperationException ทันที หากต้องการลบควรใช้ for ถอยหลัง หรือ list.RemoveAll(...)',
      difficulty: 'mid',
      category: 'csharp_basics',
      language: 'csharp'
    },
    {
      type: 'multiple-choice',
      question: 'วิธีใดในการแปลงสตริงเป็นตัวเลขที่แนะนำสำหรับ Production Code เพื่อป้องกัน Exception จากข้อมูลที่ไม่ถูกต้อง?',
      options: [
        'int.Parse(str)',
        '(int)str',
        'int.TryParse(str, out int result)',
        'Convert.ToInt32(str)'
      ],
      answer: 2,
      explanation: 'int.TryParse() จะคืนค่า true/false โดยไม่ขว้าง Exception ออกมา ทำให้โค้ดมีเสถียรภาพและมีประสิทธิภาพสูงกว่าการใช้ try-catch ครอบ int.Parse()',
      difficulty: 'basic',
      category: 'csharp_basics',
      language: 'csharp'
    },
    {
      type: 'bug-hunt',
      question: 'ฟังก์ชันคำนวณราคาสินค้ารวมภาษีด้านล่างมีข้อผิดพลาดทางคณิตศาสตร์/ตรรกะที่จุดใด?',
      buggyCode: 'public decimal CalculateTotal(decimal price, decimal taxRate)\n{\n    decimal taxAmount = price * (taxRate / 100);\n    decimal discount = 50;\n    decimal total = price + taxAmount - discount;\n    return total < 0 ? 0 : total;\n}',
      options: [
        'decimal taxAmount = price * (taxRate / 100);',
        'decimal discount = 50;',
        'decimal total = price + taxAmount - discount;',
        'return total < 0 ? 0 : total;'
      ],
      answer: 1,
      explanation: 'ใน C# ตัวเลข 50 เป็นประเภท int เมื่อกำหนดให้ decimal แม้จะ Implicit conversion ได้ แต่นี่เป็นการ Hardcode ค่าส่วนลดคงที่ (50) แทนที่จะรับพารามิเตอร์หรือคำนวณตามเงื่อนไข ทำให้ยอดรวมผิดพลาดกับทุกบิล',
      difficulty: 'mid',
      category: 'csharp_basics'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมสัญลักษณ์ String Interpolation ที่ถูกต้องเพื่อให้แสดงผลค่าตัวแปรในสตริงได้โดยตรง',
      code: 'string name = "Somchai";\nint level = 5;\nstring message = ___0___"ยินดีต้อนรับคุณ {name} เลเวล {level}";',
      blanks: [
        { answer: ['$', '$ '], hint: 'สัญลักษณ์นำหน้าสตริง' }
      ],
      explanation: 'ใน C# เครื่องหมาย $ นำหน้าข้อความ (String Interpolation) ช่วยให้เราสามารถแทรกตัวแปรหรือ Expression เข้าไปในวงเล็บปีกกา {variable} ได้โดยตรง ทำให้อ่านง่ายกว่า string.Format()',
      difficulty: 'basic',
      category: 'csharp_basics'
    },
    {
      type: 'multiple-choice',
      question: 'ข้อใดอธิบายการทำงานของคีย์เวิร์ด var ใน C# ได้อย่างถูกต้อง?',
      options: [
        'var ทำให้ตัวแปรกลายเป็น dynamic type ที่สามารถเปลี่ยนชนิดข้อมูลตอนรันไทม์ได้ตลอดเวลา',
        'var คือ Strongly Typed (Type Inference) ที่ Compiler จะอนุมานชนิดข้อมูลที่แน่นอนให้ตั้งแต่ตอน Compile',
        'var ใช้หน่วยความจำมากกว่าการระบุชนิดข้อมูลแบบชัดเจน',
        'var สามารถใช้เป็น Parameter ของ Method ได้'
      ],
      answer: 1,
      explanation: 'var ใน C# คือ Implicit Typed Local Variable ซึ่งเป็น Strongly Typed อย่างสมบูรณ์ Compiler จะตรวจหาชนิดข้อมูลจากค่าเริ่มต้นที่กำหนดตอน Compile-time และไม่สามารถเปลี่ยนชนิดข้อมูลภายหลังได้',
      difficulty: 'basic',
      category: 'csharp_basics',
      language: 'csharp'
    }
  ],

  /* ───────────────────────────────────────────────────────────
     2. C# OOP (8 Questions)
     ─────────────────────────────────────────────────────────── */
  csharp_oop: [
    {
      type: 'multiple-choice',
      question: 'หลักการ Encapsulation ใน OOP มีจุดประสงค์หลักเพื่ออะไร?',
      options: [
        'เพื่อให้คลาสสามารถสืบทอดฟังก์ชันการทำงานจากหลายคลาสพร้อมกันได้',
        'เพื่อซ่อนรายละเอียดการทำงานและสถานะภายในของออบเจกต์ (Information Hiding) และควบคุมการเข้าถึงผ่าน Method หรือ Property',
        'เพื่อให้เมธอดเดียวกันทำงานได้หลากหลายรูปแบบตามประเภทของคลาสลูก',
        'เพื่อแปลงโค้ดให้อยู่ในรูป Bytecode'
      ],
      answer: 1,
      explanation: 'Encapsulation (การห่อหุ้ม) คือการปกป้องข้อมูลภายในคลาสไม่ให้ภายนอกแก้ไขโดยตรง โดยกำหนดฟิลด์เป็น private แล้วสร้าง Property (get/set) หรือ Method เพื่อตรวจสอบความถูกต้องของข้อมูลก่อนการเปลี่ยนแปลง',
      difficulty: 'basic',
      category: 'csharp_oop',
      language: 'csharp'
    },
    {
      type: 'code-complete',
      question: 'ต้องการ Override เมธอด MakeSound() จากคลาสแม่ ต้องเติมคีย์เวิร์ดใดในคลาส Dog?',
      partialCode: 'public class Animal\n{\n    public virtual void MakeSound()\n    {\n        Console.WriteLine("Some sound");\n    }\n}\n\npublic class Dog : Animal\n{\n    public /* เติมคีย์เวิร์ด */ void MakeSound()\n    {\n        Console.WriteLine("โฮ่งๆ!");\n    }\n}',
      options: [
        'override',
        'virtual',
        'new',
        'shadow'
      ],
      answer: 0,
      explanation: 'การทำ Polymorphism แบบ Method Overriding ใน C# เมธอดที่คลาสแม่ต้องระบุเป็น virtual (หรือ abstract) และเมธอดที่คลาสลูกต้องใช้คีย์เวิร์ด override',
      difficulty: 'basic',
      category: 'csharp_oop'
    },
    {
      type: 'multiple-choice',
      question: 'ข้อใดคือความแตกต่างสำคัญระหว่าง Abstract Class และ Interface ใน C#?',
      options: [
        'Interface มี Constructor ได้ แต่ Abstract Class ไม่มี Constructor',
        'คลาสหนึ่งสามารถ Implement ได้หลาย Interface แต่สามารถสืบทอด (Inherit) ได้เพียง 1 Class (Abstract หรือ Non-Abstract)',
        'Interface ไม่สามารถมี Method Signature ได้',
        'Abstract Class ไม่สามารถมี Fields หรือ State ได้เลย'
      ],
      answer: 1,
      explanation: 'C# ไม่รองรับ Multiple Class Inheritance ทำให้คลาสสืบทอดได้เพียงคลาสเดียว (Single Inheritance) แต่สามารถ Implement หลาย Interface พร้อมกันได้ เพื่อกำหนดสัญญา (Contract) ในการทำงาน',
      difficulty: 'mid',
      category: 'csharp_oop',
      language: 'csharp'
    },
    {
      type: 'bug-hunt',
      question: 'โค้ดด้านล่างไม่สามารถคอมไพล์ผ่านเนื่องจาก Access Modifier บรรทัดใดเกิดข้อผิดพลาด?',
      buggyCode: 'public class BankAccount\n{\n    private decimal _balance;\n    public BankAccount(decimal initialBalance)\n    {\n        _balance = initialBalance;\n    }\n}\n\npublic class Program\n{\n    public static void Main()\n    {\n        var acc = new BankAccount(1000);\n        acc._balance = 5000; // บรรทัดนี้\n    }\n}',
      options: [
        'private decimal _balance;',
        'public BankAccount(decimal initialBalance)',
        'var acc = new BankAccount(1000);',
        'acc._balance = 5000; // บรรทัดนี้'
      ],
      answer: 3,
      explanation: 'ฟิลด์ _balance ถูกประกาศเป็น private ซึ่งทำให้เข้าถึงได้เฉพาะภายในคลาส BankAccount เท่านั้น คลาสภายนอกอย่าง Program จึงไม่สามารถเข้าถึงหรือแก้ไขค่าได้โดยตรง',
      difficulty: 'mid',
      category: 'csharp_oop'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมคีย์เวิร์ด Property Accessor ใน C# 9+ ที่อนุญาตให้กำหนดค่าได้เฉพาะตอน Object Initialization เท่านั้น (Immutable)',
      code: 'public class UserProfile\n{\n    public int Id { get; ___0___; }\n    public string FullName { get; set; }\n}',
      blanks: [
        { answer: ['init', 'init;'], hint: 'คีย์เวิร์ด init-only setter' }
      ],
      explanation: 'init accessor (เปิดตัวใน C# 9) ใช้สร้าง immutable property ที่สามารถกำหนดค่าได้เฉพาะตอนสร้างออบเจกต์ (ผ่าน Constructor หรือ Object Initializer) หลังจากนั้นจะไม่สามารถแก้ไขค่าได้',
      difficulty: 'basic',
      category: 'csharp_oop'
    },
    {
      type: 'multiple-choice',
      question: 'การมีชื่อเมธอดเดียวกันภายในคลาสเดียวกัน แต่มี Parameter แตกต่างกัน (จำนวนหรือชนิดข้อมูล) เรียกว่าอะไร?',
      options: [
        'Method Overriding (Dynamic Polymorphism)',
        'Method Overloading (Static / Compile-time Polymorphism)',
        'Method Shadowing',
        'Method Inversion'
      ],
      answer: 1,
      explanation: 'Method Overloading คือการนิยามเมธอดชื่อเดียวกันหลายเวอร์ชันโดยมี Signature ของพารามิเตอร์แตกต่างกัน เป็นการตัดสินใจเลือกเมธอดตอน Compile-time (Static Polymorphism)',
      difficulty: 'basic',
      category: 'csharp_oop',
      language: 'csharp'
    },
    {
      type: 'multiple-choice',
      question: 'หากคลาสลูกต้องการเรียกใช้งาน Constructor ของคลาสแม่ จะต้องใช้คีย์เวิร์ดใด?',
      context: 'public class Employee : Person\n{\n    public string Department { get; set; }\n    public Employee(string name, string dept) : base(name)\n    {\n        Department = dept;\n    }\n}',
      options: [
        ': super(name)',
        ': parent(name)',
        ': base(name)',
        ': this(name)'
      ],
      answer: 2,
      explanation: 'ใน C# เราใช้คีย์เวิร์ด : base(...) เพื่อส่งต่ออาร์กิวเมนต์ไปยัง Constructor ของคลาสแม่ (เทียบเท่า super ในภาษา Java/TypeScript)',
      difficulty: 'mid',
      category: 'csharp_oop',
      language: 'csharp'
    },
    {
      type: 'code-complete',
      question: 'ต้องการนิยาม Interface ชื่อ IRepository สำหรับการจัดการข้อมูล ควรเขียนประกาศหัวคลาสอย่างไร?',
      partialCode: '/* เติมส่วนประกาศ Interface */\n{\n    Task<User> GetByIdAsync(int id);\n    Task AddAsync(User entity);\n}',
      options: [
        'public interface IRepository',
        'public abstract class IRepository',
        'public protocol IRepository',
        'public contract IRepository'
      ],
      answer: 0,
      explanation: 'ใน C# เราใช้คีย์เวิร์ด interface ในการนิยาม Contract โดยธรรมเนียมนิยมจะขึ้นต้นชื่อด้วยตัวอักษร I เสมอ เช่น IRepository, IUserService',
      difficulty: 'basic',
      category: 'csharp_oop'
    }
  ],

  /* ───────────────────────────────────────────────────────────
     3. C# Collections & LINQ (6 Questions)
     ─────────────────────────────────────────────────────────── */
  csharp_collections: [
    {
      type: 'multiple-choice',
      question: 'ข้อใดเปรียบเทียบระหว่าง List<T> และ T[] (Array) ใน C# ได้ถูกต้องที่สุด?',
      options: [
        'Array ปรับขยายขนาดได้อัตโนมัติ ส่วน List<T> มีขนาดคงที่หลังสร้าง',
        'Array มีขนาดคงที่ (Fixed-size) และจองหน่วยความจำแบบต่อเนื่อง ส่วน List<T> ขยายขนาดได้อัตโนมัติ (Dynamic-size) ภายในครอบ Array ไว้',
        'List<T> เป็น Value type ส่วน Array เป็น Reference type',
        'Array ประมวลผลช้ากว่า List<T> เสมอในทุกกรณี'
      ],
      answer: 1,
      explanation: 'Array มีขนาดคงที่ตั้งแต่ตอนจองหน่วยความจำ ส่วน List<T> เป็น Generics Collection ที่มีกลไกขยายขนาดเบื้องหลังอัตโนมัติเมื่อขนาดข้อมูลเกิน Capacity',
      difficulty: 'basic',
      category: 'csharp_collections',
      language: 'csharp'
    },
    {
      type: 'multiple-choice',
      question: 'Dictionary<TKey, TValue> มีประสิทธิภาพความเร็ว (Time Complexity) ในการค้นหาข้อมูลด้วย Key เฉลี่ยอยู่ที่ระดับใด?',
      options: [
        'O(N) — ต้องค้นหาเรียงทีละตัว',
        'O(log N) — ค้นหาแบบ Binary Search',
        'O(1) — Constant Time ผ่าน Hash Function',
        'O(N²)'
      ],
      answer: 2,
      explanation: 'Dictionary ใช้โครงสร้างข้อมูลแบบ Hash Table ซึ่งคำนวณ Hash Code ของ Key เพื่อเข้าถึงตำแหน่งข้อมูลโดยตรง จึงมีความเร็วเฉลี่ยระดับ O(1)',
      difficulty: 'basic',
      category: 'csharp_collections',
      language: 'csharp'
    },
    {
      type: 'code-complete',
      question: 'ต้องการกรองเฉพาะสินค้าที่มีราคามากกว่า 100 บาท และแปลงให้ได้เฉพาะชื่อสินค้า ต้องใช้ LINQ เมธอดใดตามลำดับ?',
      partialCode: 'var productNames = products\n    ./* กรองข้อมูล */(p => p.Price > 100)\n    ./* แปลงข้อมูล */(p => p.Name)\n    .ToList();',
      options: [
        'Where แล้วตามด้วย Select',
        'Filter แล้วตามด้วย Map',
        'Select แล้วตามด้วย Where',
        'FindAll แล้วตามด้วย Transform'
      ],
      answer: 0,
      explanation: 'ใน LINQ ของ C# เราใช้ .Where(...) ในการกรองเงื่อนไข (เทียบเท่า filter) และใช้ .Select(...) ในการ Projection/แปลงรูปข้อมูล (เทียบเท่า map)',
      difficulty: 'basic',
      category: 'csharp_collections'
    },
    {
      type: 'bug-hunt',
      question: 'โค้ดด้านล่างมีปัญหา Deferred Execution (Multiple Enumeration) ทำให้ LINQ Query รันซ้ำ 2 รอบ บรรทัดใดควรแปลงเป็น .ToList() เพื่อแก้ปัญหา?',
      buggyCode: 'var query = dbContext.Users.Where(u => u.IsActive);\nint total = query.Count();\nvar activeUsers = query.OrderBy(u => u.Name);\nreturn activeUsers;',
      options: [
        'var query = dbContext.Users.Where(u => u.IsActive);',
        'int total = query.Count();',
        'var activeUsers = query.OrderBy(u => u.Name);',
        'return activeUsers;'
      ],
      answer: 0,
      explanation: 'เนื่องจาก LINQ เป็น Deferred Execution ตัวแปร query ยังไม่ได้ถูก Execute จริง จนกระทั่งเรียก Count() รอบหนึ่ง และ OrderBy() ในภายหลัง การใส่ .ToList() ตั้งแต่บรรทัดแรกจะช่วยดึงข้อมูลมาเก็บใน Memory รอบเดียว',
      difficulty: 'mid',
      category: 'csharp_collections'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมสัญลักษณ์ Lambda Operator (ลูกศร) สำหรับเขียน Lambda Expression ใน LINQ',
      code: 'var adultUsers = users.Where(u ___0___ u.Age >= 18).ToList();',
      blanks: [
        { answer: ['=>', '=> '], hint: 'เครื่องหมายลูกศรแลมบ์ดา' }
      ],
      explanation: 'สัญลักษณ์ => เรียกว่า Lambda Operator หรืออ่านว่า "goes to" ใช้ในการสร้าง Anonymous Function หรือ Expression Lambda ใน C#',
      difficulty: 'basic',
      category: 'csharp_collections'
    },
    {
      type: 'multiple-choice',
      question: 'ความแตกต่างระหว่าง .First() และ .FirstOrDefault() ใน LINQ คืออะไร?',
      options: [
        '.First() คืนค่า null เสมอหากไม่พบข้อมูล ส่วน .FirstOrDefault() จะเกิด Exception',
        '.First() จะ Throw InvalidOperationException หากไม่พบข้อมูล ส่วน .FirstOrDefault() จะคืนค่า Default (เช่น null สำหรับ Object หรือ 0 สำหรับ int)',
        'ทั้งสองเมธอดทำงานเหมือนกันทุกประการ',
        '.FirstOrDefault() ทำงานเร็วกว่า .First() เสมอ 2 เท่า'
      ],
      answer: 1,
      explanation: 'หากไม่พบข้อมูลที่ตรงกับเงื่อนไข .First() จะขว้าง InvalidOperationException: Sequence contains no matching element ทันที ขณะที่ .FirstOrDefault() ปลอดภัยกว่าเพราะจะคืนค่า default (null สำหรับ reference type)',
      difficulty: 'mid',
      category: 'csharp_collections',
      language: 'csharp'
    }
  ],

  /* ───────────────────────────────────────────────────────────
     4. C# Advanced (6 Questions)
     ─────────────────────────────────────────────────────────── */
  csharp_advanced: [
    {
      type: 'multiple-choice',
      question: 'การใช้ async และ await ใน C# มีประโยชน์หลักอย่างไร?',
      options: [
        'สร้าง Thread ใหม่ให้กับทุกๆ บรรทัดคำสั่งเพื่อเพิ่มความเร็ว',
        'ช่วยให้การทำงานกับ I/O-bound Operations (เช่น Database, API, Disk) เป็นแบบ Non-blocking โดยปลดปล่อย Thread กลับเข้า ThreadPool ระหว่างรอผลลัพธ์',
        'แปลงโค้ดทั้งหมดให้ทำงานบน GPU',
        'ป้องกันไม่ให้เกิด Exception ในโปรแกรม'
      ],
      answer: 1,
      explanation: 'async/await ไม่ได้สร้าง Thread ใหม่มาทำงานเสมอไป แต่เป็นการจัดการแบบ Asynchronous ที่ไม่บล็อก Thread ปัจจุบัน ทำให้เซิร์ฟเวอร์สามารถรับ Request อื่นๆ ได้ต่อเนื่องในขณะรอ I/O ตอบกลับ',
      difficulty: 'mid',
      category: 'csharp_advanced',
      language: 'csharp'
    },
    {
      type: 'code-complete',
      question: 'ต้องการสร้าง Generic Method ชื่อ Swap เพื่อสลับค่าตัวแปรสองตัวที่เป็นชนิดข้อมูลใดก็ได้ ต้องระบุ Type Parameter อย่างไร?',
      partialCode: 'public static void Swap/* เติม Generic Type */(ref T a, ref T b)\n{\n    T temp = a;\n    a = b;\n    b = temp;\n}',
      options: [
        '<T>',
        '(T)',
        '[T]',
        '{T}'
      ],
      answer: 0,
      explanation: 'Generics ใน C# ใช้วงเล็บแหลม <T> เพื่อกำหนด Type Parameter ซึ่งช่วยให้เขียนโค้ดที่สามารถนำกลับมาใช้ซ้ำได้กับชนิดข้อมูลใดๆ โดยยังคงความปลอดภัยด้าน Type Safety (ไม่ต้อง Boxing/Unboxing)',
      difficulty: 'mid',
      category: 'csharp_advanced'
    },
    {
      type: 'multiple-choice',
      question: 'โอเปอเรเตอร์ ?? (Null-coalescing operator) ใน C# ทำงานอย่างไร?',
      context: 'string displayName = userName ?? "ผู้เยี่ยมชม";',
      options: [
        'ตรวจสอบว่าถ้า userName เท่ากับ "ผู้เยี่ยมชม" ให้คืนค่า true',
        'ถ้า userName ไม่เป็น null ให้ใช้ค่า userName แต่ถ้าเป็น null ให้ใช้ค่าสำรองคือ "ผู้เยี่ยมชม"',
        'ทำการต่อสตริงทั้งสองตัวเข้าด้วยกัน',
        'ตรวจสอบความยาวของสตริงทั้งสองตัว'
      ],
      answer: 1,
      explanation: '?? (Null-coalescing operator) ใช้สำหรับกำหนด Fallback Value โดยจะคืนค่าฝั่งซ้ายหากค่าไม่เป็น null และจะคืนค่าฝั่งขวาหากค่าฝั่งซ้ายเป็น null',
      difficulty: 'basic',
      category: 'csharp_advanced',
      language: 'csharp'
    },
    {
      type: 'bug-hunt',
      question: 'การประกาศ Asynchronous Method ด้านล่างมี Bad Practice ร้ายแรงที่อาจทำให้ App Crash เนื่องจากไม่สามารถ Catch Exception ได้ บรรทัดใดมีข้อผิดพลาด?',
      buggyCode: 'public async void SaveUserDataAsync(User user)\n{\n    await _repository.SaveAsync(user);\n    _logger.LogInformation("บันทึกสำเร็จ");\n}',
      options: [
        'public async void SaveUserDataAsync(User user)',
        'await _repository.SaveAsync(user);',
        '_logger.LogInformation("บันทึกสำเร็จ");',
        'ไม่มีข้อผิดพลาด'
      ],
      answer: 0,
      explanation: 'การใช้ async void (ยกเว้นใน Event Handler ของ UI) เป็น Anti-pattern ร้ายแรง เพราะ Caller ไม่สามารถ await หรือ catch Exception ได้ หากเกิด Error จะกลายเป็น Unhandled Exception และอาจทำให้ Process ดับ ควรเปลี่ยนเป็น async Task',
      difficulty: 'mid',
      category: 'csharp_advanced'
    },
    {
      type: 'multiple-choice',
      question: 'ความแตกต่างระหว่าง Action<T> และ Func<T, TResult> ใน C# คืออะไร?',
      options: [
        'Action รับพารามิเตอร์และคืนค่าผลลัพธ์ ส่วน Func ไม่มีการคืนค่า (void)',
        'Action รับพารามิเตอร์แต่ไม่คืนค่า (void) ส่วน Func รับพารามิเตอร์และต้องมีค่าที่คืนกลับเสมอ (Return value)',
        'Action เป็น Asynchronous เสมอ ส่วน Func เป็น Synchronous',
        'Action ใช้ได้เฉพาะกับตัวเลข ส่วน Func ใช้กับชนิดข้อมูลใดก็ได้'
      ],
      answer: 1,
      explanation: 'Action<...> เป็น built-in delegate สำหรับ method ที่ไม่มีการคืนค่า (void) ส่วน Func<..., TResult> เป็น delegate สำหรับ method ที่มี return value โดย Type ตัวสุดท้ายคือ Return Type เสมอ',
      difficulty: 'mid',
      category: 'csharp_advanced',
      language: 'csharp'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมคีย์เวิร์ดที่ใช้ในการจัดการและคืนหน่วยความจำ IDisposable อัตโนมัติเมื่อสิ้นสุดขอบเขตการทำงาน',
      code: '___0___ var stream = new FileStream("data.txt", FileMode.Open);\n// อ่านข้อมูลและปิด Stream อัตโนมัติเมื่อจบ Scope',
      blanks: [
        { answer: ['using', 'using '], hint: 'คีย์เวิร์ด using declaration' }
      ],
      explanation: 'using declaration (หรือ using block) จะเรียกเมธอด .Dispose() ให้อัตโนมัติเมื่อตัวแปรหลุดจาก Scope ช่วยป้องกัน Memory Leak จาก Unmanaged Resources',
      difficulty: 'basic',
      category: 'csharp_advanced'
    }
  ],

  /* ───────────────────────────────────────────────────────────
     5. .NET Core & Architecture (8 Questions)
     ─────────────────────────────────────────────────────────── */
  dotnet_core: [
    {
      type: 'multiple-choice',
      question: 'ใน ASP.NET Core (.NET 6/7/8/9) หน้าที่หลักของไฟล์ Program.cs คืออะไร?',
      options: [
        'เก็บตารางฐานข้อมูลและ Migration Scripts ทั้งหมด',
        'เป็น Entry Point ของแอปพลิเคชัน ทำหน้าที่ตั้งค่า WebApplicationBuilder, ลงทะเบียน Services ใน DI Container และกำหนด Middleware Pipeline',
        'ทำหน้าที่ Render HTML ฝั่ง Browser',
        'จัดการเฉพาะการเชื่อมต่ออินเทอร์เน็ตของเครื่องเซิร์ฟเวอร์'
      ],
      answer: 1,
      explanation: 'Program.cs ใช้ Top-level statements เป็นจุดเริ่มต้นการทำงานของแอป ทำหน้าที่สร้าง Builder, Add Services ลงใน IServiceCollection และ Build WebApplication เพื่อกำหนด Request Processing Pipeline ด้วย UseMiddleware ต่างๆ',
      difficulty: 'basic',
      category: 'dotnet_core',
      language: 'csharp'
    },
    {
      type: 'multiple-choice',
      question: 'การลงทะเบียน Service ด้วย AddScoped() ใน Dependency Injection มีพฤติกรรมอย่างไร?',
      options: [
        'สร้าง Instance ใหม่ทุกครั้งที่มีการร้องขอ (Per-dependency resolution)',
        'สร้าง Instance ขึ้นมาเพียงตัวเดียวตลอดอายุการทำงานของแอปพลิเคชัน (Singleton)',
        'สร้าง Instance 1 ตัวต่อ 1 HTTP Request และใช้ซ้ำร่วมกันได้ภายใน Request เดียวกันนั้น',
        'สร้าง Instance ใหม่ทุกๆ 5 นาที'
      ],
      answer: 2,
      explanation: 'Scoped Lifetime (เช่น AddScoped) จะสร้าง Object ใหม่ 1 ตัวสำหรับแต่ละ HTTP Request และแชร์ Instance นั้นให้กับทุก Class ที่ต้องการใช้งานใน Scope ของ Request นั้น เหมาะสำหรับ DbContext หรือ Unit of Work',
      difficulty: 'basic',
      category: 'dotnet_core',
      language: 'csharp'
    },
    {
      type: 'code-complete',
      question: 'ต้องการลงทะเบียนคลาส UserService ภายใต้อินเทอร์เฟซ IUserService แบบ Scoped ใน Program.cs ต้องเขียนคำสั่งอย่างไร?',
      partialCode: 'var builder = WebApplication.CreateBuilder(args);\n\n/* เติมคำสั่งลงทะเบียน Service */\n\nvar app = builder.Build();',
      options: [
        'builder.Services.AddScoped<IUserService, UserService>();',
        'builder.Services.AddTransient<UserService>();',
        'builder.Services.RegisterService(IUserService, UserService);',
        'builder.Services.AddSingleton<IUserService>();'
      ],
      answer: 0,
      explanation: 'การลงทะเบียน Service กับ Interface ใน ASP.NET Core ใช้รูปแบบ builder.Services.AddScoped<TInterface, TImplementation>() เพื่อให้สามารถฉีด (Inject) IUserService ผ่าน Constructor ได้',
      difficulty: 'basic',
      category: 'dotnet_core'
    },
    {
      type: 'multiple-choice',
      question: 'ลำดับการทำงานของ Middleware Pipeline ใน ASP.NET Core มีลักษณะอย่างไร?',
      options: [
        'ทำงานแบบสุ่มตามความเร็วของ CPU',
        'ทำงานแบบ FIFO วิ่งทางเดียวไปแล้วไม่ย้อนกลับ',
        'ทำงานแบบสองทิศทาง (Russian Doll / Two-way Pipeline) Request วิ่งตามลำดับที่ประกาศ และ Response วิ่งย้อนกลับลำดับเดิม',
        'ทำงานเฉพาะตอนที่เกิด Exception เท่านั้น'
      ],
      answer: 2,
      explanation: 'Middleware ใน ASP.NET Core เรียงต่อกันเป็น Pipeline เมื่อมี Request เข้ามาจะผ่าน Middleware แต่ละตัวตามลำดับที่ลงทะเบียนไว้ใน Program.cs และเมื่อประมวลผลเสร็จ Response จะไหลย้อนกลับผ่าน Middleware เดิมในทิศทางตรงกันข้าม',
      difficulty: 'mid',
      category: 'dotnet_core',
      language: 'csharp'
    },
    {
      type: 'bug-hunt',
      question: 'โค้ดด้านล่างทำให้เกิดปัญหา Captive Dependency (Scope Mismatch) ที่อาจทำให้ข้อมูลรั่วไหลหรือ Memory Leak บรรทัดใดคือต้นเหตุ?',
      buggyCode: 'builder.Services.AddScoped<IOrderRepository, OrderRepository>();\nbuilder.Services.AddSingleton<OrderNotificationService>();\n// OrderNotificationService มี Constructor รับ IOrderRepository',
      options: [
        'builder.Services.AddScoped<IOrderRepository, OrderRepository>();',
        'builder.Services.AddSingleton<OrderNotificationService>();',
        'ไม่มีข้อผิดพลาด ใช้งานได้ปกติ',
        'ทั้งสองบรรทัดผิดไวยากรณ์'
      ],
      answer: 1,
      explanation: 'Captive Dependency เกิดขึ้นเมื่อ Singleton Service ดึงเอา Scoped Service ไปใช้งานใน Constructor ทำให้ Scoped Service นั้นถูกกักขัง (Captive) กลายเป็น Singleton ไปด้วย ส่งผลให้ DbContext หรือข้อมูลประจำ Request ไม่ถูก Dispose',
      difficulty: 'mid',
      category: 'dotnet_core'
    },
    {
      type: 'multiple-choice',
      question: 'ไฟล์ appsettings.Development.json ใน .NET มีความสำคัญอย่างไร?',
      options: [
        'ใช้เก็บโค้ดภาษา C# สำหรับการทดสอบ',
        'ใช้ Override การตั้งค่าจาก appsettings.json หลัก เฉพาะเมื่อรันแอปพลิเคชันใน Environment ชื่อ "Development"',
        'เป็นไฟล์ที่ต้องอัปโหลดขึ้น Production Server เสมอ',
        'ใช้บันทึกประวัติการ Commit ของ Git'
      ],
      answer: 1,
      explanation: 'ระบบ Configuration ใน ASP.NET Core รองรับ Environment-specific settings โดยค่าใน appsettings.{Environment}.json จะเข้าไปทับ (Override) ค่าใน appsettings.json เมื่อตัวแปรสภาพแวดล้อมตรงกัน',
      difficulty: 'basic',
      category: 'dotnet_core',
      language: 'json'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมคำสั่ง Middleware ที่ใช้เปิดใช้งานการตรวจสอบสิทธิ์ความปลอดภัยใน Program.cs',
      code: 'app.UseAuthentication();\napp.___0___();',
      blanks: [
        { answer: ['UseAuthorization', 'UseAuthorization()'], hint: 'คำสั่ง UseAuthorization' }
      ],
      explanation: 'ลำดับ Middleware ด้านความปลอดภัยต้องเป็น app.UseAuthentication() (ยืนยันตัวตนว่าคุณคือใคร) ก่อน แล้วจึงตามด้วย app.UseAuthorization() (ตรวจสอบสิทธิ์ว่าคุณทำอะไรได้บ้าง)',
      difficulty: 'basic',
      category: 'dotnet_core'
    },
    {
      type: 'multiple-choice',
      question: 'ไฟล์นามสกุล .csproj ในโปรเจกต์ .NET ทำหน้าที่อะไร?',
      options: [
        'เก็บรูปภาพและไอคอนทั้งหมดของระบบ',
        'เป็นไฟล์ XML ที่กำหนด Target Framework, NuGet Package Dependencies, Build Configurations และ Project Settings',
        'เป็นไฟล์ Database สำหรับ SQLite',
        'เป็นไฟล์เก็บรหัสผ่านของระบบ'
      ],
      answer: 1,
      explanation: '.csproj (C# Project File) คือหัวใจของโปรเจกต์ที่ระบุ SDK, Target .NET Version (เช่น net8.0), รายชื่อแพ็กเกจ NuGet ที่ติดตั้ง (<PackageReference>) และเงื่อนไขการคอมไพล์',
      difficulty: 'basic',
      category: 'dotnet_core',
      language: 'xml'
    }
  ],

  /* ───────────────────────────────────────────────────────────
     6. RESTful APIs (8 Questions)
     ─────────────────────────────────────────────────────────── */
  rest_api: [
    {
      type: 'multiple-choice',
      question: 'HTTP Method ใดตามหลักการ REST มีคุณสมบัติเป็น Idempotent (เรียกซ้ำหลายครั้งด้วยข้อมูลเดิม ผลลัพธ์สถานะบนเซิร์ฟเวอร์ยังคงเหมือนเดิม)?',
      options: [
        'POST',
        'GET, PUT, DELETE',
        'PATCH อย่างเดียว',
        'ไม่มี Method ใดเป็น Idempotent'
      ],
      answer: 1,
      explanation: 'GET, PUT, DELETE ถูกออกแบบให้เป็น Idempotent คือการยิง Request ซ้ำด้วยข้อมูลเดิมจะไม่ทำให้สถานะระบบเปลี่ยนไปจากครั้งแรก (ต่างจาก POST ที่การส่งซ้ำจะสร้าง Resource ใหม่เพิ่มขึ้นเรื่อยๆ)',
      difficulty: 'basic',
      category: 'rest_api',
      language: 'csharp'
    },
    {
      type: 'multiple-choice',
      question: 'เมื่อผู้ใช้ส่ง Request เพื่อขอสร้างข้อมูลใหม่สำเร็จ เซิร์ฟเวอร์ควรตอบกลับด้วย HTTP Status Code ใดที่ถูกต้องตามมาตรฐาน?',
      options: [
        '200 OK',
        '201 Created',
        '204 No Content',
        '302 Found'
      ],
      answer: 1,
      explanation: '201 Created คือ Status Code มาตรฐานสำหรับการสร้าง Resource ใหม่สำเร็จ มักจะส่งกลับพร้อม Header Location ที่ชี้ไปยัง URL ของข้อมูลที่เพิ่งสร้างขึ้น',
      difficulty: 'basic',
      category: 'rest_api',
      language: 'csharp'
    },
    {
      type: 'code-complete',
      question: 'ต้องการประกาศ Controller ให้เป็น Web API Controller และกำหนด Base Route เป็น "api/products" ต้องใช้ Attribute ใด?',
      partialCode: '/* เติม Attributes */\npublic class ProductsController : ControllerBase\n{\n}',
      options: [
        '[ApiController]\n[Route("api/[controller]")]',
        '[WebMethod]\n[Url("api/products")]',
        '[RestService]\n[Path("api/products")]',
        '[HttpController]\n[Endpoint("api/[controller]")]'
      ],
      answer: 0,
      explanation: '[ApiController] ช่วยเปิดฟีเจอร์อัตโนมัติ เช่น Model Validation อัตโนมัติ (400 Bad Request) และ Inference rules ส่วน [Route("api/[controller]")] จะแทนที่ [controller] ด้วยชื่อหน้าคลาสอัตโนมัติ',
      difficulty: 'basic',
      category: 'rest_api'
    },
    {
      type: 'multiple-choice',
      question: 'Attribute ใดใช้ระบุว่าต้องการรับข้อมูล Payload ขนาดใหญ่ (JSON Body) เข้ามาเป็น Parameter ของ Action Method?',
      options: [
        '[FromQuery]',
        '[FromRoute]',
        '[FromBody]',
        '[FromHeader]'
      ],
      answer: 2,
      explanation: '[FromBody] บอกให้ ASP.NET Core Model Binder ทำการ Deserialization ข้อมูลจาก HTTP Request Body (โดยทั่วไปคือ JSON) มาแปลงเป็น C# Object',
      difficulty: 'basic',
      category: 'rest_api',
      language: 'csharp'
    },
    {
      type: 'bug-hunt',
      question: 'Endpoint สำหรับดึงข้อมูลรายตัวด้านล่าง มีข้อผิดพลาดในการตั้งชื่อ Route Parameter ทำให้ id ได้ค่าเป็น 0 เสมอ บรรทัดใดผิด?',
      buggyCode: '[HttpGet("{productId}")]\npublic async Task<IActionResult> GetById([FromRoute] int id)\n{\n    var product = await _repo.GetByIdAsync(id);\n    return product != null ? Ok(product) : NotFound();\n}',
      options: [
        '[HttpGet("{productId}")]',
        'public async Task<IActionResult> GetById([FromRoute] int id)',
        'var product = await _repo.GetByIdAsync(id);',
        'return product != null ? Ok(product) : NotFound();'
      ],
      answer: 0,
      explanation: 'ชื่อ Parameter ใน Route template {productId} ไม่ตรงกับชื่อ Parameter ในเมธอด (int id) ทำให้ Model Binder ไม่สามารถจับคู่ค่าได้ ควรแก้ template เป็น [HttpGet("{id}")] หรือเปลี่ยนชื่อ parameter เป็น productId',
      difficulty: 'mid',
      category: 'rest_api'
    },
    {
      type: 'multiple-choice',
      question: 'ทำไมในระดับสถาปัตยกรรมระดับมืออาชีพ จึงไม่ควรส่ง Entity จาก Database (EF Core) ออกไปเป็น Response ของ API โดยตรง?',
      options: [
        'เพราะ Entity ไม่รองรับการแปลงเป็น JSON',
        'เพื่อป้องกันการเปิดเผยข้อมูลสำคัญ (เช่น PasswordHash), หลีกเลี่ยงปัญหา Circular Reference จาก Navigation Properties และแยก Domain Model ออกจาก API Contract',
        'เพราะ C# บังคับให้ใช้ DTO เสมอ',
        'เพื่อทำให้ API ทำงานช้าลงเพื่อความปลอดภัย'
      ],
      answer: 1,
      explanation: 'การใช้ DTO (Data Transfer Object) ช่วยให้เราควบคุมข้อมูลที่ส่งออกไปได้อย่างปลอดภัย ป้องกันปัญหา Over-posting/Mass Assignment และตัดปัญหา Infinite Loop เมื่อ Entity มีความสัมพันธ์แบบสองทิศทาง',
      difficulty: 'mid',
      category: 'rest_api',
      language: 'csharp'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมคำสั่งตอบกลับข้อมูลเมื่อการประมวลผลสำเร็จและต้องการส่งข้อมูลกลับด้วย HTTP Status 200',
      code: '[HttpGet]\npublic IActionResult GetAll()\n{\n    var items = _service.GetItems();\n    return ___0___(items);\n}',
      blanks: [
        { answer: ['Ok', 'Ok()'], hint: 'ฟังก์ชันคืนค่า 200 OK' }
      ],
      explanation: 'เมธอด Ok(data) ใน ControllerBase จะคืนค่า OkObjectResult พร้อม HTTP Status Code 200 และแนบข้อมูลในบอดี้',
      difficulty: 'basic',
      category: 'rest_api'
    },
    {
      type: 'multiple-choice',
      question: 'ข้อใดคือสาเหตุหลักที่ Browser แสดง Error "CORS (Cross-Origin Resource Sharing) Error" เมื่อ Frontend ยิง API?',
      options: [
        'สาย LAN ของเซิร์ฟเวอร์หลุด',
        'Frontend (เช่น http://localhost:3000) ส่ง Request ไปยัง Backend (เช่น https://localhost:7000) ที่อยู่คนละ Origin และ Backend ไม่ได้ประกาศ Allow Header/Origin ไว้',
        'Database รหัสผ่านไม่ถูกต้อง',
        'ไฟล์ C# ไม่ได้คอมไพล์'
      ],
      answer: 1,
      explanation: 'CORS เป็นกลไกความปลอดภัยของเว็บเบราว์เซอร์ที่บล็อกการส่ง Request ข้าม Origin (คนละ Domain, Protocol หรือ Port) เว้นแต่เซิร์ฟเวอร์ปลายทางจะส่ง Header Access-Control-Allow-Origin อนุญาตไว้อย่างถูกต้อง',
      difficulty: 'mid',
      category: 'rest_api',
      language: 'csharp'
    }
  ],

  /* ───────────────────────────────────────────────────────────
     7. SQL Basics (8 Questions)
     ─────────────────────────────────────────────────────────── */
  sql_basics: [
    {
      type: 'multiple-choice',
      question: 'ลำดับการประมวลผล (Logical Execution Order) ของคำสั่ง SQL ฝั่ง Database Engine เริ่มต้นและสิ้นสุดที่ Clause ใด?',
      options: [
        'เริ่มที่ SELECT และจบที่ FROM',
        'เริ่มที่ FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
        'เริ่มที่ SELECT → FROM → WHERE → ORDER BY',
        'ประมวลผลทุก Clause พร้อมกันแบบสุ่ม'
      ],
      answer: 1,
      explanation: 'Database Engine ไม่ได้เริ่มรันที่ SELECT ก่อน แต่เริ่มจากหาตารางข้อมูล (FROM/JOIN) แล้วกรองแถว (WHERE) จัดกลุ่ม (GROUP BY) กรองกลุ่ม (HAVING) ดึงคอลัมน์ (SELECT) และเรียงลำดับเป็นขั้นตอนท้ายๆ (ORDER BY)',
      difficulty: 'mid',
      category: 'sql_basics',
      language: 'sql'
    },
    {
      type: 'multiple-choice',
      question: 'หากต้องการดึงข้อมูลลูกค้า "ทุกคน" แม้ว่าลูกค้ารายนั้นจะยังไม่เคยมีประวัติการสั่งซื้อ (Orders) เลยก็ตาม ควรใช้ JOIN ชนิดใด?',
      options: [
        'INNER JOIN',
        'LEFT JOIN (LEFT OUTER JOIN)',
        'CROSS JOIN',
        'SELF JOIN'
      ],
      answer: 1,
      explanation: 'LEFT JOIN จะดึงข้อมูลทั้งหมดจากตารางฝั่งซ้าย (Customers) ออกมาเสมอ และหากไม่มีข้อมูลคู่สมพงษ์ในตารางฝั่งขวา (Orders) คอลัมน์ของฝั่งขวาจะแสดงค่าเป็น NULL',
      difficulty: 'basic',
      category: 'sql_basics',
      language: 'sql'
    },
    {
      type: 'code-complete',
      question: 'ต้องการเพิ่มข้อมูลผู้ใช้ใหม่ลงในตาราง Users ต้องเขียนคำสั่ง SQL อย่างไร?',
      partialCode: '/* เติมคำสั่ง SQL */ (Username, Email, CreatedAt)\nVALUES (\'somchai\', \'somchai@email.com\', GETDATE());',
      options: [
        'INSERT INTO Users',
        'ADD TO Users',
        'UPDATE Users SET',
        'CREATE ROW Users'
      ],
      answer: 0,
      explanation: 'ไวยากรณ์มาตรฐานในการเพิ่มแถวข้อมูลใหม่ใน SQL คือ INSERT INTO TableName (Column1, Column2) VALUES (Value1, Value2)',
      difficulty: 'basic',
      category: 'sql_basics'
    },
    {
      type: 'multiple-choice',
      question: 'ฟังก์ชัน Aggregate ใดใน SQL ที่ใช้นับจำนวนแถวทั้งหมดในตาราง?',
      options: [
        'SUM(*)',
        'TOTAL(*)',
        'COUNT(*)',
        'LENGTH(*)'
      ],
      answer: 2,
      explanation: 'COUNT(*) ใช้สำหรับนับจำนวนแถวทั้งหมดที่ตรงกับเงื่อนไข รวมถึงแถวที่มีค่า NULL ด้วย ส่วน COUNT(ColumnName) จะนับเฉพาะแถวที่คอลัมน์นั้นไม่เป็น NULL',
      difficulty: 'basic',
      category: 'sql_basics',
      language: 'sql'
    },
    {
      type: 'multiple-choice',
      question: 'ข้อใดอธิบายความแตกต่างระหว่าง WHERE และ HAVING ใน SQL ได้ถูกต้อง?',
      options: [
        'WHERE ใช้กรองข้อมูลก่อนการรวมกลุ่ม (Row-level) ส่วน HAVING ใช้กรองผลลัพธ์หลังจากการจัดกลุ่ม GROUP BY (Aggregate-level)',
        'HAVING ทำงานเร็วกว่า WHERE เสมอ',
        'WHERE ใช้ได้เฉพาะกับตัวเลข ส่วน HAVING ใช้กับข้อความ',
        'ทั้งสองคำสั่งเหมือนกันทุกประการ สามารถใช้แทนกันได้ตลอด'
      ],
      answer: 0,
      explanation: 'WHERE ใช้กรองข้อมูลระดับแถวก่อนเข้า GROUP BY (จึงไม่สามารถใช้ Aggregate Function เช่น WHERE COUNT(*) > 5 ได้) ส่วน HAVING ใช้กรองกลุ่มข้อมูลหลัง GROUP BY เสร็จแล้ว',
      difficulty: 'basic',
      category: 'sql_basics',
      language: 'sql'
    },
    {
      type: 'bug-hunt',
      question: 'โค้ด SQL ต่อสตริงด้านล่างทำให้เกิดช่องโหว่ความปลอดภัยระดับร้ายแรง (SQL Injection) บรรทัดใดคือสาเหตุ?',
      buggyCode: 'string username = GetUserInput();\nstring query = "SELECT * FROM Users WHERE Username = \'" + username + "\'";\nvar command = new SqlCommand(query, connection);',
      options: [
        'string username = GetUserInput();',
        'string query = "SELECT * FROM Users WHERE Username = \'" + username + "\'";',
        'var command = new SqlCommand(query, connection);',
        'ไม่มีข้อผิดพลาด'
      ],
      answer: 1,
      explanation: 'การต่อสตริงคำสั่ง SQL โดยตรงทำให้ Hacker สามารถป้อนค่าเช่น \' OR \'1\'=\'1 เพื่อขโมยหรือทำลายฐานข้อมูลได้ ต้องแก้ปัญหาด้วยการใช้ Parameterized Query เช่น command.Parameters.AddWithValue("@Username", username)',
      difficulty: 'mid',
      category: 'sql_basics'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมคีย์เวิร์ด SQL ในการแก้ไขข้อมูลราคาของสินค้าที่มี ID เท่ากับ 5',
      code: '___0___ Products\nSET Price = 150.00\nWHERE ProductId = 5;',
      blanks: [
        { answer: ['UPDATE', 'update'], hint: 'คำสั่ง UPDATE' }
      ],
      explanation: 'คำสั่ง UPDATE TableName SET Column = Value WHERE Condition ใช้สำหรับปรับปรุงข้อมูลแถวที่มีอยู่เดิมในตาราง',
      difficulty: 'basic',
      category: 'sql_basics'
    },
    {
      type: 'multiple-choice',
      question: 'Foreign Key (คีย์นอก) ในระบบฐานข้อมูลเชิงสัมพันธ์มีไว้เพื่อประโยชน์ใด?',
      options: [
        'เพื่อบีบอัดข้อมูลให้มีขนาดเล็กลง',
        'เพื่อรักษาความถูกต้องและคงอยู่ของความสัมพันธ์ระหว่างตาราง (Referential Integrity)',
        'เพื่อเปลี่ยนชื่อตารางให้อ่านง่ายขึ้น',
        'เพื่อบังคับให้ทุกคอลัมน์ห้ามมีค่าว่าง (NOT NULL)'
      ],
      answer: 1,
      explanation: 'Foreign Key ใช้สร้างความเชื่อมโยงกับ Primary Key ของอีกตาราง เพื่อป้องกันการใส่ข้อมูลที่ไม่มีตัวตนอยู่จริงในตารางหลัก (เช่น ห้ามสั่งซื้อสินค้าที่ไม่มี ProductId ในระบบ)',
      difficulty: 'basic',
      category: 'sql_basics',
      language: 'sql'
    }
  ],

  /* ───────────────────────────────────────────────────────────
     8. Entity Framework Core (6 Questions)
     ─────────────────────────────────────────────────────────── */
  ef_core: [
    {
      type: 'multiple-choice',
      question: 'ใน Entity Framework Core คลาส DbContext และ DbSet<T> ทำหน้าที่อะไร?',
      options: [
        'DbContext คือ Driver ของระบบเครือข่าย ส่วน DbSet คือตัวจัดเก็บไฟล์ PDF',
        'DbContext คือสะพานเชื่อมหลักและตัวแทนของฐานข้อมูล (Unit of Work / Change Tracker) ส่วน DbSet<T> ทำหน้าที่เป็นตัวแทนของตารางข้อมูล (Table) ในการ Query และ CRUD',
        'DbSet คือระบบรักษาความปลอดภัย ส่วน DbContext ทำหน้าที่วาด UI',
        'เป็นคลาสที่ใช้เฉพาะใน Visual Studio สำหรับการเปิดไฟล์'
      ],
      answer: 1,
      explanation: 'DbContext ทำหน้าที่จัดการ Database Connection, Change Tracking, และ Transaction ส่วน DbSet<T> คือ Collection ในหน่วยความจำที่เป็นตัวแทนของ Table ช่วยให้ใช้ LINQ query ข้อมูลได้โดยตรง',
      difficulty: 'basic',
      category: 'ef_core',
      language: 'csharp'
    },
    {
      type: 'multiple-choice',
      question: 'เมื่อมีการแก้ไข Model และต้องการอัปเดต Schema ของฐานข้อมูล คำสั่ง CLI คู่ใดที่ถูกต้องตามลำดับ?',
      options: [
        'dotnet run build และ dotnet deploy db',
        'dotnet ef migrations add <Name> แล้วตามด้วย dotnet ef database update',
        'dotnet ef create table แล้วตามด้วย dotnet ef push',
        'dotnet sql sync'
      ],
      answer: 1,
      explanation: 'คำสั่ง dotnet ef migrations add <MigrationName> จะสร้างโค้ด Migration เพื่อบันทึกความเปลี่ยนแปลง และ dotnet ef database update จะนำ Script นั้นไปรันกับ Database จริง',
      difficulty: 'basic',
      category: 'ef_core',
      language: 'bash'
    },
    {
      type: 'code-complete',
      question: 'ต้องการ Query ข้อมูลสินค้าสำหรับแสดงผลในหน้าเว็บแบบ Read-only โดยไม่ต้องการให้ Change Tracker ติดตามเพื่อเพิ่มประสิทธิภาพความเร็ว ควรใช้เมธอดใด?',
      partialCode: 'var products = await _context.Products\n    ./* เติมเมธอดปิด Change Tracking */()\n    .Where(p => p.IsActive)\n    .ToListAsync();',
      options: [
        'AsNoTracking',
        'DisableTracking',
        'ReadOnly',
        'IgnoreChanges'
      ],
      answer: 0,
      explanation: '.AsNoTracking() ช่วยเพิ่มประสิทธิภาพและความเร็วในการ Query อย่างมากสำหรับงานอ่านอย่างเดียว เพราะ EF Core จะไม่ต้องสร้าง Snapshot และไม่ต้องเอา Object ไปเก็บใน Change Tracker',
      difficulty: 'mid',
      category: 'ef_core'
    },
    {
      type: 'bug-hunt',
      question: 'โค้ดด้านล่างทำให้เกิดปัญหา N+1 Query Problem ที่รัน SQL ถล่ม Database บรรทัดใดควรใช้ .Include() เพื่อแก้ปัญหา?',
      buggyCode: 'var blogs = await _context.Blogs.ToListAsync();\nforeach (var blog in blogs)\n{\n    Console.WriteLine($"{blog.Title} มี {blog.Posts.Count} โพสต์"); // ยิง query เพิ่มทีละรอบ\n}',
      options: [
        'var blogs = await _context.Blogs.ToListAsync();',
        'foreach (var blog in blogs)',
        'Console.WriteLine($"{blog.Title} มี {blog.Posts.Count} โพสต์");',
        'ไม่มีข้อผิดพลาด'
      ],
      answer: 0,
      explanation: 'การดึง Blogs มาก่อนโดยไม่ได้โหลด Posts มาด้วย (Eager Loading) จะทำให้เมื่อเข้าถึง blog.Posts เกิดการยิง Query ซ้ำอีก N รอบ ควรแก้บรรทัดแรกเป็น _context.Blogs.Include(b => b.Posts).ToListAsync()',
      difficulty: 'mid',
      category: 'ef_core'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมคำสั่งในการบันทึกการเปลี่ยนแปลงทั้งหมดลงสู่ Database ใน EF Core',
      code: '_context.Users.Add(newUser);\nawait _context.___0___();',
      blanks: [
        { answer: ['SaveChangesAsync', 'SaveChangesAsync()'], hint: 'เมธอด SaveChangesAsync' }
      ],
      explanation: 'await _context.SaveChangesAsync() จะทำการรวบรวมข้อมูลที่มีการ Add/Update/Delete ใน Change Tracker แล้วสร้าง Transaction ส่งคำสั่ง SQL ไปประมวลผลที่ฐานข้อมูลจริง',
      difficulty: 'basic',
      category: 'ef_core'
    },
    {
      type: 'multiple-choice',
      question: 'การโหลดข้อมูลตารางสัมพันธ์ใน EF Core รูปแบบใดที่ใช้ .Include() เพื่อโหลดข้อมูลที่เกี่ยวข้องกันมาพร้อมกันใน Query เดียว?',
      options: [
        'Lazy Loading',
        'Eager Loading',
        'Explicit Loading',
        'Manual Loading'
      ],
      answer: 1,
      explanation: 'Eager Loading คือการระบุชัดเจนตั้งแต่แรกผ่านเมธอด .Include(...) หรือ .ThenInclude(...) เพื่อให้ EF Core สร้าง SQL JOIN ดึงข้อมูลที่เกี่ยวข้องทั้งหมดมาพร้อมกันตั้งแต่ต้น',
      difficulty: 'mid',
      category: 'ef_core',
      language: 'csharp'
    }
  ],

  /* ───────────────────────────────────────────────────────────
     9. Blazor (6 Questions)
     ─────────────────────────────────────────────────────────── */
  blazor: [
    {
      type: 'multiple-choice',
      question: 'ข้อใดอธิบายความแตกต่างระหว่าง Blazor Server และ Blazor WebAssembly (WASM) ได้ถูกต้องที่สุด?',
      options: [
        'Blazor Server รันโค้ด C# บนบราวเซอร์ ส่วน Blazor WASM รันบนเซิร์ฟเวอร์',
        'Blazor Server รัน C# บนเซิร์ฟเวอร์และส่งการอัปเดต UI ผ่าน SignalR WebSocket ส่วน Blazor WASM ดาวน์โหลด .NET Runtime และโค้ด C# ไปรันบนเบราว์เซอร์ของไคลเอนต์โดยตรง',
        'Blazor WASM ใช้งานฐานข้อมูล SQL Server ได้โดยตรงโดยไม่ต้องมี API',
        'Blazor Server ไม่ต้องการการเชื่อมต่ออินเทอร์เน็ต'
      ],
      answer: 1,
      explanation: 'Blazor Server ประมวลผลบนเซิร์ฟเวอร์และส่ง DOM diff ผ่าน SignalR แบบเรียลไทม์ ทำให้เปิดหน้าเว็บเร็วแต่ต้องต่อเน็ตตลอด ส่วน Blazor WASM ทำงานแบบ Client-side อาศัย WebAssembly รัน C# บนบราวเซอร์ รองรับการทำงาน Offline',
      difficulty: 'basic',
      category: 'blazor',
      language: 'csharp'
    },
    {
      type: 'multiple-choice',
      question: 'Directive ใดในไฟล์ Razor Component (.razor) ที่ใช้กำหนด Route URL เพื่อให้เปิดหน้านั้นได้?',
      options: [
        '@route "/counter"',
        '@page "/counter"',
        '@url "/counter"',
        '@path "/counter"'
      ],
      answer: 1,
      explanation: 'ใน Blazor เราใช้ @page "/route-path" ด้านบนสุดของไฟล์ .razor เพื่อกำหนดว่าคอมโพเนนต์นี้ทำหน้าที่เป็นหน้าเว็บที่สามารถเข้าถึงผ่าน URL ดังกล่าวได้',
      difficulty: 'basic',
      category: 'blazor',
      language: 'razor'
    },
    {
      type: 'code-complete',
      question: 'ต้องการรับค่าจาก Parent Component เข้ามาใน Child Component ต้องใส่ Attribute ใดหน้า Property?',
      partialCode: 'public partial class UserCard : ComponentBase\n{\n    /* เติม Attribute */\n    public string UserName { get; set; }\n}',
      options: [
        '[Parameter]',
        '[Input]',
        '[Prop]',
        '[Binding]'
      ],
      answer: 0,
      explanation: 'ใน Blazor เราใช้ [Parameter] attribute กำหนดหน้า public property เพื่อประกาศว่าตัวแปรนี้พร้อมรับค่าที่ส่งมาจาก Parent Component',
      difficulty: 'basic',
      category: 'blazor'
    },
    {
      type: 'bug-hunt',
      question: 'โค้ด Event Handling ด้านล่างส่งค่า id เข้าเมธอดผิดวิธี ทำให้เมธอดถูกรันทันทีตอนเรนเดอร์แทนที่จะรอให้กดปุ่ม บรรทัดใดผิด?',
      buggyCode: '@foreach (var item in items)\n{\n    <button class="btn" @onclick="DeleteItem(item.Id)">ลบ</button>\n}',
      options: [
        '@foreach (var item in items)',
        '<button class="btn" @onclick="DeleteItem(item.Id)">ลบ</button>',
        '}',
        'ไม่มีข้อผิดพลาด'
      ],
      answer: 1,
      explanation: 'เมื่อต้องการส่งพารามิเตอร์เข้า Event Handler ต้องเขียนในรูป Lambda Expression เช่น @onclick="() => DeleteItem(item.Id)" มิฉะนั้นโค้ดจะถูกประเมินค่าทันทีขณะสร้างคอมโพเนนต์',
      difficulty: 'mid',
      category: 'blazor'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมคำสั่ง Two-way Data Binding ใน Blazor เพื่อผูกค่าระหว่างตัวแปร C# กับ HTML Input',
      code: '<input type="text" ___0___="searchQuery" />\n<p>คุณกำลังค้นหา: @searchQuery</p>',
      blanks: [
        { answer: ['@bind', '@bind-value'], hint: 'คำสั่ง @bind' }
      ],
      explanation: '@bind (หรือ @bind-Value) ใน Blazor ใช้ทำ Two-way Data Binding ช่วยให้อัปเดตค่าตัวแปร C# อัตโนมัติเมื่อผู้ใช้พิมพ์ข้อความใน Input และอัปเดต Input เมื่อตัวแปรเปลี่ยนค่า',
      difficulty: 'basic',
      category: 'blazor'
    },
    {
      type: 'multiple-choice',
      question: 'Lifecycle Method ใดใน Blazor Component ที่เหมาะที่สุดสำหรับการดึงข้อมูลจาก API หรือ Service เมื่อหน้าเว็บเริ่มต้นทำงาน?',
      options: [
        'OnInitializedAsync()',
        'OnParametersSetAsync()',
        'OnAfterRenderAsync()',
        'Dispose()'
      ],
      answer: 0,
      explanation: 'OnInitializedAsync() จะถูกเรียกทำงานเพียงครั้งเดียวเมื่อคอมโพเนนต์ถูกสร้างขึ้น จึงเป็นจุดที่เหมาะสมและเป็นมาตรฐานสำหรับการ Initial Data เช่น ดึงข้อมูล API มาเตรียมไว้แสดงผล',
      difficulty: 'mid',
      category: 'blazor',
      language: 'csharp'
    }
  ],

  /* ───────────────────────────────────────────────────────────
     10. Web Basics (HTML/CSS/JS) (6 Questions)
     ─────────────────────────────────────────────────────────── */
  web_basics: [
    {
      type: 'multiple-choice',
      question: 'ข้อใดคือ Semantic HTML Tags ที่ช่วยให้โครงสร้างเว็บไซต์มีความหมาย ชัดเจนต่อ Search Engine (SEO) และ Screen Readers?',
      options: [
        '<div>, <span>, <b>, <i>',
        '<header>, <nav>, <main>, <section>, <article>, <footer>',
        '<table>, <tr>, <td>, <font>',
        '<app>, <component>, <widget>, <ui>'
      ],
      answer: 1,
      explanation: 'Semantic HTML (<header>, <nav>, <main>, <article>, ฯลฯ) ช่วยบอกบทบาทหน้าที่ของเนื้อหานั้นๆ แก่เบราว์เซอร์และระบบค้นหา แทนการใช้ <div> ครอบทุกอย่างโดยไม่มีความหมายเชิงโครงสร้าง',
      difficulty: 'basic',
      category: 'web_basics',
      language: 'html'
    },
    {
      type: 'multiple-choice',
      question: 'คุณสมบัติ CSS box-sizing: border-box ส่งผลต่อการคำนวณขนาดของ Element อย่างไร?',
      options: [
        'ขนาด width และ height ที่กำหนดจะรวม padding และ border เข้าไปด้วย ทำให้ขนาดกล่องไม่บวมขยายเกินกว่าค่าที่ระบุ',
        'ขยายขนาดกล่องเพิ่มขึ้นตามความหนาของ margin เสมอ',
        'ทำให้รูปภาพในกล่องกลายเป็นวงกลม',
        'ซ่อน border และ padding ทั้งหมดไม่ให้แสดงผล'
      ],
      answer: 0,
      explanation: 'ปกติ (content-box) ความกว้างจริง = width + padding + border แต่เมื่อใช้ box-sizing: border-box ความกว้างรวมทั้งหมดจะคงที่เท่ากับ width ที่ระบุ ทำให้จัด Layout เว็บง่ายและไม่เพี้ยน',
      difficulty: 'basic',
      category: 'web_basics',
      language: 'css'
    },
    {
      type: 'code-complete',
      question: 'ต้องการจัดตำแหน่งให้เนื้อหาภายในกล่องอยู่กึ่งกลางทั้งแนวนอนและแนวตั้งด้วย CSS Flexbox ต้องใช้ชุดคำสั่งใด?',
      partialCode: '.container {\n    display: flex;\n    /* จัดกึ่งกลางแนวนอน */\n    /* จัดกึ่งกลางแนวตั้ง */\n}',
      options: [
        'justify-content: center;\nalign-items: center;',
        'text-align: center;\nvertical-align: middle;',
        'float: center;\nmargin: auto;',
        'align-content: center;\njustify-items: center;'
      ],
      answer: 0,
      explanation: 'ใน CSS Flexbox (แกน row ปกติ) justify-content: center ใช้จัดแนวนอน (Main Axis) และ align-items: center ใช้จัดแนวตั้ง (Cross Axis)',
      difficulty: 'basic',
      category: 'web_basics'
    },
    {
      type: 'multiple-choice',
      question: 'ใน JavaScript สมัยใหม่ (ES6+) ข้อใดอธิบายความแตกต่างระหว่าง const, let และ var ได้ถูกต้อง?',
      options: [
        'var เป็น Block-scoped ส่วน let และ const เป็น Function-scoped',
        'const ใช้สำหรับตัวแปรที่ไม่ต้องการให้ Reassign ค่าใหม่, let เป็น Block-scoped ที่เปลี่ยนค่าได้ และหลีกเลี่ยงการใช้ var เนื่องจากมีปัญหาเรื่อง Hoisting และ Function-scoped',
        'const ข้อมูลใน Array/Object ไม่สามารถเปลี่ยนแปลง Property ภายในได้เลย',
        'let ไม่สามารถใช้ใน for loop ได้'
      ],
      answer: 1,
      explanation: 'let และ const ถูกนำมาใช้แทน var เพื่อแก้ปัญหา Hoisting และ Scope รั่วไหล โดย const ป้องกันการกำหนดค่าใหม่ (Reassignment) ส่วน let ใช้สำหรับตัวแปรที่ต้องการเปลี่ยนค่าได้ ทั้งคู่เป็น Block Scoped {}',
      difficulty: 'basic',
      category: 'web_basics',
      language: 'javascript'
    },
    {
      type: 'bug-hunt',
      question: 'ฟังก์ชัน JavaScript ด้านล่างมีข้อผิดพลาดในการดึงข้อมูลจาก API ทำให้ได้ค่าเป็น Promise Object แทนข้อมูล JSON จริง บรรทัดใดผิด?',
      buggyCode: 'async function fetchUsers() {\n    const response = await fetch("/api/users");\n    const data = response.json(); // บรรทัดนี้\n    return data;\n}',
      options: [
        'async function fetchUsers() {',
        'const response = await fetch("/api/users");',
        'const data = response.json(); // บรรทัดนี้',
        'return data;'
      ],
      answer: 2,
      explanation: 'เมธอด response.json() ใน Fetch API เป็น Asynchronous Method ที่คืนค่าเป็น Promise จึงต้องใส่ await ด้านหน้าเสมอ เช่น const data = await response.json();',
      difficulty: 'mid',
      category: 'web_basics'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมคำสั่ง JavaScript ในการดักฟังเหตุการณ์คลิกปุ่มของ DOM Element',
      code: 'const btn = document.getElementById("submit-btn");\nbtn.___0___("click", function() {\n    alert("กดปุ่มสำเร็จ!");\n});',
      blanks: [
        { answer: ['addEventListener', 'addEventListener()'], hint: 'เมธอด addEventListener' }
      ],
      explanation: 'element.addEventListener(\'event\', callback) คือวิธีมาตรฐานในการลงทะเบียน Event Handler ให้กับ DOM Element ใน JavaScript',
      difficulty: 'basic',
      category: 'web_basics'
    }
  ],

  /* ───────────────────────────────────────────────────────────
     11. DevOps & Git (6 Questions)
     ─────────────────────────────────────────────────────────── */
  devops: [
    {
      type: 'multiple-choice',
      question: 'คำสั่ง Git ใดที่ใช้สำหรับเตรียมไฟล์ (Staging) ทั้งหมดที่มีการเปลี่ยนแปลงเพื่อรอการบันทึก (Commit)?',
      options: [
        'git commit -m "all"',
        'git push origin main',
        'git add .',
        'git checkout -b'
      ],
      answer: 2,
      explanation: 'คำสั่ง git add . (หรือ git add -A) ใช้เพิ่มการเปลี่ยนแปลงของทุกไฟล์ในโฟลเดอร์ปัจจุบันไปยัง Staging Area เพื่อเตรียมพร้อมสำหรับการ git commit',
      difficulty: 'basic',
      category: 'devops',
      language: 'bash'
    },
    {
      type: 'multiple-choice',
      question: 'เมื่อต้องการเริ่มพัฒนาฟีเจอร์ใหม่โดยไม่กระทบกับโค้ดหลัก ควรปฏิบัติตามแนวทางใดใน Git?',
      options: [
        'เขียนโค้ดและ Commit ลงบน Branch main หรือ master โดยตรงทันที',
        'สร้าง Branch ใหม่แยกออกมา (เช่น git checkout -b feature/login) พัฒนาจนเสร็จ แล้วจึงส่ง Pull Request (PR) ให้ทีม Review',
        'ลบโฟลเดอร์ .git ทิ้งแล้วสร้างโปรเจกต์ใหม่',
        'ปิดระบบ Git และส่งไฟล์ Zip ทางอีเมล'
      ],
      answer: 1,
      explanation: 'Feature Branch Workflow เป็นมาตรฐานในการพัฒนาซอฟต์แวร์ โดยแยก Branch ออกไปทำงานเฉพาะฟีเจอร์ เมื่อเสร็จสิ้นจึงเปิด Pull Request เพื่อทำ Code Review และรัน Automated Test ก่อน Merge กลับเข้า Branch หลัก',
      difficulty: 'basic',
      category: 'devops',
      language: 'bash'
    },
    {
      type: 'code-complete',
      question: 'ใน Dockerfile สำหรับ .NET การใช้ Multi-stage Build มีจุดประสงค์หลักเพื่ออะไร?',
      partialCode: 'FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build\nWORKDIR /src\nCOPY . .\nRUN dotnet publish -c Release -o /app/publish\n\nFROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final\nWORKDIR /app\nCOPY --from=build /app/publish .\nENTRYPOINT ["dotnet", "MyApp.dll"]',
      options: [
        'เพื่อแยกขั้นตอน Build (ที่ต้องใช้ SDK ตัวใหญ่) ออกจากขั้นตอน Runtime (ใช้ Runtime ตัวเล็ก) ทำให้ได้ Final Docker Image ที่มีขนาดเล็ก ปลอดภัย และเบาที่สุด',
        'เพื่อให้ Docker รันบนเครื่อง Mac และ Windows ได้พร้อมกัน',
        'เพื่อบังคับให้แอปพลิเคชันรันแบบ Multi-thread',
        'เพื่อข้ามขั้นตอนการทดสอบ Unit Test'
      ],
      answer: 0,
      explanation: 'Multi-stage build ช่วยแยก Build Environment (.NET SDK ขนาดหลายร้อย MB) ออกจาก Production Image ซึ่งต้องการเพียง ASP.NET Runtime ขนาดเล็ก ทำให้ Image ปลอดภัย ไม่มี Source Code ติดไป และดาวน์โหลดได้รวดเร็ว',
      difficulty: 'mid',
      category: 'devops'
    },
    {
      type: 'multiple-choice',
      question: 'CI/CD ในกระบวนการ DevOps ย่อมาจากอะไรและมีความหมายอย่างไร?',
      options: [
        'Code Input / Code Output',
        'Continuous Integration (รวมโค้ดและทดสอบอัตโนมัติบ่อยๆ) และ Continuous Delivery / Deployment (ส่งมอบและติดตั้งระบบสู่งานจริงอัตโนมัติ)',
        'Computer Interface / Component Design',
        'Central Infrastructure / Cloud Database'
      ],
      answer: 1,
      explanation: 'CI (Continuous Integration) คือกระบวนการที่ระบบจะ Build และรัน Test อัตโนมัติทุกครั้งที่มีการ Push โค้ด ส่วน CD (Continuous Delivery/Deployment) คือการนำซอฟต์แวร์ไป Deploy สู่ Server/Cloud อัตโนมัติอย่างมั่นใจ',
      difficulty: 'basic',
      category: 'devops',
      language: 'bash'
    },
    {
      type: 'bug-hunt',
      question: 'ไฟล์ .dockerignore ด้านล่างลืมระบุโฟลเดอร์ใดที่จะทำให้ไฟล์ Compiled Binaries ขยะติดเข้าไปใน Build Context บรรทัดใดควรเพิ่ม?',
      buggyCode: '.git\n.vs\n.vscode\n// ลืม ignore โฟลเดอร์ bin และ obj',
      options: [
        '.git',
        '.vs',
        '.vscode',
        'bin/ และ obj/'
      ],
      answer: 3,
      explanation: 'โฟลเดอร์ bin และ obj เป็นไฟล์ binary ชั่วคราวที่ถูกคอมไพล์บนเครื่อง Host หากไม่ใส่ใน .dockerignore จะถูกก๊อปปี้เข้าไปใน Docker Image ทำให้เกิด Conflict ของ OS และทำให้ Image บวมโดยไม่จำเป็น',
      difficulty: 'mid',
      category: 'devops'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมคำสั่ง Docker CLI ในการสั่งรัน Container ในโหมด Background (Detached) และ Map Port 8080 ของ Host ไปยัง Port 80 ของ Container',
      code: 'docker run -___0___ -p 8080:80 --name webapp my-dotnet-app',
      blanks: [
        { answer: ['d', '-d', 'detach'], hint: 'พารามิเตอร์ -d (detached mode)' }
      ],
      explanation: 'แฟล็ก -d (Detached Mode) สั่งให้ Docker ทำการรัน Container อยู่เบื้องหลังในพื้นหลัง และคืน Terminal ให้ผู้ใช้สั่งงานต่อได้ทันที',
      difficulty: 'basic',
      category: 'devops'
    }
  ],

  /* ───────────────────────────────────────────────────────────
     12. Unit Testing & Quality (6 Questions)
     ─────────────────────────────────────────────────────────── */
  testing: [
    {
      type: 'multiple-choice',
      question: 'รูปแบบ AAA Pattern ในการเขียน Unit Test ประกอบด้วยขั้นตอนใดตามลำดับ?',
      options: [
        'Analyze, Apply, Approve',
        'Arrange (เตรียมข้อมูลและ Mock), Act (เรียกใช้ฟังก์ชันที่ต้องการทดสอบ), Assert (ตรวจสอบผลลัพธ์ว่าตรงตามที่คาดหวัง)',
        'Add, Append, Assign',
        'Authenticate, Authorize, Audit'
      ],
      answer: 1,
      explanation: 'AAA Pattern เป็นมาตรฐานสากลในการจัดโครงสร้าง Unit Test: 1) Arrange = เตรียมข้อมูล/สร้าง Mock, 2) Act = สั่งรัน Method ภายใต้การทดสอบ, 3) Assert = ตรวจสอบค่าผลลัพธ์ว่าถูกต้อง',
      difficulty: 'basic',
      category: 'testing',
      language: 'csharp'
    },
    {
      type: 'multiple-choice',
      question: 'ใน xUnit ความแตกต่างระหว่าง Attribute [Fact] และ [Theory] คืออะไร?',
      options: [
        '[Fact] ใช้กับเทสที่ต้องรันผ่านเสมอ ส่วน [Theory] คือเทสที่ไม่จำเป็นต้องผ่าน',
        '[Fact] คือเทสเดี่ยวที่ไม่มีพารามิเตอร์ (รัน 1 ครั้งเสมอ) ส่วน [Theory] ใช้สำหรับ Data-driven Test ที่รับค่าพารามิเตอร์จากชุดข้อมูลภายนอก (เช่น [InlineData]) เพื่อทดสอบหลายๆ กรณี',
        '[Fact] ใช้ทดสอบ UI ส่วน [Theory] ใช้ทดสอบ Database',
        'ทั้งสอง Attribute ทำงานเหมือนกันทุกประการ'
      ],
      answer: 1,
      explanation: '[Fact] ใช้สำหรับ Test Case เดี่ยวที่มีเงื่อนไขคงที่ ส่วน [Theory] ใช้คู่กับ [InlineData(1, 2, 3)] เพื่อส่งค่า Input หลากหลายกรณีเข้ามารัน Method เทสซ้ำโดยไม่ต้องเขียนโค้ดเทสใหม่หลายตัว',
      difficulty: 'basic',
      category: 'testing',
      language: 'csharp'
    },
    {
      type: 'code-complete',
      question: 'ต้องการตรวจสอบใน xUnit ว่าค่าผลลัพธ์ actual ที่ได้จากฟังก์ชันมีค่าเท่ากับ expected (เช่น 100) ต้องเขียนคำสั่ง Assert อย่างไร?',
      partialCode: '[Fact]\npublic void Add_TwoNumbers_ReturnsSum()\n{\n    var calculator = new Calculator();\n    int result = calculator.Add(40, 60);\n    /* เติม Assert */\n}',
      options: [
        'Assert.Equal(100, result);',
        'Assert.IsTrue(result == 100);',
        'Assert.Expect(result).ToBe(100);',
        'Assert.ShouldBe(100, result);'
      ],
      answer: 0,
      explanation: 'ใน xUnit เมธอดมาตรฐานคือ Assert.Equal(expected, actual) โดยค่าที่คาดหวังจะอยู่พารามิเตอร์แรก และค่าผลลัพธ์จริงจะอยู่พารามิเตอร์ที่สอง',
      difficulty: 'basic',
      category: 'testing'
    },
    {
      type: 'multiple-choice',
      question: 'ทำไมจึงต้องใช้ Mocking Library (เช่น Moq หรือ NSubstitute) ในการทำ Unit Testing?',
      options: [
        'เพื่อจำลองการทำงานของ Dependencies ภายนอก (เช่น Database, External API, Email Service) ทำให้การทดสอบทำงานเร็ว โฟกัสเฉพาะ Logic ภายในคลาส และไม่ส่งผลกระทบต่อระบบจริง',
        'เพื่อเร่งความเร็วคอมพิวเตอร์ให้รันเร็วขึ้น 10 เท่า',
        'เพื่อเขียนโค้ดทดสอบแทนโค้ดจริง',
        'เพราะ .NET ไม่อนุญาตให้เชื่อมต่อ Database ในโหมด Debug'
      ],
      answer: 0,
      explanation: 'Unit Test ต้องทดสอบเฉพาะหน่วยย่อยของโค้ดอย่างเป็นอิสระ การ Mock ช่วยตัดภาระการต่อระบบภายนอก ทำให้เทสเร็วและสามารถจำลองสถานการณ์จำลอง (เช่น DB Error หรือ Network Timeout) ได้ง่าย',
      difficulty: 'mid',
      category: 'testing',
      language: 'csharp'
    },
    {
      type: 'bug-hunt',
      question: 'Unit Test ด้านล่างมีแนวโน้มเป็น Flaky Test (เทสผลลัพธ์ไม่เสถียร ติดๆ ดับๆ) เนื่องจากขึ้นกับเวลาจริง บรรทัดใดคือสาเหตุ?',
      buggyCode: '[Fact]\npublic void IsWeekend_ShouldReturnTrueOnSaturday()\n{\n    var service = new DateService();\n    bool isWeekend = service.IsCurrentDayWeekend(); // บรรทัดนี้อ่าน DateTime.Now ภายใน\n    Assert.True(isWeekend);\n}',
      options: [
        '[Fact]',
        'var service = new DateService();',
        'bool isWeekend = service.IsCurrentDayWeekend(); // บรรทัดนี้อ่าน DateTime.Now ภายใน',
        'Assert.True(isWeekend);'
      ],
      answer: 2,
      explanation: 'การเรียกใช้ DateTime.Now หรือ DateTime.UtcNow ตรงๆ ใน Logic ทำให้เทสจะผ่านเฉพาะวันเสาร์-อาทิตย์และจะตกในวันธรรมดา ควรออกแบบให้รับ IDateTimeProvider หรือรับวันที่เป็นพารามิเตอร์เพื่อ Mock ได้',
      difficulty: 'mid',
      category: 'testing'
    },
    {
      type: 'fill-blank',
      question: 'จงเติมคำสั่งของ Moq Library ในการกำหนดพฤติกรรมจำลองให้เมธอดคืนค่ากลับมาตามที่กำหนด',
      code: 'var mockRepo = new Mock<IUserRepository>();\nmockRepo.___0___(r => r.GetByIdAsync(1))\n         .ReturnsAsync(new User { Id = 1, Name = "Admin" });',
      blanks: [
        { answer: ['Setup', 'Setup()'], hint: 'เมธอด Setup' }
      ],
      explanation: 'ใน Moq เราใช้คำสั่ง mock.Setup(expression).Returns(...) เพื่อระบุว่าเมื่อมีการเรียกเมธอดตามเงื่อนไขที่กำหนด ให้จำลองคืนค่า Object ตามที่ระบุกลับไป',
      difficulty: 'mid',
      category: 'testing'
    }
  ]
};

// Export for Node.js / Module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuizData;
}
