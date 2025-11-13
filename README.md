
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
