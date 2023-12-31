import datetime
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseNotFound, JsonResponse
from django.core import serializers
from main.forms import ItemForm
from django.urls import reverse
from main.models import Item
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages  
from django.contrib.auth.decorators import login_required
import json

# Create your views here.
@login_required(login_url='/login')
def show_main(request):
    if 'last_login' not in request.COOKIES.keys():
        return redirect('main:login')
    
    items = Item.objects.filter(user=request.user)

    context = {
        'display_name': request.user.username,
        'subject_class': 'PBP A',
        'app_name': 'Hidden Inventory',
        'items': items,
        'last_login': request.COOKIES['last_login'],
    }

    return render(request, "main.html", context)

def get_items_json(request):
    items = Item.objects.filter(user=request.user)
    return HttpResponse(serializers.serialize('json', items))

def get_an_item(request, id):
    item = Item.objects.filter(user=request.user, pk=id)
    return HttpResponse(serializers.serialize('json', item))

## User Accounts
def register(request):
    if 'last_login' in request.COOKIES.keys():
            return redirect('main:login')
    
    form = UserCreationForm()
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account has been successfully created!')
            return redirect('main:show_main')
    context = {'form':form, 'page_title': "Register"}
    return render(request, 'register.html', context)

def login_user(request):
    if 'last_login' in request.COOKIES.keys():
            return redirect('main:show_main')
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            response = HttpResponseRedirect(reverse("main:show_main")) 
            response.set_cookie('last_login', str(datetime.datetime.now()))
            return response
        else:
            messages.info(request, 'Incorrect username or password')
    context = {'page_title': "Login"}
    return render(request, 'login.html', context)

def logout_user(request):
    logout(request)
    response = HttpResponseRedirect(reverse('main:login'))
    response.delete_cookie('last_login')
    return response

# Item related
@login_required(login_url='/login')
def create_item(request):
    form = ItemForm(request.POST or None)

    if form.is_valid() and request.method == "POST":
        item = form.save(commit=False)
        item.user = request.user
        item.save()
        return HttpResponseRedirect(reverse('main:show_main'))

    context = {'form': form, 'page_title': "Register Item", 'display_name': request.user.username, 'subject_class': 'PBP A', 'last_login': request.COOKIES['last_login']}
    return render(request, "create_item.html", context)

@login_required(login_url='/login')
def create_item_ajax(request):
    if request.method == 'POST':
        item = Item()
        item.name = request.POST.get("name")
        item.amount = request.POST.get("amount")
        item.price = request.POST.get("price")
        item.description = request.POST.get("description")
        item.tags = request.POST.get("tags")
        item.user = request.user
        item.save()

        return HttpResponse(b"CREATED", status=201)
    return HttpResponseNotFound()

@login_required(login_url='/login')
def edit_item(request, id):
    # Get product berdasarkan ID
    item = Item.objects.get(pk = id)

    # Set product sebagai instance dari form
    form = ItemForm(request.POST or None, instance=item)

    if form.is_valid() and request.method == "POST":
        # Simpan form dan kembali ke halaman awal
        form.save()
        return HttpResponseRedirect(reverse('main:show_main'))

    context = {'form': form}
    return render(request, "edit_item.html", context)

@login_required(login_url='/login')
def edit_item_ajax(request, id):
    item = Item.objects.get(id=id)
    if request.method == 'POST' and request.user == item.user:
        item.name = request.POST.get("name")
        item.amount = request.POST.get("amount")
        item.price = request.POST.get("price")
        item.description = request.POST.get("description")
        item.tags = request.POST.get("tags")
        item.save()

        return HttpResponse(b"EDITED", status=201)
    return HttpResponseNotFound()

@login_required(login_url='/login')
def increment_item(request, id):
    item = Item.objects.get(id=id)
    item.amount += 1
    item.save()
    return HttpResponseRedirect(reverse('main:show_main'))

@login_required(login_url='/login')
@csrf_exempt
def increment_item_ajax(request, id):
    item = Item.objects.get(id=id)
    if request.method == 'POST' and request.user == item.user:
        item.amount += 1
        item.save()

        return HttpResponse(b"ADDED", status=201)
    return HttpResponseNotFound()

@login_required(login_url='/login')
def decrement_item(request, id):
    item = Item.objects.get(id=id)
    item.amount -= 1
    if item.amount <= 0:
        item.delete()
    else:
        item.save()
    return HttpResponseRedirect(reverse('main:show_main'))

@login_required(login_url='/login')
@csrf_exempt
def decrement_item_ajax(request, id):
    item = Item.objects.get(id=id)
    if request.method == 'POST' and request.user == item.user:
        item.amount -= 1
        if (item.amount < 0):
            item.amount = 0
        item.save()

        return HttpResponse(b"REDUCED", status=201)
    return HttpResponseNotFound()

@login_required(login_url='/login')
def delete_item(request, id):
    item = Item.objects.get(id=id)
    if request.user == item.user:
        item.delete()
    return HttpResponseRedirect(reverse('main:show_main'))

@login_required(login_url='/login')
def delete_item_ajax(request, id):
    item = Item.objects.get(id=id)
    if request.method == 'POST' and request.user == item.user:
        item.delete()
        return HttpResponse(b"DELETED", status=201)
    return HttpResponseNotFound()

@csrf_exempt
def create_item_flutter(request):
    if request.method == 'POST':
        
        data = json.loads(request.body)

        new_item = Item.objects.create(
            user = request.user,
            name = data["name"],
            amount = int(data["amount"]),
            price = int(data["price"]),
            tags = data["tags"],
            description = data["description"]
        )

        new_item.save()

        return JsonResponse({"status": "success"}, status=200)
    else:
        return JsonResponse({"status": "error"}, status=401)

# Data related
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

## 404
def custom_404(request, exception):
    return render(request, '404.html', status=404, context={'page_title': 'Uh oh'})