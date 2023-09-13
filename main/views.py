from django.apps import apps
from django.shortcuts import render

# Create your views here.
def show_main(request):
    context = {
        'display_name': 'Muhammad Milian Alkindi',
        'subject_class': 'A',
        'app_name': 'Hidden Inventory',
    }

    return render(request, "main.html", context)
