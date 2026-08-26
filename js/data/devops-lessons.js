/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — DevOps & Secure Coding Lessons Data
   ══════════════════════════════════════════════════════════ */

const DevOpsLessons = {
  git: {
    title: 'Git Version Control & Branching Strategy',
    description: 'การจัดการโค้ดเป็นทีมด้วย Git Flow, Feature Branch และ Pull Request (PR) Workflow'
  },
  docker: {
    title: 'Containerization ด้วย Docker สำหรับ .NET',
    dockerfileMultiStage: `# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["MyApp.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MyApp.dll"]`
  },
  security: {
    title: 'Secure Coding & OWASP Top 10 for .NET',
    principles: [
      { rule: 'SQL Injection Defense', detail: 'ใช้ Parameterized Queries หรือ EF Core เสมอ ห้ามนำ String มาต่อกันตรงๆ' },
      { rule: 'Authentication & JWT', detail: 'เก็บ Secret Key ใน Azure Key Vault หรือ User Secrets ห้าม Hardcode ลงใน appsettings.json' },
      { rule: 'CORS Configuration', detail: 'เปิดรับเฉพาะ Trusted Origins ที่ระบุชัดเจน ห้ามใช้ AllowAnyOrigin() ใน Production' },
      { rule: 'Database First Rule', detail: 'การป้องกันข้อมูลต้องทำที่ระดับฐานข้อมูล (RLS/Stored Proc) ร่วมด้วยเสมอ' }
    ]
  }
};
