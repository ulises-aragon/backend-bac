
```bash
git clone https://github.com/ulises-aragon/backend-bac.git
cd backend-bac
```
```bash
npm install
mkdir data
npm run seed
npm run dev
```

---

**Base URL:** `http://localhost:3000/api`

* `/employees`
* `/departments`
* `/positions`
* `/branches`
* `/evaluations`
* `/contracts`
* `/salaries`

---

```
VITE_API_URL=http://localhost:3000/api
```

```js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default API;
```

```js
const res = await API.get('/employees');
console.log(res.data);
```

Aquí tienes una **documentación sencilla, clara y lista para copiar/pegar** de todos los endpoints del backend.
Está organizada por entidad, con ejemplos y descripciones cortas.
Formato estilo documentación básica para que tu compañera entienda rápido cómo usar la API.

---

# 📘 **Documentación de la API — Backend RRHH BAC**

**Base URL:**

```
http://localhost:3000/api
```

---

# Empleados

### ➤ **GET /employees**

Obtiene la lista de empleados.
Soporta filtros:

* `?search=texto`
* `?departmentId=1`
* `?positionId=2`
* `?branchId=1`
* `?page=1&limit=20`

**Respuesta:**

```json
{
  "data": [...],
  "page": 1,
  "total": 15,
  "totalPages": 1
}
```

---

### **GET /employees/:id**

Obtiene un empleado por ID.

---

### **POST /employees**

Crea un nuevo empleado.

**Body ejemplo:**

```json
{
  "name": "Carlos López",
  "email": "carlos@bac.com",
  "salary": 850,
  "departmentId": 1,
  "positionId": 2,
  "branchId": 1
}
```

---

### **PUT /employees/:id**

Actualiza un empleado.

---

### **DELETE /employees/:id**

Elimina un empleado.

---

# Departamentos

### **GET /departments**

Lista todos los departamentos.

### **GET /departments/:id**

Obtiene un departamento.

### **POST /departments**

Crea un departamento.

```json
{ 
  "name": "Finanzas",
  "description": "Este es un departamento"
}
```

### **PUT /departments/:id**

Actualiza el nombre.

### **DELETE /departments/:id**

Elimina un departamento (si no tiene empleados).

---

# Puestos

### **GET /positions**

Listado de posiciones.

### **GET /positions/:id**

Detalle de una posición.

### **POST /positions**

```json
{
  "title": "Analista",
  "minSalary": 600,
  "maxSalary": 1200
}
```

### **PUT /positions/:id**

Actualiza una posición.

### **DELETE /positions/:id**

Elimina la posición (si no está asignada a empleados).

---

# Sucursales

### **GET /branches**

Lista todas las sucursales.

### **GET /branches/:id**

Detalle.

### **POST /branches**

```json
{
  "name": "Sucursal Centro",
  "address": "Av. Central 123"
}
```

### **PUT /branches/:id**

### **DELETE /branches/:id**

---

# Evaluaciones

### **GET /evaluations**

Lista evaluaciones.
Soporta filtro:

* `?employeeId=1`

### **GET /evaluations/:id**

### **POST /evaluations**

```json
{
  "employeeId": 1,
  "score": 85,
  "reviewer": "Gerente",
  "comments": "Buen rendimiento",
  "date": "2024-10-15"
}
```

### **PUT /evaluations/:id**

### **DELETE /evaluations/:id**

---

# Contratos

### **GET /contracts**

Lista todos los contratos.

### **GET /contracts/:id**

### **POST /contracts**

```json
{
  "employeeId": 1,
  "positionId": 2,
  "startDate": "2024-01-01",
  "contractType": "Indefinido",
  "salaryRate": 900,
  "status": "Activo"
}
```

### **PUT /contracts/:id**

### **DELETE /contracts/:id**

---

# Salarios

### **GET /salaries**

Lista pagos.
Filtros:

* `?employeeId=1`
* `?contractId=1`
* `?period=2024-11`

### **GET /salaries/:id**

### **POST /salaries**

```json
{
  "employeeId": 1,
  "contractId": 1,
  "period": "2024-11",
  "baseSalary": 900,
  "bonus": 50,
  "deductions": 20,
  "paymentDate": "2024-11-30"
}
```

### **PUT /salaries/:id**

### **DELETE /salaries/:id**
