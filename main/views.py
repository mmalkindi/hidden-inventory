from django.apps import apps
from django.shortcuts import render

# Create your views here.
def show_main(request):
    context = {
        'display_name': 'Muhammad Milian Alkindi',
        'unique_npm': 2206081856,
        'app_name': 'Hidden Inventory',
    }

    return render(request, "main.html", context)
