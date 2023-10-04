from django.urls import path
from main.views import *

app_name = 'main'

urlpatterns = [
    path('', show_main, name='show_main'),
    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('create-item/', create_item, name='create_item'),
    path('create-item-ajax/', create_item_ajax, name='create_item_ajax'), 
    path('edit-item/<int:id>', edit_item, name='edit_item'),
    path('add/<int:id>/', increment_item, name='increment_item'),
    path('reduce/<int:id>/', decrement_item, name='decrement_item'),
    path('delete/<int:id>/', delete_item, name='delete_item'),
    path('get-items/', get_items_json, name='get_items_json'),
    path('xml/', show_xml, name='show_xml'),
    path('json/', show_json, name='show_json'),
    path('xml/<int:id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/<int:id>/', show_json_by_id, name='show_json_by_id'), 
]