from django.test import TestCase, Client
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hidden_inventory.settings")

# Create your tests here.
class mainTest(TestCase):
    def test_url_exists(self):
        response = Client().get('')
        self.assertEqual(response.status_code, 200)

    def test_template_used(self):
        response = Client().get('')
        self.assertTemplateUsed(response, 'main.html')

    def test_assert_fields(self): # checking if context matches what is displayed
        response = Client().get('/')
        self.assertEquals(response.context['display_name'], "Muhammad Milian Alkindi")
        self.assertEquals(response.context['unique_npm'], 2206081856)

