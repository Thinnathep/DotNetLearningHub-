/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — Blazor & Modern Markup Lessons Data
   ══════════════════════════════════════════════════════════ */

const BlazorLessons = {
  intro: {
    title: 'Blazor & Razor Syntax พื้นฐาน',
    description: 'พัฒนา Web UI แบบ Interactive ด้วย C# แทน JavaScript',
    hostingModels: [
      {
        name: 'Blazor WebAssembly (WASM)',
        icon: '⚡',
        desc: 'รันโค้ด C# บน Browser โดยตรงผ่าน WebAssembly ทำงาน Client-side 100% รองรับ Offline PWA'
      },
      {
        name: 'Blazor Server',
        icon: '🖥️',
        desc: 'รันโค้ดบน Server และส่งการอัปเดต UI ผ่าน Real-time WebSocket (SignalR)'
      },
      {
        name: 'Blazor Auto / Web App (.NET 8/9)',
        icon: '🚀',
        desc: 'โหลดหน้าแรกด้วย Server SSR ทันที แล้วสลับไปใช้ WebAssembly เมื่อดาวน์โหลดไฟล์เสร็จ'
      }
    ]
  },
  xaml: {
    title: 'XAML สำหรับ .NET MAUI & WPF',
    description: 'ภาษา Markup แบบ XML สำหรับออกแบบหน้าตา User Interface บน Desktop และ Mobile',
    concepts: [
      { term: 'Layout Panels', meaning: 'StackLayout, Grid, FlexLayout, AbsoluteLayout จัดวางตำแหน่ง Elements' },
      { term: 'Data Binding', meaning: 'เชื่อมต่อ Property ใน C# ViewModel เข้ากับ Control บนหน้าจอ XAML' },
      { term: 'MVVM Pattern', meaning: 'Model - View - ViewModel แยก Business Logic ออกจากหน้าตา UI ชัดเจน' }
    ]
  }
};
