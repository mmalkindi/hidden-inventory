# Hidden Inventory

Welcome to Hidden Inventory! • [🌐 Website](http://muhammad-milian-tugas.pbp.cs.ui.ac.id/)

```credential
Nama  : Muhammad Milian Alkindi
Kelas : PBP A
```

| Jump ke tugas |
| :-: |
| [Tugas 2](#tugas-2-implementasi-mvt-pada-django) |
| [Tugas 3](#tugas-3-implementasi-form-dan-data-delivery) |
| [Tugas 4](#tugas-4-implementasi-autentikasi-session-dan-cookies) |
| [Tugas 5](#tugas-5-desain-web-menggunakan-html-css-dan-framework-css) |
| [Tugas 6](#tugas-6-javascript-dan-asynchronous-javascript) |

## Tugas 6: JavaScript dan Asynchronous JavaScript

<details open>
  <summary>Jawaban pertanyaan ❔</summary>

> Jelaskan perbedaan antara *asynchronous programming* dengan *synchronous programming*.

...

> Dalam penerapan JavaScript dan AJAX, terdapat penerapan paradigma *event-driven programming*. Jelaskan maksud dari paradigma tersebut dan sebutkan salah satu contoh penerapannya pada tugas ini.

...

> Jelaskan penerapan *asynchronous programming* pada AJAX.

...

> Pada PBP kali ini, penerapan AJAX dilakukan dengan menggunakan Fetch API daripada *library* jQuery. Bandingkanlah kedua teknologi tersebut dan tuliskan pendapat kamu teknologi manakah yang lebih baik untuk digunakan.

🤔

> Jelaskan bagaimana cara kamu mengimplementasikan *checklist* di atas secara *step-by-step* (bukan hanya sekadar mengikuti tutorial).

...

</details>

## Tugas 5: Desain Web menggunakan HTML, CSS dan Framework CSS

<details>
  <summary>Jawaban pertanyaan ❔</summary>

> *Jelaskan manfaat dari setiap element selector dan kapan waktu yang tepat untuk menggunakannya*

*Element selector* dapat digunakan untuk mengubah style semua elemen yang disebut. Selector ini cocok digunakan di awal file CSS sebagai *default* styling untuk elemen tersebut, namun masih bisa distyle lebih spesifik dengan selector lainnya di baris-baris selanjutnya.

ID selector akan meng*apply* *style* untuk suatu ID tertentu. Karena suatu ID hanya bisa digunakan untuk satu elemen dalam HTML, maka selector ini bisa digunakan untuk mengubah satu dan hanya satu elemen dengan ID tersebut.

Class selector akan menerapkan *style* yang ditulis untuk semua elemen yang memiliki *class* tersebut. Class selector digunakan oleh berbagai framework CSS seperti `Bootstrap` dan `tailwind` untuk menerapkan style sesuai dengan class dari framework tersebut.

> *Jelaskan HTML5 Tag yang kamu ketahui.*

1. `<div>`: Content Division element. Dengan `<div>`, kita bisa *grouping* elemen-elemen supaya lebih mudah untuk di*layout* dan di*style*, misalnya membuat sebuah *Card* dengan framework `Bootstrap`.
2. `<table>`: Table element. Elemen ini berfungsi sebagai *root* element yang diperlukan oleh `<thead>`, `<tbody>`, `<tfoot>`, `<th>`, `<tr>`, dan `<td>` untuk membuat suatu tabel.
3. `<form>`: Form element. Elemen ini digunakan untuk membuat sebuah *form* dalam HTML. Dengan bantuan `<input>` dan `<button>`, isi form bisa dikirim ke server menggunakan `HTTPRequest`.
4. `<a>`: Anchor tag. Dengan atribut `href`, elemen ini berfungsi sebagai *link* yang bisa diklik oleh *user* untuk berpindah halaman website atau berpindah posisi dalam halaman.

> *Jelaskan perbedaan antara margin dan padding.*

Padding adalah area di antara *border* suatu elemen dengan kontennya, sedangkan margin adalah area di luar *border* suatu elemen.  

> *Jelaskan perbedaan antara framework CSS Tailwind dan Bootstrap. Kapan sebaiknya kita menggunakan Bootstrap daripada Tailwind, dan sebaliknya?*

`tailwind` dan `Bootstrap` memiliki *approach* yang berbeda untuk styling suatu website. Framework `tailwind` memiliki *utility-first apporach*, developer menerapkan *style* untuk suatu elemen dengan menambahkan style properti dalam bentuk *class*, misalnya `.font-medium` untuk membuat teks berukuran medium. File CSS yang mendefinisikan semua style akan kemudian di *trim* sehingga hanya class-class yang dipakai saja yang akan tersisa. Sementara itu, framework `Bootstrap` memberikan class-class yang mirip untuk properti, namun juga ada class-class yang sudah jadi dan langsung bisa dipakai, misalnya class `.table` untuk memberikan styling default pada `<table>` element.

`tailwind` sebaiknya digunakan apabila kita sudah mengerti CSS dan ingin *styling*  element HTML sesuka hati, tanpa harus membuat dan mengingat nama untuk class yang ingin di*style*. Framework ini juga *recommended* digunakan apabila kita membuat web app dengan javascript framework seperti `React`.

`Bootstrap` sebaiknya digunakan apabila kita ingin menggunakan style yang sudah ada *out-of-the-box*, misalnya class `.card` atau `.table`. `Bootstrap` juga akan memberikan penampilan yang lebih konsisten (walaupun terkesan sama dengan website `Bootstrap` lainnya).

> *Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).*

Pertama, saya menambahkan `Bootstrap` ke web app saya dengan tag `<link>` di head yang mengarah ke CDN bootstrap. Kemudian saya membuat file `navbar.html` dan `footer.html` yang akan di*include* oleh `base.html`. Saya membuat navbar di file `navbar.html` yang memuat nama aplikasi, link untuk menambahkan item (jika sudah login), dan juga dropdown dengan nama user yang sedang login dan tombol logout. Saya juga membuat footer di file `footer.html` yang memuat nama saya dan sesi terakhir login apabila user sudah login (dipindahkan dari `main.html`).

Kemudian, saya menambahkan fungsi `edit_item()` di `views.py` untuk mengubah data suatu item dan juga menambahkan *decorator* `@login_required` untuk semua fungsi yang melibatkan `Item`. Saya membuat template `edit_item.html` dan *routing* url fungsi `edit_item` di `urls.py` supaya bisa diakses. Di halaman utama, saya menambahkan tombol **Edit** untuk setiap baris item yang ditampilkan.

Setelah itu, saya mulai mendesain ulang semua halaman yang ada di web app saya. Untuk template `main.html`, saya mengubah tampilan *item* dari tabel menjadi `Bootstrap` *Cards*. Untuk halaman login dan register, saya mengambil inspirasi dari halaman sign-in Github.

</details>

## Tugas 4: Implementasi Autentikasi, Session, dan Cookies

<details>
    <summary>Jawaban pertanyaan ❔</summary>

> *Apa itu Django `UserCreationForm`, dan jelaskan apa kelebihan dan kekurangannya?*

`UserCreationForm` adalah suatu `ModelForm` dalam framework Django yang dapat digunakan untuk membuat `user` baru. `UserCreationForm` menerima `username`, `password1`, dan `password2`, dengan `password1` dan `password2` dicek kesamaannya sebelum password divalidasi dan di*set* menjadi milik `user` yang baru dibuat. *Class* ini tidak memperbolehkan pembuatan akun baru dengan username yang sudah ada.

Kelebihan: Sangat mudah untuk meng-extend *class* ini untuk menambah `field` yang kita inginkan. Misal field `email`, `phone_number`.  
Kekurangan: Kurang cocok apabila ingin membuat `user` baru tanpa menggunakan field `username` dan `password`, misalnya untuk pembuatan akun dengan service lainnya (Sign in with Google/Apple/etc).

> *Apa perbedaan antara autentikasi dan otorisasi dalam konteks Django, dan mengapa keduanya penting?*

Autentikasi adalah proses verifikasi siapa yang sedang menggunakan (login user/admin panel).  
Otorisasi adalah proses verifikasi akses yang dimiliki pengguna (data permissions).

Kedua hal tersebut penting dalam pembuatan web app yang melibatkan akun user. Kita perlu untuk mengautentikasi pengguna supaya kita tahu siapa yang sedang menggunakan aplikasi kita, bisa melalui `cookies` dan/atau `sessions`. Kita juga harus mengecek akses yang dimiliki pengguna (otorisasi) ketika dipanggil *request* get, add, set, remove, atau change data yang berhubungan dengar sistem.

> *Apa itu cookies dalam konteks aplikasi web, dan bagaimana Django menggunakan cookies untuk mengelola data sesi pengguna?*

`Cookies` adalah salah satu cara menyimpan data di web browser `client`, yang nanti dapat diakses kembali oleh aplikasi. Suatu `cookie` memiliki *expiration date*, dan akan dihapus otomatis setelah melewati tanggal ekspirasinya. Django memberikan developer method-method untuk *fetch* dan *set* cookies yang bisa kita gunakan untuk web app, misalnya untuk menyimpan *login credentials*.

> *Apakah penggunaan cookies aman secara default dalam pengembangan web, atau apakah ada risiko potensial yang harus diwaspadai?*

**Tidak**. `Cookies` secara default akan menyimpan data dalam bentuk teks, sehingga perlu kita *encrypt* data sensitif untuk `cookie` tersebut supaya data tidak bisa dicuri oleh pihak ketiga. `Cookie` juga bisa menjadi target dari serangan XSS (Cross Site Scripting) apabila data dari `cookie` digunakan untuk mengeksekusi kode. Penggunaan cookies juga harus mengikuti aturan-aturan privasi *online*, seperti memberikan popup ke user apabila `cookie` digunakan untuk *tracking*.

> *Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).*

Pertama, saya membuat fungsi `register()`, `login()`, dan `logout()` di `views.py` dalam direktori `main`. Kemudian, saya membuat template `register.html` dan `login.html` untuk memfasilitasi `register()` dan `login()` user ke web app. Ketiga fungsi baru tersebut kemudian saya *routing* urlnya di `urls.py` aplikasi `main` supaya bisa diakses dan dijalankan. Fungsi `login` dan `logout` juga sudah menggunakan data dari `cookies` supaya *login credentials* user dapat disimpan dan/atau dihapus. Fungsi `show_main()` di `views.py` juga di*restrict* supaya hanya bisa diakses apabila ada *login credentials* yang tersimpan. File template `main.html` ditambahkan tombol `logout` supaya user bisa log out dari aplikasi. Kemudian saya buat 2 akun lokal untuk mengecek apabila sistem register/login/logout bekerja dengan baik.

Selanjutnya, saya modifikasi kelas `Item` di `models.py` untuk menambah field `user` yang akan menghubungkan suatu item dengan user menggunakan *relationship* one-to-one. Fungsi `create_item()` di `views.py` juga diubah untuk mengisi field `user` secara otomatis sebelum kemudian disimpan ke database. Model dimigrasi dengan semua `Item` yang sudah ada dianggap milik user dengan `id=1`. Saya juga mengubah `context` yang dikirimkan oleh `show_main()` di `views.py` untuk memuat username pengguna di field `display_name` dan data login terakhir di field `last_login`. Data tersebut akan ditampilkan di halaman utama web app setelah login.

</details>

## Tugas 3: Implementasi Form dan Data Delivery

<details>
    <summary>Jawaban pertanyaan ❔</summary>

> *Apa perbedaan antara form `POST` dan form `GET` dalam Django?*

Form yang menggunakan method `POST` akan mengirim ke server semua data yang di*submit* (setelah di*encode* terlebih dulu), dan kemudian menerima HTTPResponse dari server yang bersangkutan dengan form tersebut. Method ini sebaiknya digunakan untuk mengirim/meminta data yang sensitif dari *database* seperti detail *login* user.

Form dengan method `GET` akan menggabung data yang dikirim menjadi suatu *string* dan digunakan untuk membuat (*compose*) suatu URL. Bisa juga dianggap data diinput melalui link. Method ini cocok untuk mengambil data yang tidak sensitif dari server, misalnya *search query* ketika sedang menggunakan fitur search, contoh: `https://www.youtube.com/results?search_query=django` dengan field dari form `search_query` yang bernilai `django`.

> *Apa perbedaan utama antara XML, JSON, dan HTML dalam konteks pengiriman data?*

`XML` menyimpan data dalam struktur *tag* (seperti HTML), namun memerlukan *tag* pembuka dan *tag* penutup. Isian dari data diapit oleh *tag*.  
`JSON` menyimpan data dalam bentuk key-value pair (object notation) dan merupakan turunan dari Javascript, namun bisa digunakan dengan bahasa pemrograman manapun.  
`HTML` tidak didesain untuk mengirim data, melainkan menampilkan data ke user dalam bentuk yang lebih *user-friendly*. Tampilan situs HTML bisa diubah dengan CSS dan Javascript.

> *Mengapa JSON sering digunakan dalam pertukaran data antara aplikasi web modern?*

Karena, JSON memiliki struktur data yang mudah untuk di*parse* oleh aplikasi web serta bersifat *lightweight* sehingga dapat dikirimkan dengan cepat dan murah.

> *Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).*

Pertama, saya membuat file `forms.py` untuk mendefinisikan field mana saja yang bisa diubah oleh user. Untuk web ini, user dapat mengisi field `name`, `amount`, `description`, `price`, dan `tags` suatu objek `Item`, dengan field `date_added` diisi secara otomatis. Kemudian di `views.py`, saya menambah beberapa import dan suatu fungsi baru untuk menambah data produk yang diisi ke dalam *database*. Fungsi `show_main()` juga saya modifikasi untuk memuat data semua objek `Item` supaya bisa ditampilkan di halaman utama.

Kemudian, saya membuat template `create_item.html` sebagai halaman untuk mengisi dan mengirimkan form. Template halaman utama juga saya modifikasi untuk menampilkan data semua `Item` di database dalam bentuk *table*. Supaya halaman `create-item` bisa diakses, saya menambahkan pathnya ke `urls.py` serta link di halaman utama ke path tersebut.

Untuk menampilkan data dalam bentuk XML dan JSON, saya menambahkan fungsi `show_xml()` dan `show_json()` di `views.py`. Untuk hanya menampilkan data objek `Item` dengan `pk` tertentu saya menambahkan fungsi `show_xml_by_id()` dan `show_json_by_id()` ke `views.py`, yang akan menggunakan `id` dari URL untuk mengambil data objek yang diinginkan. Supaya bisa diakses dengan URL, saya menambah *routing* di `urls.py` untuk masing-masing fungsi tersebut.

### Postman screenshots 📸

![Format HTML](/task-assets/tugas3_html.jpg)
*Format HTML*

![Format XML](/task-assets/tugas3_xml.jpg)
*Format XML*

![Format JSON](/task-assets/tugas3_json.jpg)
*Format JSON*

![Format XML by ID](/task-assets/tugas3_xmlId.jpg)
*Format XML dengan id*

![Format JSON by ID](/task-assets/tugas3_jsonId.jpg)
*Format JSON dengan id*

</details>

## Tugas 2: Implementasi MVT pada Django

<details>
  <summary>Jawaban pertanyaan ❔</summary>

> *Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step?*

Pertama, saya membuat direktori baru dengan nama project django saya, `hidden-inventory`. Lalu, saya inisiasi project django baru dengan nama `hidden_inventory`. Di dalam direktori tersebut, saya juga membuat python *virtual environment*, berkas `.gitignore`, dan `requirements.txt` untuk mendapatkan package yang dibutuhkan pada saat menggunakan venv. Akhirnya, saya membuka `pwsh` dan menjalankan script `activate.ps1` untuk memulai *virtual environment*.

Sebelum memulai app baru, sama menginisiasi repositori git dengan nama `hidden-inventory`. Setelah itu, saya membuat app `main` dengan command `python manage.py startapp main`, dan kemudian mendaftarkannya di `settings.py` yang berada di direktori proyek. Saya membuat template html dasar untuk aplikasi `main` yang akan menampilkan nama project, nama saya, dan kelas saya.

Pada file `models.py` di aplikasi `main`, saya membuat class `Item` dengan atribut `name`, `amount`, `description` serta atribut tambahan `price` dan `tags`. Di dalam file `views.py`, saya membuat function `show_main()` yang akan mengembalikan sebuah template HTML beserta `context` yang berisi nama dan kelas saya, serta nama project. Kemudian saya membuat dan mengaplikasikan migrasi model dengan *command* `makemigrations` dan `migrate`.

Supaya app `main` bisa diakses dengan browser, saya *routing* di `urls.py` aplikasi `main` pada path kosong supaya browser akan menampilkan fungsi dari `views.py` pada halaman utama website. Kemudian, saya membuat *test-case* yang akan memvalidasi apabila variable dari *context* yang ditampilkan di template sama dengan yang didefinisikan di `views.py`. Terakhir, saya menjalankan `add, commit, push` untuk menyimpan dan *sync* dengan git repo yang ada di [GitHub](https://github.com/mmalkindi/hidden-inventory).

> *Buatlah bagian yang berisi request client ke web aplikasi berbasis Django beserta responnya dan jelaskan pada bagan tersebut kaitan antara `urls.py`, `views.py`, `models.py`, dan berkas `html`*
  
![Bagan *request* client-server di suatu Django project](/task-assets/tugas2_bagan.jpg)

>*Jelaskan mengapa kita menggunakan virtual environment? Apakah kita tetap dapat membuat aplikasi web berbasis Django tanpa menggunakan virtual environment?*

Kita menggunakan *virtual environment* supaya perubahan terisolasi dari luar sehingga tidak mengganggu komputer kita. Tiap komputer memiliki spesifikasi/versi *package* dan pythonnya masing-masing, dan tiap project django bisa saja membutuhkan versi *library* dan *package* yang berbeda dari yang sudah di*install* di komputer. Oleh karena itu, dibutuhkan suatu virtual environment supaya perubahan versi *package* tidak mengganggu project django lainnya. Ini juga akan mempermudah *development* dengan orang lain (tugas kelompok) karena mereka hanya perlu menginstall *package* dari suatu *requirement* file dalam `venv`nya masing-masing.

Sebenarnya, boleh-boleh saja membuat project Django tanpa menggunakan *virtual environment*, namun memang lebih mudah dan aman apabila menggunakannya. Misal, kita membutuhkan *package* yang sudah kita punya namun versi yang diminta untuk project baru berbeda. Akan lebih mudah apabila kedua project tersebut diisolasi dengan *venv*nya masing-masing selama *development*.

>*Jelaskan apakah itu MVC, MVT, MVVM dan perbedaan dari ketiganya?*

MVC, MVT, dan MVVM adalah arsitektur/*design pattern* untuk aplikasi berbasis web. Untuk django, kita menggunakan arsitektur MVT (Model View Template). Tiap *pattern* memiliki kelebihan dan *use-case*nya masing-masing, tapi mereka semua bertujuan sama: memisahkan kode dalam proyek supaya lebih mudah untuk di*maintain* (Separation of Concern).

### MVC (Model-View-Controller)

`Model`: Berinteraksi dengan database untuk menyimpan data user.  
`View`: Menampilkan data dari model yang sudah diproses di `Controller` ke user.  
`Controller`: Meng-*handle* HTTP Request, mengambil data dari model dan melakukan logic untuk memproses data tersebut, kemudian menampilkan data tersebut dengan file dari `View` dan mengembalikannya ke *Client*.  

### MVT (Model-View-Template)

Walaupun nama `Model` dan `View` sama, tetapi peran mereka berbeda dengan yang Model dan View yang berada di MVC atau MVVM.

`Model`: Menyimpan struktur data yang dapat digunakan oleh `View` serta yang akan disimpan di database.  
`View`: Berinteraksi dengan `Model` untuk memberi *context* yang dapat digunakan oleh `Template` untuk menampilkan konten. File HTML `Template` yang telah memproses *context* akan kemudian di*forward* ke Client di HTTP Response.  
`Template`: File static HTML yang memiliki syntax khusus untuk menjelaskan bagaimana konten akan ditampilkan, juga dapat menggunakan *context* yang diberikan oleh `View`.  

### MVVM (Model-View-ViewModel)

`Model`: Merepresentasikan model domain aplikasi, termasuk data model dan *validation logic*.
`View`: Mendefinisikan struktur, layout, dan tampilan yang akan dilihat oleh Client.  
`ViewModel`: Implementasi *properties* dan *commands* yang bisa digunakan oleh `View`.  
</details>

---
[↑ Back to top](#hidden-inventory)
