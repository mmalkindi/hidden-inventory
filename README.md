# Hidden Inventory

Welcome to Hidden Inventory! • [🌐 Website](./README.md)

## Tugas 2: Jawaban pertanyaan ❔

> *Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step?*

Pertama, saya membuat direktori baru dengan nama project django saya, `hidden-inventory`. Lalu, saya inisiasi project django baru dengan nama `hidden_inventory`. Di dalam direktori tersebut, saya juga membuat python *virtual environment*, berkas `.gitignore`, dan `requirements.txt` untuk mendapatkan package yang dibutuhkan pada saat menggunakan venv. Akhirnya, saya membuka `pwsh` dan menjalankan script `activate.ps1` untuk memulai *virtual environment*.

Sebelum memulai app baru, sama menginisiasi repositori git dengan nama `hidden-inventory`. Setelah itu, saya membuat app `main` dengan command `python manage.py startapp main`, dan kemudian mendaftarkannya di `settings.py` yang berada di direktori proyek. Saya membuat template html dasar untuk aplikasi `main` yang akan menampilkan nama project, nama saya, dan kelas saya.

Pada file `models.py` di aplikasi `main`, saya membuat class `Item` dengan atribut `name`, `amount`, `description` serta atribut tambahan `price` dan `category`. Di dalam file `views.py`, saya membuat function `show_main()` yang akan mengembalikan sebuah template HTML beserta `context` yang berisi nama dan kelas saya, serta nama project. Kemudian saya membuat dan mengaplikasikan migrasi model dengan *command* `makemigrations` dan `migrate`.

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
