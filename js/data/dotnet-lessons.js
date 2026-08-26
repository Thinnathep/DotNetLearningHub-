/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — ASP.NET Core & REST API Lessons Data
   ══════════════════════════════════════════════════════════ */

const DotNetLessons = {
  structure: {
    title: 'โครงสร้าง ASP.NET Core & Minimal APIs',
    description: 'เจาะลึกไฟล์ Program.cs, Middleware Pipeline, Configuration และ Folder Structure',
    level: 'mid',
    analogy: 'เหมือนโรงงานผลิตสินค้า — Program.cs คือพิมพ์เขียวโรงงาน, Service Container คือคลังอะไหล่, Middleware คือสายพานการผลิตที่ของทุกชิ้นต้องผ่าน',
    topics: [
      {
        id: 'program-cs',
        title: 'Program.cs — หัวใจหลักของ .NET 8/9',
        code: `var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container (DI)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IProductService, ProductService>();

var app = builder.Build();

// 2. Configure the HTTP request pipeline (Middleware)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

// 3. Map Endpoints
app.MapGet("/api/products", async (IProductService service) => 
{
    return Results.Ok(await service.GetAllProductsAsync());
});

app.Run();`,
        explanation: 'ใน .NET 8/9 รวม `Startup.cs` เข้ามาไว้ใน `Program.cs` เดียวด้วยรูปแบบ Minimal APIs ที่กระชับและเร็วกว่าเดิม'
      }
    ]
  },

  di: {
    title: 'Dependency Injection (DI) Lifetimes',
    description: 'การฉีด Dependency เพื่อลดการผูกมัด (Loose Coupling) พร้อมทำความเข้าใจ 3 Lifetimes',
    lifetimes: [
      {
        name: 'Transient (AddTransient)',
        emoji: '⚡',
        concept: 'สร้างใหม่ทุกครั้งที่ถูกเรียกใช้ (New Instance Every Time)',
        analogy: 'เหมือนกระดาษทิชชู่ — ดึงใช้เสร็จแล้วทิ้ง ไม่แชร์กับใคร',
        bestFor: 'Service ขนาดเล็กที่ไม่มี State (Lightweight, Stateless Services)'
      },
      {
        name: 'Scoped (AddScoped)',
        emoji: '🔄',
        concept: 'สร้าง 1 Instance ต่อ 1 HTTP Request',
        analogy: 'เหมือนถาดอาหารในโรงอาหาร — แต่ละคน (แต่ละ Request) ได้ถาดของตัวเอง วนใช้ในมื้อนั้นจนกินเสร็จแล้วทิ้ง',
        bestFor: 'DbContext, Repository, Business Service ที่ต้องแชร์ข้อมูลภายใน Request เดียวกัน'
      },
      {
        name: 'Singleton (AddSingleton)',
        emoji: '👑',
        concept: 'สร้างเพียงครั้งเดียวตลอดอายุการทำงานของ Application',
        analogy: 'เหมือนตู้กดน้ำสาธารณะของออฟฟิศ — ทุกคนในบริษัทใช้ตู้เดียวกันตลอดทั้งวัน',
        bestFor: 'Cache Service, Configuration, Logger, Memory Store'
      }
    ]
  },

  middleware: {
    title: 'Middleware Request Pipeline',
    description: 'สายพานลำเลียงคำขอและส่งคำตอบ (Request/Response Pipeline)',
    pipelineOrder: [
      'ExceptionHandler / DeveloperExceptionPage',
      'HSTS / HttpsRedirection',
      'StaticFiles',
      'Routing',
      'CORS',
      'Authentication (คุณคือใคร?)',
      'Authorization (คุณมีสิทธิ์ไหม?)',
      'Custom Middleware / Endpoint Execution'
    ]
  }
};
