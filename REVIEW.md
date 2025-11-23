# RKUHAP & README Compliance Review

## Pendekatan
- Membaca blueprint produk di README.md untuk memahami janji fitur (landing dengan tombol korban/tersangka/saksi, emergency button, search, timeline, hub hak, komparator, modul interaktif, dan integrasi Sanity+Algolia). 
- Menelaah teks RKUHAP pada pasal yang dirujuk aplikasi (mis. Pasal 32-33 soal pendampingan advokat dan Pasal 75 soal keadilan restoratif). 
- Mengevaluasi implementasi frontend (Next.js pages/components) dan backend (Sanity fetcher, Algolia indexer, generator dokumen) terhadap acuan tersebut.

## Cakupan yang selaras
### Frontend
- Landing memenuhi hero "Dealing with the Law?" dengan CTA korban/tersangka/saksi dan rute utama ke Jalur Perkara serta komparator, konsisten dengan sitemap README.【F:README.md†L18-L46】【F:components/Hero.tsx†L6-L45】
- Tombol darurat mengambang mengarah ke checklist darurat sesuai anjuran README tentang emergency button.【F:README.md†L18-L22】【F:app/layout.tsx†L13-L18】【F:components/FloatingEmergency.tsx†L4-L12】
- Jalur Perkara menampilkan 6 tahap yang cocok dengan daftar tahap di README, lengkap dengan hak ringkas dan tip praktis.【F:README.md†L24-L33】【F:components/Timeline.tsx†L11-L107】
- Hub hak korban/tersangka/saksi dan kelompok rentan memberikan ringkasan basis RKUHAP (Pasal 134, 135, 137-139) serta checklist darurat.【F:app/know-your-rights/page.tsx†L1-L116】
- Modul komparator RUU vs KUHAP lama, kalkulator Keadilan Restoratif, Evidence Checker, generator surat, dan diagram Virtual Lawyer ada sesuai daftar fitur interaktif README.【F:README.md†L50-L76】【F:components/ComparatorTable.tsx†L1-L117】【F:app/restorative-justice/page.tsx†L1-L118】【F:app/evidence-checker/page.tsx†L1-L189】【F:app/document-generator/page.tsx†L1-L181】【F:app/virtual-lawyer/page.tsx†L1-L4】
- Konten Keadilan Restoratif mengikuti unsur Pasal 75 (first offender, pengecualian, pemulihan, perdamaian).【F:RKUHAP†L1250-L1264】【F:app/restorative-justice/page.tsx†L20-L98】
- Alat ini memasukkan hak pendampingan advokat yang sejalan dengan Pasal 32-33 dalam template permohonan bantuan hukum.【F:RKUHAP†L691-L707】【F:app/document-generator/page.tsx†L41-L82】

### Backend / Konten
- Sanity client disiapkan dengan validasi konfigurasi, mendukung caching CDN/tokens, dan GROQ query untuk tahapan, hak, kamus, dan template sesuai penjelasan README tentang headless CMS.【F:README.md†L130-L134】【F:cms/config.ts†L1-L38】【F:cms/queries.ts†L1-L20】
- Skrip indexing Algolia menyiapkan pengiriman gabungan stage/hak/kamus/template, menyesuaikan panduan README untuk pencarian.【F:README.md†L135-L139】【F:scripts/indexContent.ts†L1-L36】【F:cms/algolia.ts†L1-L40】

## Kesenjangan & Risiko
- Belum ada search bar UI maupun konsumsi indeks Algolia di frontend, padahal README menempatkannya sebagai komponen utama landing dan teknis pencarian.【F:README.md†L18-L22】【F:README.md†L94-L95】【F:app/page.tsx†L1-L45】
- Konten frontend masih hard-coded; belum ada penggunaan data Sanity untuk tahapan, hak, glosarium, atau template sehingga aktualisasi RKUHAP melalui CMS tidak tercapai.【F:cms/contentService.ts†L1-L14】【F:app/know-your-rights/page.tsx†L1-L116】【F:components/Timeline.tsx†L11-L107】
- Validasi dan konteks pasal untuk Evidence Checker dan Virtual Lawyer tidak ditautkan langsung ke teks RKUHAP atau sumber CMS, sehingga akurasi bisa stagnan ketika regulasi berubah.【F:app/evidence-checker/page.tsx†L17-L189】【F:app/virtual-lawyer/page.tsx†L1-L4】
- Tidak ada pengujian otomatis atau linting yang memastikan kesesuaian data/UX dengan blueprint; package.json juga tidak mendefinisikan skrip test lint terkait pemeriksaan materi hukum.【F:package.json†L1-L25】

## Rekomendasi Prioritas
1) Tambahkan komponen search (Algolia search client) di landing untuk memenuhi requirement README dan memanfaatkan indeks yang sudah disiapkan.
2) Tarik konten tahap/hak/istilah/template dari Sanity dan tampilkan di halaman terkait agar pembaruan substansi RKUHAP dapat dilakukan lewat CMS.
3) Perkaya modul interaktif (Evidence Checker, Virtual Lawyer) dengan referensi pasal dari CMS/RKUHAP dan tests/lint untuk memastikan kepatuhan materi hukum.
