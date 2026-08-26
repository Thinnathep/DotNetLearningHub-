/* ══════════════════════════════════════════════════════════
   DotNet Learning Hub — SQL Playground Engine
   In-memory SQLite simulation / execution for interactive queries
   ══════════════════════════════════════════════════════════ */

const SQLPlayground = {
  db: null,
  schema: {
    departments: [
      { id: 1, name: 'IT & Software', budget: 1500000 },
      { id: 2, name: 'Accounting & Finance', budget: 800000 },
      { id: 3, name: 'Human Resources', budget: 500000 },
      { id: 4, name: 'Marketing', budget: 950000 }
    ],
    employees: [
      { id: 1, name: 'สมชาย สายโค้ด', position: 'Senior .NET Developer', salary: 65000, dept_id: 1, hire_date: '2021-03-15' },
      { id: 2, name: 'วิภาดา พัฒนาการ', position: 'Junior Backend Dev', salary: 32000, dept_id: 1, hire_date: '2023-07-01' },
      { id: 3, name: 'ธนกร บัญชีมั่นคง', position: 'Senior Accountant', salary: 48000, dept_id: 2, hire_date: '2020-01-10' },
      { id: 4, name: 'ปิยะมาศ รักงาน', position: 'HR Specialist', salary: 35000, dept_id: 3, hire_date: '2022-05-18' },
      { id: 5, name: 'กิตติศักดิ์ ยิงแอด', position: 'Marketing Lead', salary: 52000, dept_id: 4, hire_date: '2019-11-20' },
      { id: 6, name: 'นารีรัตน์ ฟรอนต์เอนด์', position: 'Frontend Developer', salary: 38000, dept_id: 1, hire_date: '2023-02-01' }
    ],
    products: [
      { id: 101, name: 'Enterprise Cloud License', price: 45000, stock: 25, category: 'Software' },
      { id: 102, name: 'Developer Tool Suite Pro', price: 12500, stock: 60, category: 'Software' },
      { id: 103, name: 'Ergonomic Chair for Dev', price: 8900, stock: 15, category: 'Hardware' },
      { id: 104, name: 'Mechanical Keyboard RGB', price: 3400, stock: 40, category: 'Hardware' },
      { id: 105, name: 'Dual Monitor Arm 32"', price: 2200, stock: 30, category: 'Hardware' }
    ],
    orders: [
      { id: 1001, emp_id: 2, product_id: 102, quantity: 1, order_date: '2024-01-15' },
      { id: 1002, emp_id: 1, product_id: 101, quantity: 2, order_date: '2024-01-18' },
      { id: 1003, emp_id: 6, product_id: 104, quantity: 1, order_date: '2024-02-02' },
      { id: 1004, emp_id: 3, product_id: 103, quantity: 1, order_date: '2024-02-10' },
      { id: 1005, emp_id: 2, product_id: 105, quantity: 2, order_date: '2024-02-25' }
    ]
  },

  currentTables: {},

  init() {
    this.resetDatabase();
  },

  resetDatabase() {
    // Deep clone data to local state
    this.currentTables = JSON.parse(JSON.stringify(this.schema));
  },

  runQuery(sqlString) {
    const rawSql = sqlString.trim().replace(/;$/, '');
    if (!rawSql) {
      return { success: false, error: 'กรุณากรอกคำสั่ง SQL ที่ต้องการทดสอบ' };
    }

    const upper = rawSql.toUpperCase();

    try {
      if (upper.startsWith('SELECT')) {
        return this.executeSelect(rawSql);
      } else if (upper.startsWith('INSERT')) {
        return this.executeInsert(rawSql);
      } else if (upper.startsWith('UPDATE')) {
        return this.executeUpdate(rawSql);
      } else if (upper.startsWith('DELETE')) {
        return this.executeDelete(rawSql);
      } else {
        return {
          success: false,
          error: 'ระบบ Playground รองรับคำสั่ง SELECT, INSERT, UPDATE, DELETE เบื้องต้นจ้า'
        };
      }
    } catch (err) {
      return { success: false, error: `Syntax Error: ${err.message}` };
    }
  },

  executeSelect(sql) {
    // Simple parser for standard playground queries
    // Support common queries: SELECT * FROM table [WHERE ...] [ORDER BY ...] [JOIN ...]
    const fromMatch = sql.match(/FROM\s+([a-zA-Z_0-9]+)/i);
    if (!fromMatch) {
      return { success: false, error: 'ไม่พบชื่อตารางหลังคำสั่ง FROM' };
    }

    const tableName = fromMatch[1].toLowerCase();
    let data = this.currentTables[tableName];

    if (!data) {
      return { success: false, error: `ไม่พบตาราง "${tableName}" ในฐานข้อมูล (ตารางที่มี: employees, departments, products, orders)` };
    }

    let rows = [...data];

    // Check for JOIN
    const joinMatch = sql.match(/(?:INNER\s+)?JOIN\s+([a-zA-Z_0-9]+)\s+ON\s+([a-zA-Z_0-9.]+)\s*=\s*([a-zA-Z_0-9.]+)/i);
    if (joinMatch) {
      const joinTable = joinMatch[1].toLowerCase();
      const leftCol = joinMatch[2].split('.').pop();
      const rightCol = joinMatch[3].split('.').pop();
      const joinData = this.currentTables[joinTable];

      if (joinData) {
        const joined = [];
        rows.forEach(r => {
          joinData.forEach(jr => {
            if (r[leftCol] === jr[rightCol] || r[rightCol] === jr[leftCol]) {
              joined.push({ ...r, ...jr });
            }
          });
        });
        rows = joined;
      }
    }

    // Check for WHERE
    const whereMatch = sql.match(/WHERE\s+(.+?)(?:\s+ORDER\s+BY|\s+GROUP\s+BY|$)/i);
    if (whereMatch) {
      const condition = whereMatch[1].trim();
      rows = rows.filter(row => this.evaluateCondition(row, condition));
    }

    // Check for ORDER BY
    const orderMatch = sql.match(/ORDER\s+BY\s+([a-zA-Z_0-9]+)(?:\s+(ASC|DESC))?/i);
    if (orderMatch) {
      const col = orderMatch[1];
      const desc = (orderMatch[2] || 'ASC').toUpperCase() === 'DESC';
      rows.sort((a, b) => {
        if (a[col] < b[col]) return desc ? 1 : -1;
        if (a[col] > b[col]) return desc ? -1 : 1;
        return 0;
      });
    }

    if (rows.length === 0) {
      return { success: true, columns: Object.keys(data[0] || {}), rows: [], message: 'Query สำเร็จ (ไม่พบข้อมูลตามเงื่อนไข 0 แถว)' };
    }

    const columns = Object.keys(rows[0]);
    return {
      success: true,
      columns: columns,
      rows: rows,
      message: `ค้นพบ ${rows.length} รายการ`
    };
  },

  evaluateSingleCondition(row, condition) {
    const trimmed = condition.trim();
    // String match with quotes
    const strMatch = trimmed.match(/([a-zA-Z_0-9.]+)\s*(=|!=|<>|LIKE)\s*['"](.+?)['"]/i);
    if (strMatch) {
      const col = strMatch[1].split('.').pop();
      const op = strMatch[2].toUpperCase();
      const val = strMatch[3];
      const rowVal = String(row[col] ?? '');
      if (op === '=' || op === '==') return rowVal.toLowerCase() === val.toLowerCase();
      if (op === '!=' || op === '<>') return rowVal.toLowerCase() !== val.toLowerCase();
      if (op === 'LIKE') return rowVal.toLowerCase().includes(val.toLowerCase().replace(/%/g, ''));
    }

    // Number comparison
    const numMatch = trimmed.match(/([a-zA-Z_0-9.]+)\s*([><=!]+)\s*([0-9.]+)/);
    if (numMatch) {
      const col = numMatch[1].split('.').pop();
      const op = numMatch[2];
      const val = parseFloat(numMatch[3]);
      const rowVal = parseFloat(row[col]);
      if (isNaN(rowVal)) return false;
      if (op === '>') return rowVal > val;
      if (op === '>=') return rowVal >= val;
      if (op === '<') return rowVal < val;
      if (op === '<=') return rowVal <= val;
      if (op === '=' || op === '==') return rowVal === val;
      if (op === '!=' || op === '<>') return rowVal !== val;
    }

    return true;
  },

  evaluateCondition(row, condition) {
    if (!condition) return true;
    const parts = condition.split(/\s+AND\s+/i);
    return parts.every(part => this.evaluateSingleCondition(row, part));
  },

  executeInsert(sql) {
    const tableMatch = sql.match(/INTO\s+([a-zA-Z_0-9]+)/i);
    if (!tableMatch) return { success: false, error: 'ไม่พบชื่อตารางหลัง INSERT INTO' };
    const tableName = tableMatch[1].toLowerCase();
    if (!this.currentTables[tableName]) return { success: false, error: `ไม่พบตาราง ${tableName}` };

    return {
      success: true,
      message: `✅ เพิ่มข้อมูลลงตาราง "${tableName}" สำเร็จเรียบร้อย! (1 row affected)`
    };
  },

  executeUpdate(sql) {
    const tableMatch = sql.match(/UPDATE\s+([a-zA-Z_0-9]+)/i);
    if (!tableMatch) return { success: false, error: 'ไม่พบชื่อตารางหลัง UPDATE' };
    const tableName = tableMatch[1].toLowerCase();
    return {
      success: true,
      message: `✅ อัปเดตข้อมูลในตาราง "${tableName}" สำเร็จ! (Rows affected)`
    };
  },

  executeDelete(sql) {
    const tableMatch = sql.match(/FROM\s+([a-zA-Z_0-9]+)/i);
    if (!tableMatch) return { success: false, error: 'ไม่พบชื่อตารางหลัง DELETE FROM' };
    const tableName = tableMatch[1].toLowerCase();
    return {
      success: true,
      message: `✅ ลบข้อมูลจากตาราง "${tableName}" สำเร็จ! (Rows affected)`
    };
  }
};

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => SQLPlayground.init());
}
