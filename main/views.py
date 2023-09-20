from django.http import HttpResponseRedirect, HttpResponse
from django.core import serializers
from main.forms import ItemForm
from django.urls import reverse
from main.models import Item
from django.shortcuts import render

# Create your views here.
def show_main(request):
    items = Item.objects.all()

    context = {
        'display_name': 'Muhammad Milian Alkindi',
        'subject_class': 'A',
        'app_name': 'Hidden Inventory',
        'items': items,
    }

    return render(request, "main.html", context)

def create_item(request):
    form = ItemForm(request.POST or None)

    if form.is_valid() and request.method == "POST":
        form.save()
        return HttpResponseRedirect(reverse('main:show_main'))

    context = {'form': form, 'page_title': "Register Item"}
    return render(request, "create_item.html", context)

def show_xml(request):
    data = Item.objects.all()
    return HttpResponse(serializers.serialize("xml", data), content_type="application/xml")

def show_json(request):
    data = Item.objects.all()
    return HttpResponse(serializers.serialize("json", data), content_type="application/json")

def show_xml_by_id(request, id):
    data = Item.objects.filter(pk=id)
    return HttpResponse(serializers.serialize("xml", data), content_type="application/xml")

def show_json_by_id(request, id):
    data = Item.objects.filter(pk=id)
    return HttpResponse(serializers.serialize("json", data), content_type="application/json")

def custom_404(request, exception):
    return render(request, '404.html', status=404, context={'page_title': 'Uh oh'})