import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

// Data inventaris laboratorium
let inventaris = [
  {
    id: 'INV001',
    nama: 'Komputer',
    kategori: 'Komputer',
    jumlah: 20,
    kondisi: 'Baik',
    lokasi: 'Lab Komputer 1',
  },
  {
    id: 'INV002',
    nama: 'Proyektor',
    kategori: 'Proyektor',
    jumlah: 2,
    kondisi: 'Baik',
    lokasi: 'Lab Komputer 1',
  },
  {
    id: 'INV003',
    nama: 'Switch 24 Port',
    kategori: 'Switch',
    jumlah: 3,
    kondisi: 'Baik',
    lokasi: 'Ruang Jaringan',
  },
  {
    id: 'INV004',
    nama: 'Router',
    kategori: 'Router',
    jumlah: 2,
    kondisi: 'Baik',
    lokasi: 'Ruang Jaringan',
  },
]

// Endpoint utama
app.get('/', (c) => {
  return c.json({
    message: 'API Inventaris Laboratorium Berhasil Berjalan',
  })
})

// GET semua inventaris
app.get('/api/inventaris', (c) => {
  return c.json({
    message: 'Daftar seluruh inventaris laboratorium',
    data: inventaris,
  })
})

// GET detail inventaris berdasarkan ID
app.get('/api/inventaris/:id', (c) => {
  const id = c.req.param('id')

  const barang = inventaris.find((item) => item.id === id)

  if (!barang) {
    return c.json(
      {
        message: 'Barang tidak ditemukan',
      },
      404,
    )
  }

  return c.json({
    message: 'Detail inventaris berhasil ditemukan',
    data: barang,
  })
})

// POST menambahkan barang baru
app.post('/api/inventaris', async (c) => {
  const body = await c.req.json()

  if (
    !body.nama ||
    !body.kategori ||
    body.jumlah === undefined ||
    !body.kondisi ||
    !body.lokasi
  ) {
    return c.json(
      {
        message: 'Semua data barang harus diisi',
      },
      400,
    )
  }

const idBaru = "INV" + String(inventaris.length + 1).padStart(3, "0")

  const barangBaru = {
    id: idBaru,
    nama: body.nama,
    kategori: body.kategori,
    jumlah: Number(body.jumlah),
    kondisi: body.kondisi,
    lokasi: body.lokasi,
  }

  inventaris.push(barangBaru)

  return c.json(
    {
      message: 'Barang berhasil ditambahkan',
      data: barangBaru,
    },
    201,
  )
})

// Menjalankan server
serve({
  fetch: app.fetch,
  port: 3000,
})

console.log('Server berjalan di http://localhost:3000')