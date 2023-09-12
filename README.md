# Hidden Inventory • Tugas 2 PBP

Welcome to Hidden Inventory! • [🌐 Visit our website!](https://hidden-inventory.adaptable.app/)

## Jawaban pertanyaan

> *Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step?*

Pertama, saya membuat direktori baru dengan nama project django saya, `hidden-inventory`. Lalu, saya inisiasi project django baru dengan nama `hidden_inventory`. Di dalam direktori tersebut, saya juga membuat python *virtual environment*, berkas `.gitignore`, dan `requirements.txt` untuk mendapatkan package yang dibutuhkan pada saat menggunakan venv. Akhirnya, saya membuka `pwsh` dan menjalankan script `activate.ps1` untuk memulai *virtual environment*.

Saya membuat proyek baru bernama `main` dengan command `python manage.py startapp main`, dan kemudian mendaftarkannya di `settings.py` yang berada di direktori `hidden_inventory`. Saya membuat template html dasar untuk aplikasi main yang akan menampilkan nama project dan nama serta npm saya.

Pada file `models.py` di aplikasi `main`, saya buat class `Item` dengan atribut `name`, `amount`, `description` serta atribut tambahan `price` dan `category`. Di dalam file `views.py`, saya membuat function `show_main()` yang akan mengembalikan sebuah template HTML beserta `context` yang berisi nama dan npm saya, serta nama project.

Supaya app `main` bisa diakses dengan browser, saya *routing* di `urls.py` aplikasi `main` pada path `` sehingga browser akan menampilkan fungsi dari `views.py` pada halaman utama situs. Kemudian, saya membuat *test-case* yang akan memvalidasi apabila variable dari *context* yang ditampilkan di template sama dengan yang didefinisikan di `views.py`.

> *Buatlah bagian yang berisi request client ke web aplikasi berbasis Django beserta responnya dan jelaskan pada bagan tersebut kaitan antara `urls.py`, `views.py`, `models.py`, dan berkas `html`*
  
![Bagan *request* client-server di suatu Django project](/task-assets/tugas2_bagan.jpg)

>*Jelaskan mengapa kita menggunakan virtual environment? Apakah kita tetap dapat membuat aplikasi web berbasis Django tanpa menggunakan virtual environment?*

Kita menggunakan *virtual environment* dalam pengembangan aplikasi web berbasis Django supaya perubahan terisolasi dari luar sehingga tidak berpengaruh pada komputer kita. Tiap komputer memiliki spesifikasi/versi *package* pythonnya masing-masing, dan tiap aplikasi web django bisa membutuhkan versi library dan package yang berbeda dari yang di*install* langsung di komputer. Oleh karena itu, dibutuhkan suatu virtual environment supaya perubahan versi package tidak mengganggu aplikasi django lainnya.

Sebenarnya, boleh-boleh saja membuat project Django tanpa menggunakan *virtual environment*, namun apabila kita membutuhkan *package* yang sama dengan versi yang berbeda, akan lebih mudah apabila kedua project tersebut kita isolasi dalam suatu *venv* selama *development*.

>*Jelaskan apakah itu MVC, MVT, MVVM dan perbedaan dari ketiganya?*

### MVC (Model-View-Controller)

`Model` itu...
`View` itu...
`Controller` itu...

### MVT (Model-View-Template)

Ini adalah konsep yang digunakan dalam development Django web app. Walaupun nama Model dan View sama, tetapi peran mereka berbeda dengan yang Model dan View yang berada di MVC atau MVVM.
`Model` berperan sebagai *bridge* antara database dengan `View`...
`View` berperan sebagai...
`Template` itu...

### MVVM (Model-View-ViewModel)

`Model`: ...
`View`: ...
`ViewModel` ...
