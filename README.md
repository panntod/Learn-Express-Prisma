# Belajar Express Prisma  🌐

## Deskripsi

Dalam repository ini, mempelajari bagaimana cara menggunakan Express js dengan ORM Prisma, pastikan kalian sudah memahami cara kerja dan pembuatan Expres js, karena didalam repository ini hanya akan membahas tentang prisma, jika kalian belum memahami cara kerja dan pembuatan Express Kunjungi Repository Ini [School Library](https://github.com/panntod/School-Lib-Modul)

## Installation

Pastikan anda sudah menginstall prisma secara global, jika belum jalankan perintah ini:

```
npm i -g prisma
```

Setelah itu inisialisasikan node project, dengan menjalankan perintah ini:

```
npm init -y
```

Setelah itu inisialisasikan prisma project, dengan menjalankan perintah ini:

```
npx prisma init
```

Maka akan terbuat struktur direktori seperti ini:
<div align="center">
    <img src="https://github.com/panntod/Learn-Express-Prisma/blob/master/assets/preview.png?raw=true" alt="preview folder directory" style="display: block; margin-left: auto; margin-right: auto;">
</div>

## Preparation

Setelah melakukan proses installation, sekarang lakukan proses persiapan. buka file `.env`, akan muncul sebuah value yang digunakan untuk mengkoneksikan dengan database.

```
DATABASE_URL="DATABASE://USER:PASSWORD@HOST:PORT/NAME?schema=SCHEMA"
```

Penjelasan:

| Field| Description |
| --- | --- |
| DATABASE | Merupakan database yang digunakan (dalam repository ini menggunakan Mysql) |
| USER | Nama pengguna basis data Anda |
| PASSWORD | Kata sandi untuk pengguna basis data Anda |
| HOST | Nama host Anda (untuk lingkungan lokal, biasanya localhost) |
| PORT | Port tempat server basis data Anda berjalan (biasanya 3306 untuk Mysql) |
| NAME | Nama tabel yang digunakan di dalam database |
| SKEMA | Nama skema di dalam basis data (biasanya public) |

Rubah sesuai kebutuhan anda, dalam repository ini saya merubah nya menjadi seperti:

```
DATABASE_URL="mysql://root:@localhost:3306/learn-prisma?schema=public"
```

Setelah melakukan preparation sekarang siap untuk membuat `schema` dalam folder `prisma`

## Documentation Code

```prisma
generator client {
  provider = "prisma-client-js"
}
```

Generator ini memberi tahu Prisma untuk menghasilkan kode untuk klien Prisma menggunakan JavaScript. Ini berarti setelah Anda mendefinisikan model-model dan hubungan antara mereka dalam schema Prisma Anda, Prisma akan menggunakan generator ini untuk membuat kelas-kelas yang dapat Anda gunakan dalam kode JavaScript Anda untuk berinteraksi dengan database.

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Ini memberitahu Prisma bahwa aplikasi Anda akan menggunakan database MySQL dan mendefinisikan URL database dari variabel lingkungan DATABASE_URL. Prisma menggunakan URL ini untuk terhubung ke database MySQL yang sesuai.

```prisma
model Menu {
  id          String    @id @default(uuid())
  name        String
  type        Menu_Type
  price       Int
  description String
  image       String
  createdAt   DateTime  @default(now())
  detail_transaction Detail_Transactoin[]
}
```

Didalam model menu memiliki beberapa attribute dengan format: `{NAMA} {TIPE DATA} {CRITERIA}`
Didalam `id` memiliki tipe data string dan kriteria sebagai `id`, dengan nilai default `uuid`
Didalam `type` menggunakan tipe data `enum`, maka akan dibuat enum baru yang berisikan:

```prisma
enum Menu_Type {
  makanan
  minuman
}
```

memiliki relasi dengan detail transaksi `Detail_Transaction[]` menandakan bahwa menu `hasMany` dengan detail transaksi

```prisma
model Detail_Transactoin {
  id String @id @default(uuid())
  transaction Transaction @relation(fields: [transactionId], references: [id])
  transactionId String
  menu Menu @relation(fields: [menuId], references: [id])
  menuId String
  price Int
  qty Int
}
```

Didalam detail transaksi `belongsTo` (mengimplementasikan) relasi dengan cara mendefinisikan menu terlebih dahulu, lalu `@relation` dengan isi: 
`field`: Field mana yang akan di isi
`references`: Nilai apa yang akan di isi ke dalam field tersebut 